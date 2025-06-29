// app/page.jsx

import CreateStrategyUI from "@/components/homePage/createStrategyUI";
import TrendingStrategies from "@/components/homePage/TrendingStrategies";

// ✅ Static SEO metadata
export const metadata = {
  title: "Backtest Strategies | Create & Explore Stock Scans",
  description:
    "Create, explore, and backtest stock trading strategies. Discover the top trending strategies with real-time performance data.",
};

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <div className="w-full max-w-6xl">
        <CreateStrategyUI />
        <TrendingStrategies />
      </div>
    </main>
  );
}
