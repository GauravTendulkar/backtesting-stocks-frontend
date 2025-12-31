import React, { useRef, useMemo, useState, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import clsx from "clsx";
import ExportButtons from "../tables/ExportButtons";

const ROW_HEIGHT = 32;
const MAX_BAR_WIDTH = 400;

function parseDateParts(s) {
    const [d, m, y, hm] = s.match(/(\d{2})-(\d{2})-(\d{4}) (\d{2}:\d{2})/).slice(1);
    const dateObj = new Date(`${y}-${m}-${d}T${hm}:00`);
    const t = new Date(dateObj.getTime());
    t.setHours(0, 0, 0, 0);
    t.setDate(t.getDate() + 4 - (t.getDay() || 7));
    const yearStart = new Date(t.getFullYear(), 0, 1);
    const week = Math.ceil((((t - yearStart) / 86400000) + 1) / 7);
    return { year: y, month: m, week: week.toString().padStart(2, "0"), dateObj };
}

function clampBarWidth(value, maxStocks) {
    if (maxStocks === 0 || value === 0) return 0;
    const min = 12;
    return min + ((value / maxStocks) * (MAX_BAR_WIDTH - min));
}

function loadPersistedFilters() {
    if (typeof window === "undefined") return {};
    try {
        return JSON.parse(localStorage.getItem("vbarfilters") || "{}");
    } catch {
        return {};
    }
}
function persistFilters({ showNonZeroOnly, filterYear, filterMonth, filterWeek }) {
    if (typeof window === "undefined") return;
    localStorage.setItem(
        "vbarfilters",
        JSON.stringify({ showNonZeroOnly, filterYear, filterMonth, filterWeek })
    );
}

export default function VirtualBarChart({ data }) {
    const persisted = loadPersistedFilters();

    const [showNonZeroOnly, setShowNonZeroOnly] = useState(
        persisted.showNonZeroOnly !== undefined ? persisted.showNonZeroOnly : true
    );
    const [filterYear, setFilterYear] = useState(persisted.filterYear || "All");
    const [filterMonth, setFilterMonth] = useState(persisted.filterMonth || "All");
    const [filterWeek, setFilterWeek] = useState(persisted.filterWeek || "All");

    useEffect(() => {
        persistFilters({ showNonZeroOnly, filterYear, filterMonth, filterWeek });
    }, [showNonZeroOnly, filterYear, filterMonth, filterWeek]);

    const dataWithParts = useMemo(
        () =>
            data
                .map(d => ({
                    ...d,
                    ...parseDateParts(d.timeStamp)
                }))
                .sort((a, b) => b.dateObj - a.dateObj),
        [data]
    );

    const years = useMemo(() =>
        Array.from(new Set(dataWithParts.map(d => d.year))).sort((a, b) => b.localeCompare(a)),
        [dataWithParts]
    );
    const months = useMemo(() =>
        Array.from(new Set(dataWithParts.map(d =>
            filterYear !== "All" ? (d.year === filterYear ? d.month : null) : d.month
        ).filter(Boolean))).sort((a, b) => b.localeCompare(a)),
        [dataWithParts, filterYear]
    );
    const weeks = useMemo(() =>
        Array.from(new Set(dataWithParts.map(d =>
            filterYear !== "All" && filterMonth !== "All"
                ? (d.year === filterYear && d.month === filterMonth ? d.week : null)
                : filterYear !== "All"
                    ? (d.year === filterYear ? d.week : null)
                    : d.week
        ).filter(Boolean))).sort((a, b) => b.localeCompare(a)),
        [dataWithParts, filterYear, filterMonth]
    );

    const filteredData = useMemo(
        () =>
            dataWithParts.filter(
                d =>
                    (showNonZeroOnly ? d.stocks.length > 0 : true) &&
                    (filterYear === "All" || d.year === filterYear) &&
                    (filterMonth === "All" || d.month === filterMonth) &&
                    (filterWeek === "All" || d.week === filterWeek)
            ),
        [dataWithParts, showNonZeroOnly, filterYear, filterMonth, filterWeek]
    );
    // console.log("filteredData", filteredData)

    function flattenJsonData(jsonData) {
        const flatArray = [];

        jsonData.forEach(entry => {
            const stocksArray = Array.isArray(entry.stocks) ? entry.stocks : [];
            stocksArray.forEach(stock => {
                flatArray.push({
                    timeStamp: entry.timeStamp,
                    stocks: stock,
                });
            });
        });

        return flatArray;
    }
    const filteredDataCSVFit = useMemo(() => flattenJsonData(filteredData), [filteredData])
    

    const stockCounts = useMemo(() => {
        let stocksCounter = {};
        filteredData.forEach(bar => {
            bar.stocks.forEach(stock =>
                stocksCounter[stock] = (stocksCounter[stock] || 0) + 1
            );
        });
        return Object.entries(stocksCounter)
            .sort((a, b) => b[1] - a[1]);
    }, [filteredData]);

    const maxStocks = useMemo(
        () => Math.max(1, ...filteredData.map(d => d.stocks.length)),
        [filteredData]
    );
    const parentRef = useRef();

    const rowVirtualizer = useVirtualizer({
        count: filteredData.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => ROW_HEIGHT,
        overscan: 8,
    });

    return (
        <div className="bg-background text-foreground min-h-[700px] p-4 rounded-md shadow-sm">
            {/* Controls */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
                <button
                    className="px-3 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => setShowNonZeroOnly(v => !v)}
                >
                    {showNonZeroOnly
                        ? "Show all timestamps"
                        : "Show only where stocks > 0"}
                </button>
                <label className="flex items-center gap-1">
                    <span>Year</span>
                    <select
                        className="rounded border border-input bg-background px-2 py-1 text-sm text-foreground"
                        value={filterYear}
                        onChange={e => {
                            setFilterYear(e.target.value);
                            setFilterMonth("All");
                            setFilterWeek("All");
                        }}
                    >
                        <option value="All">All</option>
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                </label>
                <label className="flex items-center gap-1">
                    <span>Month</span>
                    <select
                        className="rounded border border-input bg-background px-2 py-1 text-sm text-foreground"
                        value={filterMonth}
                        onChange={e => {
                            setFilterMonth(e.target.value);
                            setFilterWeek("All");
                        }}
                    >
                        <option value="All">All</option>
                        {months.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </label>
                <label className="flex items-center gap-1">
                    <span>Week</span>
                    <select
                        className="rounded border border-input bg-background px-2 py-1 text-sm text-foreground"
                        value={filterWeek}
                        onChange={e => setFilterWeek(e.target.value)}
                    >
                        <option value="All">All</option>
                        {weeks.map(w => <option key={w} value={w}>{w}</option>)}
                    </select>
                </label>
                <ExportButtons data={filteredDataCSVFit} fileName="users" ></ExportButtons>
                <span className="ml-auto text-sm text-muted-foreground">{filteredData.length} bars</span>
            </div>
            <div
                ref={parentRef}
                className="overflow-auto border rounded-md shadow-sm bg-background"
                style={{
                    maxHeight: "600px",
                    width: "100%",
                    minWidth: 480,
                }}
            >
                <div
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        position: "relative",
                        width: "100%"
                    }}
                >
                    {rowVirtualizer.getVirtualItems().map(virtualRow => {
                        const { index, start } = virtualRow;
                        const { timeStamp, stocks } = filteredData[index];
                        const barLength = clampBarWidth(stocks.length, maxStocks);

                        return (
                            <div
                                key={index}
                                className={clsx(
                                    "flex items-center px-3 box-border border-b",
                                    index % 2 === 0 ? "bg-muted" : "bg-background"
                                )}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    transform: `translateY(${start}px)`,
                                    height: ROW_HEIGHT,
                                }}
                            >
                                {/* Time Label */}
                                <div
                                    className="flex-shrink-0 w-[130px] text-sm font-mono font-medium"
                                    style={{
                                        fontVariantNumeric: "tabular-nums",
                                        opacity: stocks.length > 0 ? 1 : 0.4,
                                    }}
                                >
                                    {timeStamp}
                                </div>
                                {stocks.length > 0 ? (
                                    <div className="flex items-center ml-2 gap-2" style={{ minHeight: 20 }}>
                                        {/* Bar */}
                                        <div
                                            className="rounded bg-primary text-primary-foreground flex items-center font-semibold text-sm px-2 select-none"
                                            style={{
                                                height: 20,
                                                minWidth: 12,
                                                width: barLength,
                                                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                                                transition: "background 0.2s",
                                            }}
                                        >
                                            {stocks.length}
                                        </div>
                                        {/* Stock names, spaced out, wrapping if needed */}
                                        <div
                                            className="text-xs text-foreground dark:text-gray-200 font-mono truncate"
                                            style={{ minWidth: 0, maxWidth: 250, whiteSpace: "normal" }}
                                            title={stocks.join(", ")} // fallback if truncated
                                        >
                                            {stocks.length <= 4
                                                ? stocks.join(", ")
                                                : <>
                                                    {stocks.slice(0, 4).join(", ")}
                                                    <span className="text-muted-foreground">, +{stocks.length - 4} more</span>
                                                </>
                                            }
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ height: 20, width: 1 }} />
                                )}

                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Stock summary */}
            {/* --- STOCKS SUMMARY SECTION --- */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-foreground dark:text-foreground mb-3">
                    Stocks Summary {filterYear !== "All" ? `for ${filterYear}` : ""}
                </h3>

                {stockCounts.length === 0 ? (
                    <p className="text-muted-foreground select-none">No stocks found in current filter</p>
                ) : (
                    <div className="flex flex-wrap gap-3">
                        {stockCounts.map(([stock, count]) => (
                            <div
                                key={stock}
                                className="px-4 py-2 bg-primary/10 text-primary rounded-md font-mono font-semibold shadow-sm select-none"
                                style={{ letterSpacing: 0.5, whiteSpace: 'nowrap' }}
                                title={`${stock} (${count})`}
                            >
                                {stock} <span className="text-muted-foreground font-normal">({count})</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}
