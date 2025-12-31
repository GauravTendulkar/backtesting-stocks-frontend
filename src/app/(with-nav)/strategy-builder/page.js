import { auth } from "@/auth";
import CollectionOfAllComponents from "@/components/logicUI2/CollectionOfAllComponents";
import { serverSideBackendUrl } from "@/json-data/backendServer";
import { create } from "@/json-data/loading-create";
import { getTokenForSessionData } from "@/utils/security";
import axios from "axios";

export const metadata = {
  title: "Strategy Builder | Backtesting App",
  description: "Design and build custom stock trading strategies for backtesting. Choose conditions, add logic, and optimize your strategy easily.",
  keywords: ["stock backtesting", "strategy builder", "create strategy", "technical analysis", "custom trading logic"],
  openGraph: {
    title: "Strategy Builder | Backtesting App",
    description: "Design and build custom stock trading strategies for backtesting.",
    url: "https://yourdomain.com/strategy-builder", // <-- update this
    siteName: "Backtesting UI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Strategy Builder | Backtesting App",
    description: "Design and test your own stock trading logic with an intuitive strategy builder.",
    creator: "@yourtwitterhandle"
  }
};

const Create2 = async () => {
  const session = await auth();

  // let encryptedEmail = session?.user?.email
  //   ? encryptEmail(session.user.email)
  //   : null;

  // try {
  //   await fetch('http://localhost:8000/backend/api/protected/get', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ encrypted_email: encryptedEmail }),
  //   });
  // } catch (error) {
  //   console.error('Error sending encrypted email:', error);
  // }

  let response1;
  try {
    response1 = await axios.post(`${serverSideBackendUrl}api/stock-list/get/`, {},
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
    roles = roles?.data || []
  }
  catch {

  }

  if (roles.includes("strategy-builder")) {

    return (
      <CollectionOfAllComponents
        valueProp={{
          stockListName: "default",
          title: "",
          description: "",
          scanCategory: "",
          tags: "",
          isPrivate: false,
          equation: JSON.parse(JSON.stringify(create)),
          tradeMode: "entry_exit_backtest"
        }}
        data={response1?.data}
        session={session}
      />
    );
  }
};

export default Create2;
