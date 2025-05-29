"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart
} from "recharts";
import { Card } from "@/components/ui/card";


// Custom Tooltip with Dark Mode Support
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 border rounded-lg shadow-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{`Date: ${payload[0].payload.date}`}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">{`PNL: ${payload[0].payload.pnl}`}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">{`Stock Count: ${payload[0].payload.stockCount}`}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{`Stocks: ${payload[0].payload.stocks.join(", ")}`}</p>
      </div>
    );
  }
  return null;
};

const PNLStockChart = ({ data }) => {
  // const { theme } = useTheme();
  // const isDarkMode = theme === "dark";

  const { setTheme, theme, systemTheme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (systemTheme == "light") {
      return false
    }
    else if (systemTheme == "dark") {
      return true
    }
    else if (theme === "light") {
      return false

    }
    else if (theme === "dark") {
      return true

    }
  })

  function toggleDarkMode() {
    const currentTheme = theme === "system" ? systemTheme : theme
    setIsDarkMode(!isDarkMode)
    setTheme(currentTheme === "dark" ? "light" : "dark")
  }

  useEffect(() => {

    if (theme === "light") {
      setIsDarkMode(false)

    }
    else if (theme === "dark") {
      setIsDarkMode(true)

    }

  }, [theme])

  // Transform data to include stock count
  const formattedData = data.map((item) => ({
    ...item,
    stockCount: item.stocks.length,
  }));

  return (
    <Card className="p-4 overflow-auto">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 ">PNL & Stock Count Over Time</h2>

      {/* <ResponsiveContainer width={Math.max(data.length * 15, 400)} height={400}> */}
      <ResponsiveContainer width={1200} height={400}>
        <ComposedChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#444" : "#ccc"} />
          <XAxis
            dataKey="date"
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
          <Bar yAxisId="right" dataKey="stockCount" fill={isDarkMode ? "#34D399" : "#82ca9d"} barSize={30} />

          {/* Line Chart for PNL */}
          <Line yAxisId="left" type="monotone" dataKey="pnl" stroke={isDarkMode ? "#818CF8" : "#8884d8"} strokeWidth={2} dot={{ r: 4 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default PNLStockChart;
