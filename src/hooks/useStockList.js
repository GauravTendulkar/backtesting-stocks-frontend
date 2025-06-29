// import { callAuth } from "@/app/actions";
import { auth } from "@/auth";
import axios from "axios";
import { useEffect, useState } from "react";

const useStockList = ({ session = null }) => {

    const [stockData, setStockData] = useState(null);
    // const session = await auth();

    const getStockData = async () => {
        try {


            // console.log(session)
            // if (!session) {
            //     redirect("/sign-in")
            // }
            // console.log("StockListContextProvider", token)
            // if (session) {


            // const session = await callAuth();
            const response = await axios.post(`${backendUrl}api/stock-list/get/`, {
                user_email: session?.user?.email
            });
            // console.log("getStockData token", response.data)
            console.log("stocklist ************************", response.data)
            // return response.data
            setStockData(response.data)
            // }
            // else {
            //     const response = await axios.get(`${backendUrl}api/stock-list/get/`);
            //     console.log("getStockData notoken", response.data)
            //     setStockData(response.data)
            // }
        }
        catch (error) {

            console.log("Error ", error)

        }
    }


    useEffect(() => {
        getStockData()
    }, [])

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
    return {
        stockData, setStockData, getStockData
    }

}

export default useStockList

