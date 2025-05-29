"use client";
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { useState, useContext, useEffect } from "react"

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import ProfileDropdown from "./dropdowns/ProfileDropdown ";
import { ValidateAccessTokenContext } from "@/app/context/ValidateAccessTokenContext";
import { TokenContext } from "@/app/context/TokenContext";

const NavBarClient = ({ isTokenValid: initialIsTokenValid }) => {
    const router = useRouter()
    // const { setTheme } = useTheme()
    // const [isDarkModeTrue, setIsDarkModeTrue] = useState(() => {setTheme("system")})
    const { isTokenValid: contextIsTokenValid } = useContext(TokenContext);

    const [isTokenValid, setIsTokenValid] = useState(initialIsTokenValid)
    // console.log("NavBarClient", isTokenValid, initialIsTokenValid, contextIsTokenValid)
    useEffect(() => {
        // Whenever context changes (due to login/logout), update the local state.
        if (initialIsTokenValid == false) {

            setIsTokenValid(contextIsTokenValid)
        }

    }, [contextIsTokenValid, initialIsTokenValid])

    const { setTheme, theme, systemTheme } = useTheme() // Add systemTheme to the destructuring
    const [isDarkModeTrue, setIsDarkModeTrue] = useState(() => { setTheme("system") })

    function toggleDarkMode() {
        const currentTheme = theme === "system" ? systemTheme : theme
        setIsDarkModeTrue(!isDarkModeTrue)
        setTheme(currentTheme === "dark" ? "light" : "dark")
    }

    // const websiteName = "http://localhost:3000"
    // const { isTokenValid, checktokenValidaty } = useContext(ValidateAccessTokenContext);




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
                    {(isTokenValid) ? <li><Button className="mr-3" variant="link" onClick={() => router.push('/dashboard/1')}
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData('text/plain', `${window.location.origin}/dashboard/1`)}>Dashboard</Button></li> : null}
                    <li><Button className="mr-3" variant="link" onClick={() => router.push('/stock-list')}
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData('text/plain', `${window.location.origin}/stock-list`)}>Stock List</Button></li>
                    {/* <li><Button className="mr-5" variant="link" onClick={() => router.push('/test')}
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData('text/plain', `${websiteName}/stock-list`)}>Test</Button></li> */}
                    {/* <li> <Button
                        className="mr-3"
                        variant="link"
                        onClick={() => router.push('/stock-list')}
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData('text/plain', `${websiteName}/stock-list`)}>
                        Stock List
                    </Button></li> */}
                    {(!isTokenValid) ? <li> <Button
                        className="mr-3"
                        variant=""
                        onClick={() => router.push('/signup')}
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData('text/plain', `${window.location.origin}/signup`)}>
                        Sign Up
                    </Button></li> : null}
                    {(!isTokenValid) ? <li> <Button
                        className="mr-3"
                        variant="outline"
                        onClick={() => router.push('/signin')}
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData('text/plain', `${window.location.origin}/signin`)}>
                        Sign In
                    </Button></li> : null}


                    {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu> */}
                    <li>
                        <Button variant="outline" size="icon" onClick={() => {
                            toggleDarkMode()
                        }}>

                            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        </Button>
                    </li>
                    {(isTokenValid) ? <li >
                        <ProfileDropdown />
                    </li> : null}
                </ul>
            </div>
        </>
    );


}


export default NavBarClient