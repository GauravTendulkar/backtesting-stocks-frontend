import axios from 'axios';
import React, { useContext } from 'react'
import DashBoardPagination from '@/components/DashBoardPagination';
import { cookies } from 'next/headers';
// import { useRouter } from 'next/navigation';
import { notFound, redirect } from 'next/navigation'
import { backendUrl } from '@/json-data/backendServer';
import { TokenContext } from '@/app/context/TokenContext';

export const metadata = {
    title: "Dashboard",
    description: "",
};

const Dashboard = async ({ params }) => {
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get('jwt_token');

    const token = tokenCookie?.value;
    // const { token } = useContext(TokenContext);

    if (!token) {
        // Handle case where no token is present

        redirect(`/signin`)

    }

    try {
        const response = await axios.get(`${backendUrl}equations/?page=${params.page}&noOfItems=5`, {
            headers: {
                'Authorization': `Bearer ${token}` // Recommended way to pass JWT
            }
        });

        const temp = response.data;

        return (
            <DashBoardPagination
                items={temp["items"]}
                totalPages={temp["total_no_of_pages"]}
                page={temp["page"]}
                token={token}
            />
        );
    } catch (error) {
        console.error('Error fetching data:', error.response.data.detail);
        if (error["status"] == 404) {
            // return <div>Error loading dashboard</div>
            notFound()
        }

    }
}

export default Dashboard;