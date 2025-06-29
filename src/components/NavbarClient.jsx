"use client";
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { useState, useContext, useEffect } from "react"

import Logout from "./social-login/Logout";
import Link from "next/link";
import { backendUrl } from "@/json-data/backendServer";
import axios from "axios";
import { useQuery } from '@tanstack/react-query'
import useGetRoles from "@/hooks/useGetRoles";

const getRoles = async () => {
    let rolesAPI
    // try {
    rolesAPI = await axios.post(`${backendUrl}api/admin-dashboard/get`, {
        user_email: session?.user?.email
    });

    console.log(rolesAPI?.data)
    return rolesAPI.data
    // setRoles(rolesAPI?.data)
    // }
    // catch (error) {
    //     console.error(error)
    // }

}

const NavBarClient = ({ session, roles = [] }) => {
    const router = useRouter()


    // const { setTheme, theme, systemTheme } = useTheme()
    // // const [isDarkModeTrue, setIsDarkModeTrue] = useState(systemTheme)

    // // console.log("theme", theme, systemTheme)
    // function toggleDarkMode() {
    //     const currentTheme = theme === "system" ? systemTheme : theme
    //     // setIsDarkModeTrue(!isDarkModeTrue)
    //     // setTheme()
    //     setTheme(currentTheme === "dark" ? "light" : "dark")
    // }
    // const [roles, setRoles] = useState([]);



    // const { data, isLoading, isError, error, refetch } = useQuery({
    //     queryKey: ['roles'],       // unique key for caching
    //     queryFn: getRoles,   // function to fetch data
    //     staleTime: 1000 * 60,     // optional: avoid refetching for 1 min
    // })

    // const { roles } = useGetRoles(session)


    const { setTheme, theme } = useTheme();
    // const origin = typeof window !== 'undefined' ? window.location.origin : '';


    return (
        <>
            <div className="_border-black _border-2 m-5  h-14 ">
                <ul className="flex justify-end items-center">
                    <li><Button
                        className="mr-3"
                        variant="link"
                        onClick={() => router.push('/')}
                        draggable
                        onDragStart={(e) => {
                            const url = `${window.location.origin}/`;
                            e.dataTransfer.setData('text/plain', url);
                        }}
                    >
                        Backtesting App
                    </Button></li>
                    {/* <li><Button className="mr-3" variant="link" onClick={() => router.push('/create')}
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData('text/plain', `${websiteName}/create`)}>Create new Logic</Button></li> */}
                    <li><Button className="mr-3" variant="link" onClick={() => router.push('/create-2')}
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData('text/plain', `${window.location.origin}/create-2`)}>Create 2</Button></li>
                        
                    <li><Button className="mr-3" variant="link" onClick={() => router.push('/categories')}
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData('text/plain', `${window.location.origin}/categories`)}>Categories</Button></li>

                    {(session) ? <li><Button className="mr-3" variant="link" onClick={() => router.push('/dashboard/1')}
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData('text/plain', `${window.location.origin}/dashboard/1`)}>Dashboard</Button></li> : null}
                    {(session) ? <li><Button className="mr-3" variant="link" onClick={() => router.push('/stock-list')}
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData('text/plain', `${window.location.origin}/stock-list`)}>Stock List</Button></li> : null}

                    <li>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>

                            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        </Button>
                    </li>
                    {!session && <Link className='underline p-3 border border-black rounded-md' href={"/sign-in"}>Signin</Link>}
                    {!!session && <Logout />}
                    {/* {(session) ? <li >
                        <ProfileDropdown />
                    </li> : null} */}
                </ul>
            </div>
            {/* {console.log(roles.includes("createScan.run"))} */}
            {(roles.includes("createScan.run")) && <div>
                <ul>
                    <li><Button className="mr-3" variant="link" onClick={() => router.push('/admin-dashboard')}
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData('text/plain', `${window.location.origin}/admin-dashboard`)}>Admin Dashboard</Button></li>
                </ul>
            </div>}
        </>
    );


}


export default NavBarClient