import { auth } from '@/auth';
import DashBoardUI from '@/components/dashboard/DashBoardUI';
import { backendUrl, serverSideBackendUrl } from '@/json-data/backendServer';
import { getTokenForSessionData } from '@/utils/security';
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
    const token = await getTokenForSessionData(session)
    roles = await axios.post(`${serverSideBackendUrl}api/admin-dashboard/get-roles`, {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
    roles = roles?.data
  }
  catch {

  }



  if (roles.includes("admin-dashboard")) {
    return (
      <DashBoardUI roles={roles}></DashBoardUI>
    )
  }
  else {
    notFound()
  }
}





export default AdminDashboard