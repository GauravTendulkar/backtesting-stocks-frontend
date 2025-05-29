"use client";
import React, { useState, useMemo } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

const TradeTable = ({ data }) => {
    // sortConfig holds the key we are sorting by and the direction ("asc" or "desc")
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

    // When a header is clicked, update the sort config.
    const handleSort = (key) => {
        setSortConfig((prevConfig) => {
            if (prevConfig.key === key) {
                // Toggle sort direction if the same key is clicked
                return { key, direction: prevConfig.direction === "asc" ? "desc" : "asc" };
            }
            return { key, direction: "asc" };
        });
    };

    // Memoize the sorted data so that it only recalculates when data or sortConfig changes.
    const sortedData = useMemo(() => {
        const sortableItems = [...data];
        if (sortConfig.key) {
            sortableItems.sort((a, b) => {
                let aVal = a[sortConfig.key];
                let bVal = b[sortConfig.key];

                // If both values are numbers, subtract
                if (typeof aVal === "number" && typeof bVal === "number") {
                    return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
                }
                // If both values are strings, compare them case-insensitively
                if (typeof aVal === "string" && typeof bVal === "string") {
                    return sortConfig.direction === "asc"
                        ? aVal.localeCompare(bVal)
                        : bVal.localeCompare(aVal);
                }
                return 0;
            });
        }
        return sortableItems;
    }, [data, sortConfig]);

    // Helper function to show sort indicator for each column
    const getSortIndicator = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === "asc" ? " ↑" : " ↓";
        }
        return "";
    };

    return (
        <Card className="p-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Trade History
            </h2>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-100 dark:bg-gray-800">
                            <TableHead onClick={() => handleSort("stock")} className="cursor-pointer">
                                Stock{getSortIndicator("stock")}
                            </TableHead>
                            <TableHead onClick={() => handleSort("buysell")} className="cursor-pointer">
                                Type{getSortIndicator("buysell")}
                            </TableHead>
                            <TableHead onClick={() => handleSort("date")} className="cursor-pointer">
                                Entry Date{getSortIndicator("date")}
                            </TableHead>
                            <TableHead onClick={() => handleSort("entryTime")} className="cursor-pointer">
                                Entry Time{getSortIndicator("entryTime")}
                            </TableHead>
                            <TableHead onClick={() => handleSort("entry")} className="cursor-pointer">
                                Entry Price{getSortIndicator("entry")}
                            </TableHead>
                            <TableHead onClick={() => handleSort("exit_date")} className="cursor-pointer">
                                Exit Date{getSortIndicator("exit_date")}
                            </TableHead>
                            <TableHead onClick={() => handleSort("exitTime")} className="cursor-pointer">
                                Exit Time{getSortIndicator("exitTime")}
                            </TableHead>
                            <TableHead onClick={() => handleSort("exit")} className="cursor-pointer">
                                Exit Price{getSortIndicator("exit")}
                            </TableHead>
                            <TableHead onClick={() => handleSort("quantity")} className="cursor-pointer">
                                Quantity{getSortIndicator("quantity")}
                            </TableHead>
                            <TableHead onClick={() => handleSort("pnl")} className="cursor-pointer">
                                PNL{getSortIndicator("pnl")}
                            </TableHead>
                            <TableHead onClick={() => handleSort("sl")} className="cursor-pointer">
                                SL Type{getSortIndicator("sl")}
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {sortedData.map((trade, index) => (
                            <TableRow key={index} className="border-b border-gray-200 dark:border-gray-700">
                                <TableCell>{trade.stock}</TableCell>
                                <TableCell className="capitalize">{trade.buysell}</TableCell>
                                <TableCell>{trade.date}</TableCell>
                                <TableCell>{trade.entryTime}</TableCell>
                                <TableCell>{trade.entry.toFixed(2)}</TableCell>
                                <TableCell>{trade.exit_date}</TableCell>
                                <TableCell>{trade.exitTime}</TableCell>
                                <TableCell>{trade.exit.toFixed(2)}</TableCell>
                                <TableCell>{trade.quantity}</TableCell>
                                <TableCell
                                    className={
                                        trade.pnl >= 0 ? "text-green-500 font-semibold" : "text-red-500 font-semibold"
                                    }
                                >
                                    {trade.pnl.toFixed(2)}
                                </TableCell>
                                <TableCell>{trade.sl}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
};

export default TradeTable;
