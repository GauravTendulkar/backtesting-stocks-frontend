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



export default function Camarilla(props) {


    const [smaUpdate, setSmaUpdate] = useState(props.arrayPass);

    // useContext ________________________________________________________________________________________
    const {  ohlc } = useContext(EquationContext);

    
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

    

    

   


    return (

        <>
            

                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            onClick={() => {
                                
                                setIsOnClickTrue(true)
                            }}
                            variant="outline">{`[${smaUpdate[0]["value"]}]${smaUpdate[1]["label"]} Camarilla ${smaUpdate[2]["value"]}`}</Button>
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


                            


                            
                            </div>
                    </PopoverContent>
                </Popover>

            

        </>
    );
}