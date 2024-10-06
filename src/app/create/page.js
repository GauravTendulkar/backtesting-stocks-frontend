"use client";
import DateRangePicker from "@/components/DateRangePicker";
import EntryUI from "@/components/logicUI/EntryUI";
import StockListSelection from "@/components/StockListSelection";
import { useState, useEffect } from "react";
import axios from 'axios';



export default function Create() {
    const [collectContent, setCollectContent] = useState({});

    const getDateRange = (data) => {
        const temp = { ...collectContent }
        temp["dateRange"] = data
        setCollectContent(temp)
    }
    const getEntry = (data) => {
        const temp = { ...collectContent }
        temp["entry"] = data
        setCollectContent(temp)
    }



    useEffect(() => {
        console.log("collectContent")
        console.log(collectContent)
    }, [collectContent])




    const postData = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/run-backtesting', {
                key1: 'value1',
                key2: 'value2',
            });

            console.log('Success:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Call the function
    


    return (
        <>  <div className='container mx-auto'>
            <div className="  grid grid-cols-2 grid-row-2  ">
                <StockListSelection></StockListSelection>
                <DateRangePicker getDateRange={getDateRange}></DateRangePicker>
                <div className="col-span-2">
                    <EntryUI getEntry={getEntry}></EntryUI>
                </div>
            </div>
            <div className={"flex flex-row space-x-3 ml-4"}>
                <button onClick={postData} className={`border-2 border-black px-2 py-1 rounded-md bg-amber-300`}>Run</button>

                <button className={`border-2 border-black px-2 py-1 rounded-md bg-amber-300`}>Save</button>
                <button className={`border-2 border-black px-2 py-1 rounded-md bg-amber-300`}>Save As</button>
            </div>
        </div>
        </>


    );
}