"use client"

import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { backendUrl } from "@/json-data/backendServer";
import axios from 'axios';

export const TokenContext = createContext(null);


const TokenContextProvider = (props) => {

    const [token, setToken] = useState(Cookies.get('jwt_token'));
    const [isTokenValid, setIsTokenValid] = useState(false);




    const changeToken = (data) => {
        setToken(data)
        Cookies.set('jwt_token', data, {
            expires: 7, // Expires in 7 days
            secure: process.env.NODE_ENV === 'production', // Use secure in production
            sameSite: 'strict'
        });
    }


    const removeToken = () => {
        Cookies.remove('jwt_token');
        setToken(null)
    }


    const checktokenValidaty = async () => {
        // console.log("checktokenValidaty")
        try {
            const response = await axios.get(`${backendUrl}oauth/users/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            // console.log(response)
            setIsTokenValid(true)
            // console.log("setIsTokenValid(true)")

        } catch (error) {
            setIsTokenValid(false)
            // console.log("setIsTokenValid(false)")
            // router.push(`/signin`)
        }
    }

    useEffect(() => {
        // console.log("token  *****************", token)

        checktokenValidaty()

    }, [token])

    return (


        <TokenContext.Provider value={{ token, changeToken, removeToken, isTokenValid, checktokenValidaty }}>
            {props.children}
        </TokenContext.Provider>
    )

}

export default TokenContextProvider