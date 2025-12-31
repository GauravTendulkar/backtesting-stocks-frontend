import React, { useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";

function prepareChartData(inputData, stocks) {
  // Returns array: { entryDateTime, STOCK1: "...", STOCK2: "...", ... }
  // Only for the visible window.
  const result = {};
  inputData.forEach(({ stock, condition, entryDateTime }) => {
    if (!result[entryDateTime]) result[entryDateTime] = { entryDateTime };
    result[entryDateTime][stock] = condition ? stock : "";
  });
  return Object.values(result);
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const stocks = payload
      .filter(item => !!item.value)
      .map(item => item.value)
      .filter(Boolean);
    return (
      <div style={{ background: "#fff", border: "1px solid #ccc", padding: 8 }}>
        <strong>{label}</strong>
        <div>
          {stocks.length
            ? stocks.map(name => (
                <div key={name} style={{ color: "#8884d8" }}>
                  {name}
                </div>
              ))
            : <span style={{ color: "#999" }}>No stock triggered</span>}
        </div>
      </div>
    );
  }
  return null;
}

const PAGE_SIZE = 1000; // Number of bars to display at once - tune as needed

/**
 * Supports huge datasets by paginating time windows.
 * Props:
 *   data: Array<{stock, condition, entryDateTime}>
 */
export default function StockBarGraph({ data }) {
  const [page, setPage] = useState(0);

  // For demo: get all unique, sorted timestamps for paging (could be optimized further for huge lists)
  const allTimes = useMemo(
    () => [...new Set(data.map(item => item.entryDateTime))].sort(),
    [data]
  );

  // Paginate
  const pageCount = Math.ceil(allTimes.length / PAGE_SIZE);
  const visibleTimes = allTimes.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  // Filter data only for current page window
  const windowedData = useMemo(
    () => data.filter(d => visibleTimes.includes(d.entryDateTime)),
    [data, visibleTimes]
  );

  // List of all stocks (could also come from props)
  const stocks = useMemo(
    () => [...new Set(data.map(item => item.stock))],
    [data]
  );

  // Aggregate format for recharts
  const chartData = useMemo(
    () => prepareChartData(windowedData, stocks),
    [windowedData, stocks]
  );

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setPage(Math.max(page - 1, 0))} disabled={page === 0}>Prev</button>
        <span style={{ margin: "0 1rem" }}>
          Page {page + 1} of {pageCount}
        </span>
        <button onClick={() => setPage(Math.min(page + 1, pageCount - 1))} disabled={page >= pageCount - 1}>Next</button>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <XAxis dataKey="entryDateTime" tick={false} interval={0}/>
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {stocks.map(stock =>
            <Bar
              key={stock}
              dataKey={stock}
              stackId="a"
              fill="#8884d8"
              minPointSize={1}
              isAnimationActive={false}
            >
              {chartData.map((entry, index) =>
                entry[stock]
                  ? <Cell key={`cell-${index}`} fill="#8884d8" />
                  : <Cell key={`cell-${index}`} fill="rgba(0,0,0,0)" />
              )}
            </Bar>
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
