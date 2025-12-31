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
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

import EntryPrice from '@/components/logicUI2/EntryPrice';
import Quantity from '@/components/logicUI2/Quantity';
import ExitUI from '@/components/logicUI2/ExitUI';
import { ToastAction } from '../ui/toast';
import { DateRangePickerTradingView } from '../DateRangePickerTradingView';
import { useToast } from '@/hooks/use-toast';
// import TradeTable from '../tables/TradeTable';
import { StockListContext } from '@/app/context/StockListContext';
import LikeDislikeButton from '../likeDislike/LikeDislikeButton';
import { getTokenForClientSessionData } from '@/utils/security';
import TradeAnalyticsMetrics from '../pnlCharts/TradeAnalyticsMetrics';
import { format, subMonths } from 'date-fns';
// import { Label } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from '../ui/label';
import StockBarGraph from '../pnlCharts/StockBarGraph';
import { decompressGzippedBase64Json } from '@/function/dataDecompression';
import ExportButtons from '../tables/ExportButtons';
// import VirtualBarChart from '../pnlCharts/VirtualBarChart';

const TimeCounter = dynamic(() => import('../TimeCounter'));
const PNLLineChart = dynamic(() => import('../pnlCharts/PNLLineChart'));
const VirtualBarChart = dynamic(() => import('../pnlCharts/VirtualBarChart'));
const TradeTable = dynamic(() => import('../tables/TradeTable'));

// const StockListSelection1 = React.memo(StockListSelection)

