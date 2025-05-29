"use client";
import { backendUrl } from '@/json-data/backendServer';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
// import { ToastAction } from '../ui/toast';
import { useRouter } from 'next/navigation';
import { TokenContext } from './TokenContext';

export const StockListContext = createContext(null);


const StockListContextProvider = (props) => {

    // const token = Cookies.get('jwt_token');
    const [stockData, setStockData] = useState(null);
    const { token } = useContext(TokenContext);



    const getStockData = async () => {
        try {
            // console.log("StockListContextProvider", token)
            if (token) {


                const response = await axios.get(`${backendUrl}api/stock-list`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log("getStockData token", response.data)
                setStockData(response.data)
            }
            else {
                const response = await axios.get(`${backendUrl}api/stock-list`);
                console.log("getStockData notoken", response.data)
                setStockData(response.data)
            }
        }
        catch (error) {

            console.log("Error ", error)

        }
    }


    useEffect(() => {
        getStockData()
    }, [token])

    // useEffect(() => {
    //     getStockData()
    // }, [])

    // useEffect(() => {
    //     console.log("useEffect stockData", stockData)
    // }, [stockData])

    const { toast } = useToast()
    const router = useRouter();
    const saveStockData = async () => {


        try {
            // console.log("******************************", stockData.customStockList)
            if (token) {
                const response = await axios.put(`${backendUrl}api/stock-list`, stockData.customStockList, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log("saveStockData", response)
                if (response?.status == 200) {
                    return (

                        toast({
                            title: "Saved",
                            description: response?.data?.message,

                        })
                    )
                }


            }
            else {
                return (

                    toast({
                        title: "Sign In",
                        description: "Please signin to be able to Save new Scan ",
                        action: (
                            <ToastAction altText="Goto schedule to undo" onClick={() => {
                                router.push(`/signin`)
                                router.refresh()
                            }} >Sign In</ToastAction>

                        ),
                    })
                )
            }
        }
        catch (error) {

            console.log("Error ", error)
            if (error?.response?.status === 400) {


                return (

                    toast({
                        title: "Limit Excided",
                        description: error?.response?.data?.detail,
                        // action: (
                        //     <ToastAction altText="Goto schedule to undo" onClick={() => {
                        //         router.push(`/signin`)
                        //         router.refresh()
                        //     }} >Sign In</ToastAction>

                        // ),
                    })
                )
            }

        }
    }



    return (

        <StockListContext.Provider value={{ stockData, setStockData, saveStockData, getStockData }}>

            {props.children}

        </StockListContext.Provider>
    )
}

export default StockListContextProvider