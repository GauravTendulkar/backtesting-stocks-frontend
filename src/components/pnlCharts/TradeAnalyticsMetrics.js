import React, { useMemo } from "react";

// Utility to calculate time difference in minutes, with guard clause for missing/invalid times
const getMinutesDiff = (startTime, endTime) => {
  if (
    !startTime ||
    !endTime ||
    typeof startTime !== "string" ||
    typeof endTime !== "string" ||
    !startTime.includes(":") ||
    !endTime.includes(":")
  ) {
    return NaN; // Return NaN for invalid times
  }
  const [startH, startM] = startTime.split(":").map(Number);
  const [endH, endM] = endTime.split(":").map(Number);
  return (endH * 60 + endM) - (startH * 60 + startM);
};

// Utility to format percentage
const formatPercent = (value) => `${value.toFixed(2)}%`;

const TradeAnalyticsMetrics = ({ data = [] }) => {
  const metrics = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return null;

    const totalTrades = data.length;
    const totalPnL = data.reduce((acc, t) => acc + (t.pnl || 0), 0);
    const wins = data.filter((t) => t.pnl > 0);
    const losses = data.filter((t) => t.pnl < 0);

    const avgPnL = totalPnL / totalTrades;
    const winRate = (wins.length / totalTrades) * 100;
    const lossRate = (losses.length / totalTrades) * 100;

    const avgWin = wins.length
      ? wins.reduce((a, t) => a + t.pnl, 0) / wins.length
      : 0;
    const avgLoss = losses.length
      ? losses.reduce((a, t) => a + t.pnl, 0) / losses.length
      : 0;

    const profitFactor =
      Math.abs(wins.reduce((a, t) => a + t.pnl, 0)) /
      (Math.abs(losses.reduce((a, t) => a + t.pnl, 0)) || 1);

    const maxProfit = data.length
      ? Math.max(...data.map((t) => t.pnl))
      : 0;
    const maxLoss = data.length
      ? Math.min(...data.map((t) => t.pnl))
      : 0;

    // Yearly PnL
    const yearlyPnL = data.reduce((acc, t) => {
      const year = t.entry_date ? new Date(t.entry_date).getFullYear() : "N/A";
      acc[year] = (acc[year] || 0) + (t.pnl || 0);
      return acc;
    }, {});

    // Monthly PnL
    const monthlyPnL = data.reduce((acc, t) => {
      if (t.entry_date) {
        const date = new Date(t.entry_date);
        const monthKey = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`;
        acc[monthKey] = (acc[monthKey] || 0) + (t.pnl || 0);
      }
      return acc;
    }, {});

    // Average Holding Time -- guarded
    const holdingTimes = data
      .map((t) => getMinutesDiff(t.entry_time, t.exit_time))
      .filter((m) => !isNaN(m) && m >= 0);
    const avgHolding =
      holdingTimes.length > 0
        ? holdingTimes.reduce((a, b) => a + b, 0) / holdingTimes.length
        : 0;

    // Most common SL
    const slReasonCount = data.reduce((acc, t) => {
      if (t.sl) {
        acc[t.sl] = (acc[t.sl] || 0) + 1;
      }
      return acc;
    }, {});
    const mostCommonSL =
      Object.entries(slReasonCount).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      "N/A";

    // Standard deviation of PnL for Sharpe-like ratio
    const pnlStdDev =
      Math.sqrt(
        data.reduce((sum, t) => sum + Math.pow((t.pnl || 0) - avgPnL, 2), 0) /
          totalTrades
      ) || 1;
    const sharpeRatio = avgPnL / pnlStdDev;

    // Expectancy
    const expectancy =
      (winRate / 100) * avgWin + (lossRate / 100) * avgLoss;

    return {
      totalTrades,
      totalPnL,
      avgPnL,
      winRate,
      lossRate,
      avgWin,
      avgLoss,
      profitFactor,
      maxProfit,
      maxLoss,
      yearlyPnL,
      monthlyPnL,
      avgHolding,
      mostCommonSL,
      sharpeRatio,
      expectancy,
    };
  }, [data]);

  if (!metrics)
    return (
      <div className="text-center p-4">No data available</div>
    );

  const statStyle =
    "bg-white dark:bg-zinc-900 shadow rounded-xl p-4 flex flex-col";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <div className={statStyle}>
        <strong>Total Trades</strong>
        <span>{metrics.totalTrades}</span>
      </div>
      <div className={statStyle}>
        <strong>Total PnL</strong>
        <span>₹{metrics.totalPnL.toFixed(2)}</span>
      </div>
      <div className={statStyle}>
        <strong>Average PnL</strong>
        <span>₹{metrics.avgPnL.toFixed(2)}</span>
      </div>
      <div className={statStyle}>
        <strong>Win Rate</strong>
        <span>{formatPercent(metrics.winRate)}</span>
      </div>
      <div className={statStyle}>
        <strong>Loss Rate</strong>
        <span>{formatPercent(metrics.lossRate)}</span>
      </div>
      <div className={statStyle}>
        <strong>Average Win</strong>
        <span>₹{metrics.avgWin.toFixed(2)}</span>
      </div>
      <div className={statStyle}>
        <strong>Average Loss</strong>
        <span>₹{metrics.avgLoss.toFixed(2)}</span>
      </div>
      <div className={statStyle}>
        <strong>Profit Factor</strong>
        <span>{metrics.profitFactor.toFixed(2)}</span>
      </div>
      <div className={statStyle}>
        <strong>Max Profit</strong>
        <span>₹{metrics.maxProfit.toFixed(2)}</span>
      </div>
      <div className={statStyle}>
        <strong>Max Loss</strong>
        <span>₹{metrics.maxLoss.toFixed(2)}</span>
      </div>
      <div className={statStyle}>
        <strong>Yearly PnL</strong>
        <ul className="text-sm">
          {Object.entries(metrics.yearlyPnL).map(([year, val]) => (
            <li key={year}>
              {year}: ₹{val.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
      <div className={statStyle}>
        <strong>Monthly PnL</strong>
        <ul className="text-sm max-h-28 overflow-y-auto">
          {Object.entries(metrics.monthlyPnL).map(([month, val]) => (
            <li key={month}>
              {month}: ₹{val.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
      <div className={statStyle}>
        <strong>Avg Holding Time</strong>
        <span>{metrics.avgHolding.toFixed(1)} mins</span>
      </div>
      <div className={statStyle}>
        <strong>Most Common SL</strong>
        <span>{metrics.mostCommonSL}</span>
      </div>
      <div className={statStyle}>
        <strong>Sharpe-like Ratio</strong>
        <span>{metrics.sharpeRatio.toFixed(2)}</span>
      </div>
      <div className={statStyle}>
        <strong>Expectancy</strong>
        <span>₹{metrics.expectancy.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default TradeAnalyticsMetrics;
