"use client"
import React, { useState } from 'react'
import NewDataFileUpload from '../uploadFiles/NewDataFileUpload'
import GetFilesInfo from '../uploadFiles/GetFilesInfo'
import RunAutomationForNewData from '../uploadFiles/RunAutomationForNewData'
import RolesAndPermissionChange from './RolesAndPermissionChange'
import GlobalPermissionManager from './GlobalPermissionManager'
import UserRoleManager from './UserRoleManager'


const DashBoardUI = () => {

    const [section, setSection] = useState("userRoleManager");         //  upload, roles, permissions


    const changeSection = () => {

        if (section === "upload") {

            return (
                <>

                    {/* <div className='space-y-2 container mx-auto min-w-[600px] border-black border-2'>
                        <div>DashBoardUI</div>


                    </div> */}
                    <NewDataFileUpload></NewDataFileUpload>
                    <GetFilesInfo></GetFilesInfo>
                    <RunAutomationForNewData></RunAutomationForNewData>

                </>
            )
        }
        else if (section === "roles") {
            return (
                <>
                    <RolesAndPermissionChange></RolesAndPermissionChange>
                </>
            )
        }
        else if (section === "permissions") {
            return (
                <>
                    <GlobalPermissionManager></GlobalPermissionManager>
                </>
            )
        }
        else if (section === "userRoleManager") {
            return (
                <>
                    <UserRoleManager></UserRoleManager>
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
            </nav>

            <main className="p-6">
                {changeSection()}
            </main>
        </div>
    );
}

export default DashBoardUI