import axios from 'axios';
import React from 'react'
import DashBoardPagination from '@/components/DashBoardPagination';
import { notFound, redirect } from 'next/navigation'
import { backendUrl, serverSideBackendUrl } from '@/json-data/backendServer';

import { auth } from '@/auth';
import { getTokenForSessionData } from '@/utils/security';

// export const metadata = {
//     title: "Dashboard",
//     description: "",
// };

export const generateMetadata = () => {
    return {
        title: "Dashboard | Backtesting App", // 👈 good for SEO
        description: "Your Dashboard trading strategies and more.", // optional
    };
};

const Dashboard = async ({ params }) => {

    const { page } = await params;
    // console.log("props *************************", props)
    // console.log("params *************************", params)
    // console.log("page *************************", page)


    const session = await auth();
    console.log(session)
    if (!session) {
        redirect("/sign-in")
    }

    // console.log("backendUrl", backendUrl)

    let temp
    try {
        const url = `${serverSideBackendUrl}equations/?page=${page}&noOfItems=5`
        console.log(url)
        const response = await axios.post(url, {},
            {
                headers: {
                    Authorization: `Bearer ${await getTokenForSessionData(session)}`,
                }
            }
        );
        // console.log(response)
        temp = response?.data;


    } catch (error) {

        console.error('Error fetching data:', error?.response?.data?.detail);
        console.error(error)
        if (error["status"] == 404) {

            notFound()
        }

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

    if (roles.includes("dashboard")) {
        return (
            <DashBoardPagination
                items={temp["items"]}
                totalPages={temp["total_no_of_pages"]}
                page={temp["page"]}

                session={session}
            />
        );
    }
    else {
        // console.error()
        notFound()
    }
}

export default Dashboard;