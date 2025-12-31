"use client"
import React, { useState } from 'react'
import NewDataFileUpload from '../uploadFiles/NewDataFileUpload'
import GetFilesInfo from '../uploadFiles/GetFilesInfo'
import RunAutomationForNewData from '../uploadFiles/RunAutomationForNewData'
import RolesAndPermissionChange from './RolesManager'
import GlobalPermissionManager from './PermissionManager'
import UserRoleManager from './UserRoleManager'
import GroupPermissionManager from './GroupManager'
import RolesManager from './RolesManager'
import GroupManager from './GroupManager'
import PermissionManager from './PermissionManager'
import DateRangeManager from './DateRangeManager'


const DashBoardUI = ({ roles = [] }) => {

    const [section, setSection] = useState("dateRangeManager");         //  upload, roles, permissions, userRoleManager, dateRange


    const changeSection = () => {

        if (section === "upload" && roles.includes("admin-dashboard.upload")) {

            return (
                <>


                    <NewDataFileUpload></NewDataFileUpload>
                    <GetFilesInfo></GetFilesInfo>
                    <RunAutomationForNewData></RunAutomationForNewData>

                </>
            )
        }
        else if (section === "roles" && roles.includes("admin-dashboard.roles")) {
            return (
                <>
                    <RolesManager></RolesManager>
                </>
            )
        }
        else if (section === "groups") {
            return (
                <>
                    <GroupManager></GroupManager>
                </>
            )
        }
        else if (section === "permissions" && roles.includes("admin-dashboard.permissions")) {
            return (
                <>
                    <PermissionManager></PermissionManager>
                </>
            )
        }
        else if (section === "userRoleManager" && roles.includes("admin-dashboard.user-role-manager")) {
            return (
                <>
                    <UserRoleManager></UserRoleManager>
                </>
            )
        }
        else if (section === "dateRangeManager" && roles.includes("admin-dashboard.user-role-manager")) {
            return (
                <>
                    <DateRangeManager></DateRangeManager>
                </>
            )
        }
    }
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-md p-4 flex justify-center gap-6">
                <button
                    onClick={() => setSection("upload")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200
                   ${section === "upload"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 hover:bg-blue-500 hover:text-white"}`}
                >
                    Upload
                </button>
                <button
                    onClick={() => setSection("roles")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200
                   ${section === "roles"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 hover:bg-blue-500 hover:text-white"}`}
                >
                    Roles
                </button>
                <button
                    onClick={() => setSection("groups")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200
                   ${section === "groups"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 hover:bg-blue-500 hover:text-white"}`}
                >
                    Groups
                </button>
                <button
                    onClick={() => setSection("permissions")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200
                   ${section === "permissions"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 hover:bg-blue-500 hover:text-white"}`}
                >
                    Permissions
                </button>
                <button
                    onClick={() => setSection("userRoleManager")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200
                   ${section === "userRoleManager"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 hover:bg-blue-500 hover:text-white"}`}
                >
                    User Role Manager
                </button>
                <button
                    onClick={() => setSection("dateRangeManager")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200
                   ${section === "dateRangeManager"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 hover:bg-blue-500 hover:text-white"}`}
                >
                    Date Range Manager
                </button>
            </nav>

            <main className="p-6">
                {changeSection()}
            </main>
        </div>
    );
}

export default DashBoardUI