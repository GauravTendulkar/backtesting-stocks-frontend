
"use client";
import { backendUrl } from '@/json-data/backendServer';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
// import { cookies } from 'next/headers';
import React, { createContext, useEffect, useState } from 'react'


export const ValidateAccessTokenContext = createContext([]);

const ValidateAccessTokenContextProvider = (props) => {

    const [isTokenValid, setIsTokenValid] = useState(false);
    const router = useRouter();
    useEffect(() => {
        checktokenValidaty();
    })
    // const cookieStore = cookies();
    // const tokenCookie = cookieStore.get('jwt_token');

    // const token = tokenCookie?.value;
    const checktokenValidaty = async () => {
        const token = Cookies.get('jwt_token');
        // if (!token) {
        //     console.log("!token", !token)
        //     // redirect(`/signin`)
        //     router.push(`/signin`)

        // }

        try {
            const response = await axios.get(`${backendUrl}oauth/users/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            console.log(response)
            setIsTokenValid(true)
            console.log("setIsTokenValid(true)")

        } catch (error) {
            setIsTokenValid(false)
            console.log("setIsTokenValid(false)")
            // router.push(`/signin`)
        }
    }




    return (
        <ValidateAccessTokenContext.Provider value={{ isTokenValid, checktokenValidaty }}>
            {props.children}
        </ValidateAccessTokenContext.Provider>
    )
}

export default ValidateAccessTokenContextProvider