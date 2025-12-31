// app/page.jsx

import { auth } from "@/auth";
import CreateStrategyUI from "@/components/homePage/createStrategyUI";
import TrendingStrategies from "@/components/homePage/TrendingStrategies";
import TrendingStrategiesServer from "@/components/homePage/TrendingStrategiesServer";
import { serverSideBackendUrl } from "@/json-data/backendServer";
import { getTokenForSessionData } from "@/utils/security";
import axios from "axios";

// ✅ Static SEO metadata
export const metadata = {
  title: "Home | Create & Explore Stock Scans",
  description:
    "Create, explore, and backtest stock trading strategies. Discover the top trending strategies with real-time performance data.",
};

export default async function Home() {

  const session = await auth();

  // const token = await getTokenForSessionData()
  // console.log("getTokenForSessionData", token)
  let roles = []
  try {
    roles = await axios.post(`${serverSideBackendUrl}api/admin-dashboard/get-roles`, {},
      {
        headers: {
          Authorization: `Bearer ${await getTokenForSessionData(session)}`,
        }
      });
    roles = roles?.data || []
  }
  catch {

  }



  if (roles.includes("home-page")) {

    return (
      <main className="flex flex-col items-center px-4">
        <div className="w-full max-w-6xl">
          <CreateStrategyUI />
          {/* <TrendingStrategies /> */}

          <TrendingStrategiesServer></TrendingStrategiesServer>
        </div>
      </main>
    );
  }


}
