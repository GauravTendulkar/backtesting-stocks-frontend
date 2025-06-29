import { auth } from '@/auth';
import DashBoardUI from '@/components/dashboard/DashBoardUI';
import { backendUrl, serverSideBackendUrl } from '@/json-data/backendServer';
import axios from 'axios';
import { notFound } from 'next/navigation';
import React from 'react'


const AdminDashboard = async () => {
    const session = await auth();

    if (!session) {
        notFound()
    }
    let roles = []
    try {
        roles = await axios.post(`${serverSideBackendUrl}api/admin-dashboard/get-roles`, {
            user_email: session?.user?.email || null
        });
        roles = roles?.data
    }
    catch {

    }


    
    if (roles.includes("createScan.run")) {
        return (
            <DashBoardUI></DashBoardUI>
        )
    }
    else {
        notFound()
    }
}





export default AdminDashboard