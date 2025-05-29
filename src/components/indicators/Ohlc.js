"use client";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import TimeFrameOption from "../TimeFrameOption";

import { useContext, useEffect, useState } from "react";
import { EquationContext } from "@/app/context/EquationContext";

export default function Ohlc(props) {

    const [ohlcUpdate, setOhlcUpdate] = useState(props.arrayPass);


    useEffect(() => {
        setOhlcUpdate(props.arrayPass)
    }, [props.arrayPass]);

    const [isOnClickTrue, setIsOnClickTrue] = useState(false)



    const passtoOhlc = (v) => {

        let temp = [...ohlcUpdate]
        // console.log("passtoSma")
        temp.splice(0, 2, v[0], v[1])
        // console.log(temp)
        setOhlcUpdate(temp)
        props.passto(temp)

    }

    // useContext ________________________________________________________________________________________
    // const { previousTimeframes, setPreviousTimeframes, previousTimeframesMinutes, setPreviousTimeframesMinutes, ohlc } = useContext(EquationContext);

    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button onClick={() => {
                        setIsOnClickTrue(true)
                    }} variant="outline"><div>{`[${ohlcUpdate[0]["value"]}]${ohlcUpdate[1]["label"]} `}<span className={"font-bold"}>{`${ohlcUpdate[2]["label"]}`}</span></div> </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div>
                        <TimeFrameOption
                            isOnClickTrue={isOnClickTrue}
                            setIsOnClickTrue={setIsOnClickTrue}

                            variablePass={ohlcUpdate}
                            passto={passtoOhlc}></TimeFrameOption>




                    </div>
                </PopoverContent>
            </Popover>



        </>
    );
}