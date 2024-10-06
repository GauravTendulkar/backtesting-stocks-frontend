"use client";
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const NavBar = () => {
    const router = useRouter()
    const { setTheme } = useTheme()
    return (
        <>
            <nav className="_border-black _border-2 m-5">
                <ul className="flex justify-end ">
                    <li><Button className="mr-3" variant="link" onClick={() => router.push('/')}>Home</Button></li>
                    <li><Button className="mr-3" variant="link" onClick={() => router.push('/create')}>Create new Logic</Button></li>
                    <li><Button className="mr-3" variant="link" onClick={() => router.push('/scans')}>Scans</Button></li>
                    <li><Button className="mr-5" variant="link" onClick={() => router.push('/test')}>Test</Button></li>
                    
                    <DropdownMenu>
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
                    </DropdownMenu>
                    
                </ul>
            </nav>
        </>
    );


}


export default NavBar