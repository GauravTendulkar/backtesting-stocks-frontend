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


    const valueDefine = () => {

        if (((previousTimeframes.findIndex((item) => item.value === ohlcUpdate[0]["value"])) == -1) && (ohlcUpdate[1]["value"] == 1440 || ohlcUpdate[1]["value"] == 10080 || ohlcUpdate[1]["value"] == 43200)) {


            if (ohlcUpdate[0]["value"].slice(0, 1) === "-") {
                console.log(ohlcUpdate[0])
                console.log(previousTimeframes.findIndex((item) => item.value === "-n"))
                previousTimeframes.splice(previousTimeframes.findIndex((item) => item.value === "-n"), 0, ohlcUpdate[0]);
                setPreviousTimeframes([...previousTimeframes])


            }
        } else if ((previousTimeframesMinutes.findIndex((item) => item.value === ohlcUpdate[0]["value"])) == -1) {


            if (ohlcUpdate[0]["value"].slice(0, 1) === "-") {

                previousTimeframesMinutes.splice(previousTimeframesMinutes.findIndex((item) => item.value === "-n"), 0, ohlcUpdate[0]);
                setPreviousTimeframesMinutes([...previousTimeframesMinutes])


            }
            else if (ohlcUpdate[0]["value"].slice(0, 2) === "=-") {

                previousTimeframesMinutes.splice(previousTimeframesMinutes.findIndex((item) => item.value === "=-n"), 0, ohlcUpdate[0]);
                setPreviousTimeframesMinutes([...previousTimeframesMinutes])


            }
            else if (ohlcUpdate[0]["value"].slice(0, 1) === "=") {

                previousTimeframesMinutes.splice(previousTimeframesMinutes.findIndex((item) => item.value === "=n"), 0, ohlcUpdate[0]);
                setPreviousTimeframesMinutes([...previousTimeframesMinutes])
            }
        }
    }

    const passtoOhlc = (v) => {

        let temp = [...ohlcUpdate]
        // console.log("passtoSma")
        temp.splice(0, 2, v[0], v[1])
        // console.log(temp)
        setOhlcUpdate(temp)
        props.passto(temp)

    }

    // useContext ________________________________________________________________________________________
    const { previousTimeframes, setPreviousTimeframes, previousTimeframesMinutes, setPreviousTimeframesMinutes, ohlc } = useContext(EquationContext);

    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button  onClick={valueDefine} variant="outline"><div>{`[${ohlcUpdate[0]["value"]}]${ohlcUpdate[1]["label"]} `}<span className={"font-bold"}>{`${ohlcUpdate[2]["label"]}`}</span></div> </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div>
                        <TimeFrameOption variablePass={ohlcUpdate.slice(0, 2)} passto={passtoOhlc}></TimeFrameOption>



                        
                    </div>
                </PopoverContent>
            </Popover>



        </>
    );
}