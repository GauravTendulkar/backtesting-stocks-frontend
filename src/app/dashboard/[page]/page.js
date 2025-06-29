import axios from 'axios';
import React from 'react'
import DashBoardPagination from '@/components/DashBoardPagination';
import { notFound, redirect } from 'next/navigation'
import { backendUrl, serverSideBackendUrl } from '@/json-data/backendServer';

import { auth } from '@/auth';

// export const metadata = {
//     title: "Dashboard",
//     description: "",
// };

export const generateMetadata = () => {
  return {
    title: "Dashboard | MySiteName", // 👈 good for SEO
    description: "Your Dashboard trading strategies and more.", // optional
  };
};

const Dashboard = async ({ params }) => {

    const session = await auth();
    console.log(session)
    if (!session) {
        redirect("/sign-in")
    }

    console.log("backendUrl", backendUrl)


    try {
        const url = `${serverSideBackendUrl}equations/?page=${params.page}&noOfItems=5`
        console.log(url)
        const response = await axios.post(url, {
            user_email: session?.user?.email || null
        });
        console.log(response)
        const temp = response?.data;

        return (
            <DashBoardPagination
                items={temp["items"]}
                totalPages={temp["total_no_of_pages"]}
                page={temp["page"]}

                session={session}
            />
        );
    } catch (error) {

        console.error('Error fetching data:', error?.response?.data?.detail);
        console.error(error)
        if (error["status"] == 404) {

            notFound()
        }

    }
}

export default Dashboard;