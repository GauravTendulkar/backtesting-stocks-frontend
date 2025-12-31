import CollectionOfAllComponents from '@/components/logicUI2/CollectionOfAllComponents';
import { backendUrl, serverSideBackendUrl } from '@/json-data/backendServer';
import axios from 'axios';
import { notFound } from 'next/navigation';
import React from 'react';
import { cookies } from 'next/headers';
import { auth } from '@/auth';
import { getTokenForSessionData } from '@/utils/security';

// ✅ Dynamic SEO Metadata
export async function generateMetadata({ params }) {
  try {
    const session = await auth();

    const { link } = await params

    const response = await axios.post(`${serverSideBackendUrl}equations/${link}`, {}, {
      headers: {
        Authorization: `Bearer ${await getTokenForSessionData(session)}`,
      }
    });

    const data = response.data;

    return {
      title: data.title || "Strategy Viewer",
      description: data.description || "View detailed strategy logic and analysis.",
    };
  } catch (error) {
    return {
      title: "Not Found",
      description: "Strategy not found or private.",
    };
  }
}

const page = async ({ params }) => {

  const { link } = await params

  const session = await auth();

  let temp;
  try {
    const response = await axios.post(`${serverSideBackendUrl}equations/${link}`, {}, {
      headers: {
        Authorization: `Bearer ${await getTokenForSessionData(session)}`,
      }
    });

    temp = response.data;
    temp["equation"] = JSON.parse(temp["equation"]);
  } catch (error) {
    console.error("Error fetching equation:", error);
    notFound();
  }

  let response1;
  try {
    response1 = await axios.post(`${serverSideBackendUrl}api/stock-list/get/`, {},
      {
        headers: {
          Authorization: `Bearer ${await getTokenForSessionData(session)}`,
        }
      });
  } catch (error) {
    console.error("Error fetching stock list:", error);
  }

  return (
    <>
      <CollectionOfAllComponents
        valueProp={temp}
        session={session}
        data={response1?.data}
      />
    </>
  );
};

export default page;
