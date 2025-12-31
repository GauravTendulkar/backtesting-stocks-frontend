import React from 'react';

import StockList from '@/components/stockList/StockList';
import { auth } from '@/auth';
import axios from 'axios';
import { serverSideBackendUrl } from '@/json-data/backendServer';
import { notFound } from 'next/navigation';
import { getTokenForSessionData } from '@/utils/security';

export const metadata = {
  title: "Your Stock Lists | Backtesting App",
  description: "View and manage your saved stock lists for building custom trading strategies. Easily switch between stock sets and backtest with precision.",
  keywords: ["stock list", "saved stocks", "backtesting", "strategy builder", "watchlist", "technical analysis"],
  openGraph: {
    title: "Your Stock Lists | Backtesting App",
    description: "Manage your saved stock lists and use them in custom strategy builders.",
    url: "https://yourdomain.com/stock-list", // Replace with your actual domain
    siteName: "Backtesting UI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Stock Lists | Backtesting App",
    description: "Easily manage and apply stock lists for technical strategy building.",
    creator: "@yourtwitterhandle"
  }
};

const Stocklist = async () => {
  const session = await auth();

  let response;
  try {
    response = await axios.post(`${serverSideBackendUrl}api/stock-list/get/`, {},
      {
        headers: {
          Authorization: `Bearer ${await getTokenForSessionData(session)}`,
        }
      });
  } catch (error) {
    console.log("Error ", error);
  }

  let roles = []
  try {
    roles = await axios.post(`${serverSideBackendUrl}api/admin-dashboard/get-roles`, {},
      {
        headers: {
          Authorization: `Bearer ${await getTokenForSessionData(session)}`,
        }
      });
    roles = roles?.data
  }
  catch {

  }


  if (roles.includes("stock-list")) {

    return (
      <>
        <StockList session={session} data={response?.data} />
      </>
    );
  }
  else {
    notFound()
  }
}

export default Stocklist;
