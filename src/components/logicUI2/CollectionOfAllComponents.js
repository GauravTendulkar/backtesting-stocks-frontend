"use client"

import React, { memo, useCallback, useContext, useEffect, useRef, useState } from 'react'
import EntryUI from '@/components/logicUI2/EntryUI';
import { Card } from '@/components/ui/card';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import DialogForSaveAs from '@/components/DialogForSaveAs';
import { useRouter } from 'next/navigation';
import DialogForSave from '../DialogForSave';
import ButtonEnableAfterInterval from '../buttons/ButtonEnableAfterInterval';
import { backendUrl } from '@/json-data/backendServer';
import StockListSelection from '../stockList/StockListSelection';
import { TokenContext } from '@/app/context/TokenContext';
import dynamic from 'next/dynamic';

import EntryPrice from '@/components/logicUI2/EntryPrice';
import Quantity from '@/components/logicUI2/Quantity';
import ExitUI from '@/components/logicUI2/ExitUI';
// import { ToastAction } from '../ui/toast';
import { DateRangePickerTradingView } from '../DateRangePickerTradingView';
// import TimeCounter from '../TimeCounter';
// import { useToast } from '@/hooks/use-toast';
import TradeTable from '../tables/TradeTable ';
// import PNLLineChart from '../pnlCharts/PNLLineChart';

// const EntryPrice = dynamic(() => import('@/components/logicUI2/EntryPrice'));
// const Quantity = dynamic(() => import('@/components/logicUI2/Quantity'));
// const ExitUI = dynamic(() => import('@/components/logicUI2/ExitUI'));
const ToastAction = dynamic(() => import('../ui/toast'));
// const DateRangePickerTradingView = dynamic(() => import('../DateRangePickerTradingView'));
const TimeCounter = dynamic(() => import('../TimeCounter'));
const useToast = dynamic(() => import('@/hooks/use-toast'));
// const TradeTable = dynamic(() => import('../tables/TradeTable'));
const PNLLineChart = dynamic(() => import('../pnlCharts/PNLLineChart'));


const StockListSelection1 = React.memo(StockListSelection)

