
import React from 'react'


import StockList from '@/components/stockList/StockList';
import StockListSelection from '@/components/stockList/StockListSelection';
import { auth } from '@/auth';
import axios from 'axios';
import { serverSideBackendUrl } from '@/json-data/backendServer';

const Stocklist = async () => {


    const session = await auth();


    let response
    try {



        response = await axios.post(`${serverSideBackendUrl}api/stock-list/get/`, {
            user_email: session?.user?.email || null
        });
        // console.log("getStockData token", response.data)


    }
    catch (error) {

        console.log("Error ", error)

    }

    return (
        <>


            {/* <StockListSelection valueList="list 12" onChangeList={(data) => { console.log("data", data) }} /> */}
            <StockList session={session} data={response?.data} />


        </>
    )
}


export default Stocklist


