"use client";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { EquationContext } from "@/app/context/EquationContext";
import DialogPopUp from "../DialogPopUp";
import TimeFrameOption from "../TimeFrameOption";

import InputInteger from "../InputInteger";
import { Label } from "../ui/label";
import InputFloat from "../InputFloat";

const BollingerBands = (props) => {

    const [smaUpdate, setSmaUpdate] = useState(props.arrayPass);

    // useContext ________________________________________________________________________________________
    const { ohlc } = useContext(EquationContext);


    const [isOnClickTrue, setIsOnClickTrue] = useState(false)



    useEffect(() => {
        setSmaUpdate(props.arrayPass)
    }, [props.arrayPass])


    const passtoSma = (v) => {

        let temp = [...smaUpdate]

        temp.splice(0, 2, v[0], v[1])

        setSmaUpdate(temp)
        props.passto(temp)

    }




    const handleLengthChange = (v) => {

        let temp = [...smaUpdate];
        temp[4]["value"] = v
        setSmaUpdate(temp);
        props.passto(temp);
    }

    const maTypes = [
        { "value": "sma" },
        { "value": "ema" },
    ]

    const handleMATypesChange = (v) => {
        let temp = [...smaUpdate]
        temp[4] = maTypes[maTypes.findIndex((item) => item.value === v)]
        setSmaUpdate(temp)
        props.passto(temp)
    }

    const handleOhlcChangeFor3 = (v) => {
        let temp = [...smaUpdate]
        temp[5] = ohlc[ohlc.findIndex((item) => item.value === v)]
        setSmaUpdate(temp)
        props.passto(temp)
    }

    const handleStdDevChange = (v) => {

        let temp = [...smaUpdate];
        temp[6]["value"] = v
        setSmaUpdate(temp);
        props.passto(temp);
    }

    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        onClick={() => {

                            setIsOnClickTrue(true)
                        }}
                        variant="outline">{`[${smaUpdate[0]["value"]}]${smaUpdate[1]["label"]} ${smaUpdate[2]["value"]}(${smaUpdate[3]["value"]}, ${smaUpdate[4]["value"]}, ${smaUpdate[5]["value"]}, ${smaUpdate[6]["value"]})`}</Button>
                </PopoverTrigger>
                <PopoverContent className="">
                    <div className='flex flex-col gap-2'>
                        {/* <TimeFrameOption variablePass={smaUpdate.slice(0, 2)} passto={passtoSma}></TimeFrameOption> */}
                        <Label>Time Frame</Label>
                        <TimeFrameOption
                            isOnClickTrue={isOnClickTrue}
                            setIsOnClickTrue={setIsOnClickTrue}

                            variablePass={smaUpdate}
                            passto={passtoSma}></TimeFrameOption>
                        <Label>Length</Label>
                        <InputInteger value={smaUpdate[3]["value"]} onChange={(e) => handleLengthChange(e)} ></InputInteger>
                        <Label>Basis MA Type</Label>
                        <select value={smaUpdate[4]["value"]} onChange={(e) => handleMATypesChange(e.target.value)} className='border-2 border-black mr-auto  overflow-y-scroll'>

                            {maTypes.map((e, id) => {
                                return (
                                    <option key={id} value={e.value}>{e.value}</option>
                                );
                            })}


                        </select>

                        <Label>OHLC</Label>
                        <select value={smaUpdate[5]["value"]} onChange={(e) => handleOhlcChangeFor3(e.target.value)} className='border-2 border-black mr-auto  overflow-y-scroll'>

                            {ohlc.map((e, id) => {
                                return (
                                    <option key={id} value={e.value}>{e.value}</option>
                                );
                            })}


                        </select>

                        <Label>Std dev</Label>

                        <InputFloat value={smaUpdate[6]["value"]} onChange={(e) => handleStdDevChange(e)} ></InputFloat>
                    </div>
                </PopoverContent>
            </Popover>


        </>
    )
}

export default BollingerBands