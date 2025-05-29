"use client";
import DateRangePicker from "@/components/DateRangePicker";
import EntryUI from "@/components/logicUI/EntryUI";
import StockListSelection from "@/components/StockListSelection";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons"
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import Number from "@/components/indicators/Number";
import { Label } from "@/components/ui/label";
import ExitUI from "@/components/logicUI/ExitUI";
import ConditionUI from "@/components/logicUI/ConditionUI";
import EntryPrice from "@/components/logicUI/EntryPrice";


export default function Create() {
    // const [collectContent, setCollectContent] = useState({
    //     "dateRange": {
    //         "from": new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    //         "to": new Date().toISOString().split('T')[0]
    //     },
    //     "entry": [{
    //         "AND": [{
    //             "condition": [{
    //                 "indicator": [{ "value": "-10", "label": "-10" },
    //                 { "value": 60, "label": "1h" },
    //                 { "value": "sma" },
    //                 { "value": "close" },
    //                 { "value": 20 }
    //                 ]
    //             }]
    //         },
    //         {
    //             "AND": [{
    //                 "condition": [{
    //                     "indicator": [{ "value": "=-10", "label": "=-10" },
    //                     { "value": 60, "label": "1h" },
    //                     { "value": "sma" },
    //                     { "value": "close" },
    //                     { "value": 20 }
    //                     ]
    //                 }]
    //             }, {
    //                 "condition": [{
    //                     "indicator": [{ "value": "=15", "label": "=15" },
    //                     { "value": 60, "label": "1h" },
    //                     { "value": "sma" },
    //                     { "value": "close" },
    //                     { "value": 20 }
    //                     ]
    //                 }]
    //             }]
    //         }]
    //     }
    //     ]
    // });

    const [collectContent, setCollectContent] = useState(
        {
            "dateRange": {
                "from": new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
                "to": new Date().toISOString().split('T')[0]
            },
            "entry": [{
                "AND": [{ "condition": [] }]
            }],

            "entryPrice": [{ "condition": [] }],

            "quantity": [{ "condition": [] }],
        }
    )

    // const [createEquation, setcreateEquation] = useState()

    const [runButton, setRunButton] = useState(true);

    const getDateRange = (data) => {

        collectContent["dateRange"] = data
        setCollectContent({ ...collectContent })
    }
    const getEntry = (data) => {
        // const temp = { ...collectContent }
        // temp["entry"] = data
        // setCollectContent(temp)


        collectContent["entry"] = data
        setCollectContent({ ...collectContent })
    }
    const getEntryPrice = (data) => {
        collectContent["entryPrice"] = data
        setCollectContent({ ...collectContent })
    }



    useEffect(() => {
        console.log("collectContent")
        console.log(collectContent)
    }, [collectContent])




    const postData = async () => {
        setRunButton(false)
        try {

            const response = await axios.post('http://127.0.0.1:8000/api/run-backtesting', collectContent);
            let r = response.data.data_result
            console.log('Success:', JSON.parse(r));

        } catch (error) {
            console.error('Error:', error);

        }
        setRunButton(true)
    };

    // Call the function



    return (
        <>
            <div className='container mx-auto min-w-[600px] grid grid-cols-3 grid-row-3 '>

                <StockListSelection getDateRange={getDateRange} >Stock List</StockListSelection>

                {/* <DateRangePicker getDateRange={getDateRange}></DateRangePicker> */}

                <DatePickerWithRange dateRange={collectContent["dateRange"]} getDateRange={getDateRange}></DatePickerWithRange>

                <Card className="row-start-2 col-span-3 mb-3">

                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mx-2">
                        Entry
                    </h4>

                    <EntryUI entry={collectContent["entry"]} getEntry={getEntry}></EntryUI>


                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mx-2">
                        Entry Price
                    </h4>
                    <EntryPrice exitPrice={collectContent["entryPrice"]}></EntryPrice>


                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mx-2">
                        Quantity
                    </h4>
                    <EntryPrice exitPrice={collectContent["quantity"]}></EntryPrice>

                </Card>

                <div className="row-start-3 col-span-3">
                    <Card>
                        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mx-2">
                            Exit
                        </h4>
                        <ExitUI></ExitUI>

                    </Card>
                </div>



                <div className={"row-start-4 col-span-3  flex flex-row space-x-3 ml-4 m-4"}>
                    {runButton ? <Button onClick={postData} className={``}>Run</Button>
                        : <Button disabled>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button>
                    }




                    <Button className={``} variant="secondary">Save</Button>
                    <Button className={``} variant="secondary">Save As</Button>
                </div>
            </div>

        </>


    );
}