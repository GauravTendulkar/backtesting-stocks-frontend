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



export default function Supertrend(props) {


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

    



    const handleATRLengthChange = (v) => {

        let temp = [...smaUpdate];
        temp[3]["value"] = v
        setSmaUpdate(temp);
        props.passto(temp);
    }

    const handleFactorChange = (v) => {

        let temp = [...smaUpdate];
        temp[4]["value"] = v
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
                        variant="outline">{`[${smaUpdate[0]["value"]}]${smaUpdate[1]["label"]} ${smaUpdate[2]["label"]}(${smaUpdate[3]["value"]}, ${smaUpdate[4]["value"]})`}</Button>
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


                        <Label>ATR Length</Label>
                        <InputInteger value={smaUpdate[3]["value"]} onChange={(e) => handleATRLengthChange(e)} ></InputInteger>

                        {/* 
                            </select> */}
                        <Label >Factor</Label>
                        <InputFloat value={smaUpdate[4]["value"]} onChange={(e) => handleFactorChange(e)}></InputFloat>
                    </div>
                </PopoverContent>
            </Popover>



        </>
    );
}