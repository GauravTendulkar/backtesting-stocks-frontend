"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useTheme } from "next-themes";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card } from "@/components/ui/card";

// Custom Tooltip displaying date, pnl, stock count and stock names with dark mode styling
const CustomTooltip = ({ active, payload }) => {
  if (!(active && payload && payload.length)) return null;
  const { entry_date, pnl, stockCount, stocks } = payload[0].payload;

  return (
    <div className="p-2 border rounded-lg shadow-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700">
      <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{`Date: ${entry_date}`}</p>
      <p className="text-sm text-gray-700 dark:text-gray-300">{`PNL: ${pnl}`}</p>
      <p className="text-sm text-gray-700 dark:text-gray-300">{`Stock Count: ${stockCount}`}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">{`Stocks: ${stocks.join(", ")}`}</p>
    </div>
  );
};

const PNLStockChart = ({ data }) => {
  const { theme, systemTheme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Determine if dark mode is active based on theme or systemPreference
  useEffect(() => {
    const effectiveTheme = theme === "system" ? systemTheme : theme;
    setIsDarkMode(effectiveTheme === "dark");
  }, [theme, systemTheme]);

  // Toggle dark mode & update next-themes
  const toggleDarkMode = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  // Memoize the formatted data adding stockCount for each entry
  const formattedData = useMemo(
    () =>
      data.map(item => ({
        ...item,
        stockCount: item.stocks.length,
      })),
    [data]
  );

  return (
    <Card className="p-4 overflow-auto">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        PNL & Stock Count Over Time
      </h2>

      {/* Optional: Dark mode toggle button (uncomment if needed) */}
      {/* <button
        className="mb-4 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700"
        onClick={toggleDarkMode}
      >
        Toggle {isDarkMode ? "Light" : "Dark"} Mode
      </button> */}

      <ResponsiveContainer width={1200} height={400}>
        <ComposedChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#444" : "#ccc"} />

          <XAxis
            dataKey="entry_date"
            angle={-45}
            textAnchor="end"
            height={80}
            stroke={isDarkMode ? "#ddd" : "#333"}
          />
          <YAxis
            yAxisId="left"
            stroke={isDarkMode ? "#ddd" : "#333"}
            label={{ value: "PNL", angle: -90, position: "insideLeft", fill: isDarkMode ? "#ddd" : "#333" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke={isDarkMode ? "#ddd" : "#333"}
            label={{ value: "Stock Count", angle: -90, position: "insideRight", fill: isDarkMode ? "#ddd" : "#333" }}
          />

          <Tooltip content={<CustomTooltip />} />

          <Legend wrapperStyle={{ color: isDarkMode ? "#ddd" : "#333" }} />

          {/* Bar Chart for Stock Count */}
          <Bar
            yAxisId="right"
            dataKey="stockCount"
            fill={isDarkMode ? "#34D399" : "#82ca9d"}
            barSize={30}
          />

          {/* Line Chart for PNL */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="pnl"
            stroke={isDarkMode ? "#818CF8" : "#8884d8"}
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default PNLStockChart;