const CollectionOfAllComponents = memo(({ valueProp = {} }) => {
    // console.log("CollectionOfAllComponents")
    // const cookieStore = cookies();
    // const tokenCookie = cookieStore.get('jwt_token');

    // const token = tokenCookie?.value;

    // const token = Cookies.get('jwt_token');
    const { token } = useContext(TokenContext);
    const router = useRouter();
    // if (!token) {
    //     // Handle case where no token is present
    //     // return <div>Please log in</div>;
    //     // redirect(`/signin`)
    //     router.push(`/signin`)
    // }

    const [currentComponentState, setCurrentComponentState] = useState(valueProp);

    // router.refresh()
    useEffect(() => {
        // setCurrentComponentState(valueProp)

        if (JSON.stringify(valueProp) !== JSON.stringify(currentComponentState)) {
            setCurrentComponentState(valueProp)
        }
    }, [valueProp]);

    // useEffect(() => {
    //     router.refresh()
    // }, [])

    const [runButton, setRunButton] = useState(true);
    const [isDialogOpenSaveAs, setIsDialogOpenSaveAs] = useState(false)
    const [isDialogOpenSave, setIsDialogOpenSave] = useState(false)

    const [stockListDisplay, setStockListDisplay] = useState([])
    const [stockListName, setStockListName] = useState(currentComponentState.stockListName)
    const [command, setCommand] = useState("reset");
    useEffect(() => {
        console.log("Create2", currentComponentState)
    }, [currentComponentState])

    const onChange = (data, obj) => {
        let temp = { ...currentComponentState }
        temp["equation"][obj] = data

        setCurrentComponentState({ ...temp })
        // console.log("Create2", temp)


    }


    const removeIfSwitchIsFalse = () => {

        function remove(data, flag) { //remove start

            // AND
            if (data.hasOwnProperty("AND")) {
                if (data["switch"] === true) {

                    let tempArr = []
                    for (let i = 0; i < data["AND"].length; i++) {
                        const t = remove(data["AND"][i], 1)
                        if (t) {
                            tempArr = [...tempArr, t]
                        }

                    }
                    if (tempArr.length !== 0) {

                        let tempReturn = { ...data }
                        tempReturn["AND"] = tempArr
                        return tempReturn

                    }
                    else if (flag == 0) {
                        let tempReturn = { ...data }
                        tempReturn["AND"] = []
                        return tempReturn
                    }
                }
            }

            // OR
            else if (data.hasOwnProperty("OR")) {
                if (data["switch"] === true) {
                    let tempArr = []
                    for (let i = 0; i < data["OR"].length; i++) {
                        const t = remove(data["OR"][i], 1)
                        if (t) {
                            tempArr = [...tempArr, t]
                        }
                    }
                    if (tempArr.length !== 0) {
                        let tempReturn = { ...data }
                        tempReturn["OR"] = tempArr
                        return tempReturn
                    }
                    else if (flag == 0) {
                        let tempReturn = { ...data }
                        tempReturn["OR"] = []
                        return tempReturn
                    }

                }
            }


            else if (data.hasOwnProperty("condition")) {
                if (data["switch"] === true & data["condition"].length > 0) {
                    // console.log("data", data["condition"].length, data)
                    return data
                }
            }



        }//remove start

        // let temp = { ...currentComponentState }
        let temp = JSON.parse(JSON.stringify(currentComponentState))

        temp["equation"]["entry"] = remove(temp["equation"]["entry"], 0)


        for (let i = 0; i < temp["equation"]["exitCollection"].length; i++) {
            temp["equation"]["exitCollection"][i]["exit"] = remove(temp["equation"]["exitCollection"][i]["exit"], 0)

        }
        let tempAppend = []
        for (let i = 0; i < temp["equation"]["exitCollection"].length; i++) {
            if (temp["equation"]["exitCollection"][i]["switch"] == true) {
                tempAppend.push(temp["equation"]["exitCollection"][i])
            }
        }

        temp["equation"]["exitCollection"] = tempAppend
        temp["equation"]["scanCategory"] = currentComponentState["scanCategory"]
        temp["equation"]["stockList"] = stockListDisplay
        return temp["equation"]
    }

    const [pnlResult, setPnlResult] = useState([]);



    const pnlResultFn = (data) => {
        let groupedData = Object.values(
            data.reduce((acc, { date, pnl, stock }) => {
                if (!acc[date]) {
                    acc[date] = { date, pnl: 0, stocks: [] };
                }
                acc[date].pnl += pnl;  // Sum PNL
                if (!acc[date].stocks.includes(stock)) {
                    acc[date].stocks.push(stock); // Unique Stocks in Array
                }
                return acc;
            }, {})
        );

        function sortDateArray(dateArray) {

            return dateArray.sort((a, b) => new Date(a["date"]) - new Date(b["date"]));
        }

        groupedData = sortDateArray(groupedData);

        for (let i = 1; i < groupedData.length; i++) {
            groupedData[i]["pnl"] = groupedData[i - 1]["pnl"] + groupedData[i]["pnl"]
        }

        function convertToTwoDigitFloat(num) {

            return parseFloat(num.toFixed(2));
        }
        for (let i = 0; i < groupedData.length; i++) {
            groupedData[i]["pnl"] = convertToTwoDigitFloat(groupedData[i]["pnl"])

        }

        // console.log("groupedData", groupedData)
        return groupedData
    }

    const [errorDateRange, setErrorDateRange] = useState(null);

    const pnlRef = useRef(null);

    const handleScroll = () => {
        pnlRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        // console.log("pnlRef   pnlRef")
    };
    const dateRangeErrorRef = useRef(null);
    const handleDateRangeErrorRefScroll = () => {
        dateRangeErrorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        // console.log("dateRangeErrorRef   dateRangeErrorRef")
    };

    useEffect(() => {
        handleScroll()
    }, [pnlResult]);

    useEffect(() => {
        if (errorDateRange) {

            handleDateRangeErrorRefScroll()
        }
    }, [errorDateRange]);

    const postData = async () => {
        setRunButton(false)
        const getPostData = removeIfSwitchIsFalse()
        // console.log("getPostData")
        // console.log(getPostData)
        console.time('PostDataRequest');

        setCommand("reset");
        setTimeout(() => {
            setCommand("start");
        }, 100);
        try {
            setErrorDateRange(null);
            setPnlResult([]);
            const response = await axios.post(`${backendUrl}api/run-backtesting`, getPostData);
            let r = response.data.data_result
            console.log('Success:', JSON.parse(r));
            setPnlResult(JSON.parse(r))
            // handleScroll()
        } catch (error) {
            // console.error('Error:', error);
            if (error?.response?.status === 400) {
                console.error('Error***********:', error?.response?.data?.detail);
                setErrorDateRange(error?.response?.data?.detail)

            }

        }
        finally {
            // Stop the timer
            console.timeEnd('PostDataRequest');
            setTimeout(() => {
                setCommand("stop");
            }, 100);
        }
        setRunButton(true)
    };



    const handleSaveAs = async (data) => {

        setCurrentComponentState({ ...data })
        data["equation"] = JSON.stringify(data["equation"])

        try {

            const response = await axios.post(
                `${backendUrl}equations/`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            // console.log('Response:', response.data);
            if (response.data) {
                router.push(`/create-2/${response.data}`)
            }

        } catch (error) {
            console.error('Error submitting data:', error.response.data.detail);
            if (error.response.status == 400) {
                return (

                    toast({
                        // title: "Title is missing",
                        description: error.response.data.detail,
                        // action: (
                        //     <ToastAction altText="Goto schedule to undo" onClick={() => {
                        //         router.push(`/signin`)
                        //         router.refresh()
                        //     }} >Sign In</ToastAction>

                        // ),
                    })
                )
            }
            if (error.response.status == 401) {
                // router.push(`/signin`)
                // router.refresh()

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

    }

    const { toast } = useToast()

    const handleSave = async (data) => {

        if ("_id" in data) {

            try {
                setCurrentComponentState({ ...data })
                data["equation"] = JSON.stringify(data["equation"])
                const response = await axios.put(`${backendUrl}equations/${data["_id"]}`, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                // console.log('Response:', response);

                if (response?.status === 200) {
                    return (

                        toast({
                            title: response?.data?.message,
                            // description: response?.data?.message,
                            // action: (
                            //     <ToastAction altText="Goto schedule to undo" onClick={() => {
                            //         router.push(`/signin`)
                            //         router.refresh()
                            //     }} >Sign In</ToastAction>

                            // ),
                        })

                    )
                }

            } catch (error) {
                console.error('Error submitting data:');

                if (error?.response?.status == 401) {
                    router.push(`/signin`)
                    router.refresh()
                }
            }
        }
        else {
            return (

                toast({
                    title: "Sign In",
                    description: "Please signin to be able to save",
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



    const handleChangeList = useCallback((data) => {
        setStockListDisplay(data.list || []);
        setStockListName(data.name)
        setCurrentComponentState({ ...currentComponentState, stockListName: data.name })
        // console.log("data ******************", data)
    }, [setStockListDisplay]);

    const [isVisible, setIsVisible] = useState(false);


    return (
        <div className='space-y-2 container mx-auto min-w-[600px]'>

            {(currentComponentState.title !== "") && <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md shadow">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {currentComponentState.title}
                </h2>
            </div>}
            <div className='flex items-center space-x-2'>

                <Button
                    onClick={() => setIsVisible(!isVisible)}
                    className=""
                >
                    {isVisible ? "Hide Stock List" : "Show Stock List"}
                </Button>
                <ButtonEnableAfterInterval noOfIntervals={10} onClick={() => handleSave(currentComponentState)}>Quick Save</ButtonEnableAfterInterval>
                <StockListSelection1 valueList={stockListName} onChangeList={handleChangeList} />

            </div>
            {isVisible && (
                <div className="flex flex-wrap gap-4">
                    {stockListDisplay.map((stock, id) => (
                        <div
                            key={id}
                            className="p-2 bg-gray-100 dark:bg-gray-800 rounded shadow"
                        >
                            {stock}
                        </div>
                    ))}
                </div>
            )}
            <Card className={" p-3 flex flex-col"}>
                <label>Entry</label>
                <EntryUI valueProp={currentComponentState["equation"]["entry"]} onChangeProp={onChange} objectProp="entry" />
                <label>EntryPrice</label>
                <EntryPrice valueProp={currentComponentState["equation"]["entryPrice"]} onChangeProp={onChange} objectProp="entryPrice"></EntryPrice>
                <label>Quantity</label>
                <Quantity valueProp={currentComponentState["equation"]["quantity"]} onChangeProp={onChange} objectProp="quantity"></Quantity>
            </Card>

            <Card className={"p-3 flex flex-col"}>
                <label>Exit</label>
                <ExitUI valueProp={currentComponentState["equation"]["exitCollection"]} onChangeProp={onChange} objectProp="exitCollection"></ExitUI>
            </Card >


            <div className={"flex flex-row ml-3 items-center  space-x-3  "}>

                {runButton ? <Button onClick={postData} className={``}>Run</Button>
                    : <Button disabled>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </Button>
                }

                <Button onClick={() => { setIsDialogOpenSave(true) }} className={``} variant="secondary">Save</Button>
                <Button onClick={() => { setIsDialogOpenSaveAs(true) }} className={``} variant="secondary">Save As</Button>
                <div>

                    {/* <DatePickerWithRange
                        dateRange={currentComponentState["equation"]["dateRange"]}
                        getDateRange={(date) => {
                            let temp = { ...currentComponentState }
                            temp["equation"]["dateRange"] = date

                            setCurrentComponentState({ ...temp })

                        }}></DatePickerWithRange> */}

                    <DateRangePickerTradingView
                        dateRange={currentComponentState["equation"]["dateRange"]}
                        getDateRange={(date) => {
                            let temp = { ...currentComponentState }
                            temp["equation"]["dateRange"] = date

                            setCurrentComponentState({ ...temp })

                        }}
                    ></DateRangePickerTradingView>



                </div>
                <TimeCounter
                    command={command}
                    timer={(data) => { }}
                />
            </div>
            {errorDateRange && <div ref={dateRangeErrorRef} className='p-1 text-red-500' >{errorDateRange}</div>}
            {/*  && */}
            {(errorDateRange === null) && pnlResult.length > 0 ? (
                < div ref={pnlRef} className="max-h-[500px] overflow-auto border rounded-lg">
                    <TradeTable data={pnlResult} />
                </div>
            ) : (
                <div></div>
            )}
            {(errorDateRange === null) && pnlResult.length > 0 ? <PNLLineChart data={pnlResultFn(pnlResult)} /> : <div></div>}



            {isDialogOpenSaveAs && <DialogForSaveAs
                open={isDialogOpenSaveAs}
                setOpen={setIsDialogOpenSaveAs}
                valueProp={currentComponentState}
                onSubmitProp={handleSaveAs}></DialogForSaveAs>}

            {isDialogOpenSave && <DialogForSave
                open={isDialogOpenSave}
                setOpen={setIsDialogOpenSave}
                valueProp={currentComponentState}
                onSubmitProp={handleSave}></DialogForSave>}
        </div >
    )
})

export default CollectionOfAllComponents