const CollectionOfAllComponents = ({ valueProp = {}, session = null, data }) => {

    const pathname = usePathname();
    // console.log("pathname", pathname)
    const router = useRouter();


    const [currentComponentState, setCurrentComponentState] = useState(valueProp);

    const { stockData, setStockData, saveStockData, getStockData, setSessionStockList } = useContext(StockListContext);




    useEffect(() => {
        setStockData(data)
    }, [data])

    // setStockData(data)

    useEffect(() => {
        setSessionStockList(session)
    }, [session])
    useEffect(() => {


        if (JSON.stringify(valueProp) !== JSON.stringify(currentComponentState)) {
            setCurrentComponentState(valueProp)
        }
    }, [valueProp]);


    const [runButton, setRunButton] = useState(true);
    const [isDialogOpenSaveAs, setIsDialogOpenSaveAs] = useState(false)
    const [isDialogOpenSave, setIsDialogOpenSave] = useState(false)

    const [stockListDisplay, setStockListDisplay] = useState([])
    const [stockListName, setStockListName] = useState(valueProp.stockListName)        //valueProp.stockListName
    const [command, setCommand] = useState("reset");
    const [stocksMaxLength, setStocksMaxLength] = useState(null);

    const { toast } = useToast()
    useEffect(() => {
        // console.log("Create2", currentComponentState)
    }, [currentComponentState])

    const onChange = (data, obj) => {
        let temp = { ...currentComponentState }
        temp["equation"][obj] = data

        setCurrentComponentState({ ...temp })
        // console.log("Create2", temp)


    }


    // useEffect(() => {
    //     console.log("stockListName C2", stockListName)
    // }, [stockListName])

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
            data.reduce((acc, { entry_date, pnl, stock }) => {
                if (!acc[entry_date]) {
                    acc[entry_date] = { entry_date, pnl: 0, stocks: [] };
                }
                acc[entry_date].pnl += pnl;  // Sum PNL
                if (!acc[entry_date].stocks.includes(stock)) {
                    acc[entry_date].stocks.push(stock); // Unique Stocks in Array
                }
                return acc;
            }, {})
        );

        function sortDateArray(dateArray) {

            return dateArray.sort((a, b) => new Date(a["entry_date"]) - new Date(b["entry_date"]));
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
    const [errorDateRangeFrom, setErrorDateRangeFrom] = useState("");


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


    // useEffect(() => {
    //     handleScroll()
    //     // console.log(pnlResult)
    //     console.log("pnlResult", currentComponentState)
    // }, [pnlResult]);

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
            const response = await axios.post(`${backendUrl}api/run-backtesting/entry_exit_backtest`, {
                ...getPostData,
                // user_email: session?.user?.email || null,
                // user_email: undefined || null,
                contentId: currentComponentState["_id"],
                link: currentComponentState["link"],
                tradeMode: currentComponentState?.["tradeMode"] || "entry_exit_backtest"
            },
                {
                    headers: {
                        Authorization: `Bearer ${await getTokenForClientSessionData()}`,
                    }
                });
            let r = response.data.data_result
            r = decompressGzippedBase64Json(r)
            console.log('Success:', JSON.parse(r));
            setPnlResult(JSON.parse(r))
            // handleScroll()
        } catch (error) {
            // console.error('Error:', error);
            if (error?.response?.status === 400) {
                console.error('Error***********:', error?.response?.data?.detail);
                setErrorDateRange(error?.response?.data?.detail?.error)
                setErrorDateRangeFrom(error?.response?.data?.detail?.fromDate)

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

    const postDataConditionScanner = async () => {
        setRunButton(false)
        const getPostData = removeIfSwitchIsFalse()
        // console.log("postDataConditionScanner", getPostData)

        console.time('PostDataRequest');

        setCommand("reset");
        setTimeout(() => {
            setCommand("start");
        }, 100);
        try {
            setErrorDateRange(null);
            setPnlResult([]);
            const response = await axios.post(`${backendUrl}api/run-backtesting/condition_scanner`, {
                ...getPostData,
                contentId: currentComponentState["_id"],
                link: currentComponentState["link"],
                tradeMode: currentComponentState?.["tradeMode"] || "condition_scanner"
            },
                {
                    headers: {
                        Authorization: `Bearer ${await getTokenForClientSessionData()}`,
                    }
                });
            let r = decompressGzippedBase64Json(response.data.data_result);
            console.log('Success:', JSON.parse(r));
            setStocksMaxLength(response?.data?.max_length)
            setPnlResult(JSON.parse(r))
            // handleScroll()
        } catch (error) {
            // console.error('Error:', error);
            if (error?.response?.status === 400) {
                // console.error('Error***********:', error?.response?.data?.detail);
                setErrorDateRange(error?.response?.data?.detail?.error)
                setErrorDateRangeFrom(error?.response?.data?.detail?.fromDate)

            }
            console.error("error")
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


    const setFromDate = () => {
        const temp = { ...currentComponentState };
        temp["equation"]["dateRange"]["from"] = errorDateRangeFrom;
        setCurrentComponentState(temp);
        setErrorDateRange(null);
        setErrorDateRangeFrom("");
    }


    const handleSaveAs = async (data) => {

        setCurrentComponentState({ ...data })


        data["equation"]["dateRange"]["from"] = format(subMonths(new Date(), 1), "yyyy-MM-dd")
        data["equation"]["dateRange"]["to"] = format(new Date(), "yyyy-MM-dd")
        data["equation"] = JSON.stringify(data["equation"])


        try {
            console.log("handleSaveAs", session?.user?.email)
            const response = await axios.post(
                `${backendUrl}equations/save-as/`,

                {
                    ...data,
                    // user_email: session?.user?.email || null
                },
                {
                    headers: {
                        Authorization: `Bearer ${await getTokenForClientSessionData()}`,
                    }
                }
            );

            // console.log('Response:', response.data);
            if (response.data) {
                router.push(`/strategy-builder/${response.data}`)
            }

        } catch (error) {
            // console.error('Error submitting data:', error.response.data.detail);
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


                return (

                    toast({
                        title: "Sign In",
                        description: "Please signin to be able to Save new Scan ",
                        action: (
                            <ToastAction altText="Goto schedule to undo" onClick={() => {
                                router.push(`/sign-in`)
                                router.refresh()
                            }} >Sign In</ToastAction>

                        ),
                    })
                )
            }

        }

    }



    const handleSave = async (data) => {
        // console.log("_id in data", data)
        if ("_id" in data) {

            try {
                setCurrentComponentState({ ...data })
                data["equation"] = JSON.stringify(data["equation"])
                const response = await axios.put(`${backendUrl}equations/${data["_id"]}`, {
                    ...data,
                    // user_email: session?.user?.email || null
                },
                    {
                        headers: {
                            Authorization: `Bearer ${await getTokenForClientSessionData()}`,
                        }
                    });
                // console.log('Response:', response.status);

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
                // console.error('Error submitting data:', error);

                if (error?.response?.status == 401) {
                    return (

                        toast({
                            title: "Sign In",
                            description: "Please signin to be able to save",
                            action: (
                                <ToastAction altText="Goto schedule to undo" onClick={() => {
                                    router.push(`/sign-in`)
                                    router.refresh()
                                }} >Sign In</ToastAction>

                            ),
                        })

                    )
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
                            router.push(`/sign-in`)
                            router.refresh()
                        }} >Sign In</ToastAction>

                    ),
                })

            )
        }
    }



    // const handleChangeList = useCallback((data) => {
    //     console.log("handleChangeList call", currentComponentState)
    //     setStockListDisplay(data.list || []);
    //     // setStockListName(data.name)

    //     // console.log("stockListName: data.name", currentComponentState)
    //     setCurrentComponentState({ ...currentComponentState, stockListName: data.name })
    //     // console.log("data ******************", data)
    // }, [data, currentComponentState]);

    const handleChangeList = (data) => {

        setStockListDisplay(data.list || []);
        // setStockListName(data.name)


        // setCurrentComponentState({ ...currentComponentState, stockListName: data.name })
        // console.log("data ******************", data)
    }


    const [isVisible, setIsVisible] = useState(false);


    const tradeMode = [
        { value: "entry_exit_backtest", label: "Entry Exit Backtest" },
        { value: "condition_scanner", label: "Condition Scanner" },
    ]


    const handleTradeModeChange = (value) => {

        let temp = { ...currentComponentState }
        // temp = { ...temp, tradeMode: value }
        setCurrentComponentState({ ...temp, tradeMode: value })
        // setCurrentComponentState({ ...temp })

        setPnlResult([])
        setStocksMaxLength(null)

    }

    const handleRunButton = () => {
        if (currentComponentState?.tradeMode === "condition_scanner") {
            return (
                <Button onClick={postDataConditionScanner}>Run</Button>
            )
        }
        else if (currentComponentState?.tradeMode === "entry_exit_backtest") {
            return (
                <Button onClick={postData}>Run</Button>
            )
        }

    }


    return (
        <div className="container mx-auto space-y-6 px-4 py-4 min-w-[600px]">

            {currentComponentState.title && (
                <div className="p-4 bg-muted rounded-lg shadow-sm">
                    <h1 className="text-3xl font-semibold text-foreground">{currentComponentState.title}</h1>
                </div>
            )}

            {/* Header Controls */}
            <div className="flex flex-wrap gap-4 items-center">
                <Button onClick={() => setIsVisible(!isVisible)}>
                    {isVisible ? "Hide Stock List" : "Show Stock List"}
                </Button>
                {pathname !== "/strategy-builder" && (
                    <ButtonEnableAfterInterval noOfIntervals={10} onClick={() => handleSave(currentComponentState)}>
                        Quick Save
                    </ButtonEnableAfterInterval>
                )}
                <StockListSelection
                    valueList={stockListName}
                    onChangeList={handleChangeList}
                    session={session}
                />

                <Label>Trade Mode:-</Label>
                <div>
                    <Select value={currentComponentState?.tradeMode} onValueChange={handleTradeModeChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Trade Mode" />
                        </SelectTrigger>
                        <SelectContent>
                            {tradeMode.map((mode) => (
                                <SelectItem key={mode.value} value={mode.value}>
                                    {mode.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {isVisible && (
                <div className="flex flex-wrap gap-2">
                    {stockListDisplay.map((stock, id) => (
                        <div key={id} className="px-2 py-1 bg-secondary rounded text-sm">
                            {stock}
                        </div>
                    ))}
                </div>
            )}

            {/* Entry Section */}
            <Card className={`${(currentComponentState?.tradeMode === "entry_exit_backtest") ? "p-4" : ""}  space-y-4`}>
                <div className="space-y-2">
                    {(currentComponentState?.tradeMode === "entry_exit_backtest") && <h2 className="text-xl font-medium">Entry</h2>}
                    <EntryUI valueProp={currentComponentState["equation"]["entry"]} onChangeProp={onChange} objectProp="entry" />
                </div>
                {(currentComponentState?.tradeMode === "entry_exit_backtest") && <EntryPrice valueProp={currentComponentState["equation"]["entryPrice"]} onChangeProp={onChange} objectProp="entryPrice" />}
                {(currentComponentState?.tradeMode === "entry_exit_backtest") && <Quantity valueProp={currentComponentState["equation"]["quantity"]} onChangeProp={onChange} objectProp="quantity" />}
            </Card>

            {/* Exit Section */}
            {(currentComponentState?.tradeMode === "entry_exit_backtest") && <Card className="p-4 space-y-2">

                <ExitUI valueProp={currentComponentState["equation"]["exitCollection"]} onChangeProp={onChange} objectProp="exitCollection" />
            </Card>}

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3">
                {runButton ? handleRunButton() : (
                    <Button disabled>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </Button>
                )}
                {pathname !== "/strategy-builder" && (
                    <Button variant="secondary" onClick={() => setIsDialogOpenSave(true)}>Save</Button>
                )}
                <Button variant="secondary" onClick={() => setIsDialogOpenSaveAs(true)}>Save As</Button>

                <DateRangePickerTradingView
                    dateRange={currentComponentState["equation"]["dateRange"]}
                    getDateRange={(date) => {
                        const temp = { ...currentComponentState };
                        temp["equation"]["dateRange"] = date;
                        setCurrentComponentState(temp);
                    }}
                />

                <TimeCounter command={command} timer={() => { }} />

                {pathname !== "/strategy-builder" && (
                    <LikeDislikeButton
                        contentId={currentComponentState["_id"]}
                        initialLikes={currentComponentState["likes"]}
                        initialDislikes={currentComponentState["dislikes"]}
                    />
                )}
            </div>

            {/* Error and PNL Results */}
            {errorDateRange && (
                <>
                    <div ref={dateRangeErrorRef} className="text-destructive text-sm">
                        {errorDateRange} <Button onClick={() => { setFromDate() }}>{errorDateRangeFrom}</Button>
                    </div>

                </>
            )}

            {/* {(errorDateRange === null && pnlResult.length > 0) && (
                <>
                    <div ref={pnlRef} className="max-h-[500px] overflow-auto border rounded-lg">
                        <TradeTable data={pnlResult} />
                    </div>

                    <TradeAnalyticsMetrics data={pnlResult} />
                    <PNLLineChart data={pnlResultFn(pnlResult)} />
                </>
            )} */}

            {(errorDateRange === null && pnlResult.length > 0 && currentComponentState?.tradeMode === "entry_exit_backtest") && (
                <>
                    {/* Trade Table Section */}
                    <div className="bg-white dark:bg-zinc-900 border rounded-lg p-4 shadow mb-2">
                        <div className="flex items-center justify-between p-2">
                            <h2 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
                                Trade Table
                            </h2>
                            <ExportButtons data={pnlResult} fileName="users" />
                        </div>
                        <div ref={pnlRef} className=" overflow-auto border rounded-lg">
                            {/* <div ref={pnlRef} className=""> */}
                            <TradeTable data={pnlResult} />
                        </div>
                    </div>

                    {/* Analytics Section */}
                    <div className="bg-blue-50 dark:bg-zinc-800 border rounded-lg p-4 shadow mb-6">
                        <h2 className="text-lg font-semibold mb-2 text-indigo-600 dark:text-indigo-400">Analytics Summary</h2>
                        <TradeAnalyticsMetrics data={pnlResult} />
                    </div>

                    {/* PNL Chart Section */}
                    <div className="bg-green-50 dark:bg-zinc-800 border rounded-lg p-4 shadow">
                        <h2 className="text-lg font-semibold mb-2 text-green-600 dark:text-green-400">PNL Trend</h2>
                        <PNLLineChart data={pnlResultFn(pnlResult)} />


                    </div>
                </>
            )}

            {(errorDateRange === null && stocksMaxLength !== null && pnlResult.length > 0 && currentComponentState?.tradeMode === "condition_scanner") &&
                // <StockBarGraph data={pnlResult} />
                <VirtualBarChart data={pnlResult} maxStocks={stocksMaxLength} />}

            {/* Dialogs */}
            {isDialogOpenSaveAs && (
                <DialogForSaveAs
                    open={isDialogOpenSaveAs}
                    setOpen={setIsDialogOpenSaveAs}
                    valueProp={currentComponentState}
                    onSubmitProp={handleSaveAs}
                />
            )}
            {isDialogOpenSave && (
                <DialogForSave
                    open={isDialogOpenSave}
                    setOpen={setIsDialogOpenSave}
                    valueProp={currentComponentState}
                    onSubmitProp={handleSave}
                />
            )}
        </div>
    );
};

export default CollectionOfAllComponents;