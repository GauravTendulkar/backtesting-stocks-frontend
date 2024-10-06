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
import { Input } from "../ui/input";


export default function Sma(props) {


    const [smaUpdate, setSmaUpdate] = useState(props.arrayPass);

    // useContext ________________________________________________________________________________________
    const { previousTimeframes, setPreviousTimeframes, previousTimeframesMinutes, setPreviousTimeframesMinutes, ohlc } = useContext(EquationContext);

    const [error, setError] = useState('');

    const valueDefine = () => {

        if (((previousTimeframes.findIndex((item) => item.value === smaUpdate[0]["value"])) == -1) && (smaUpdate[1]["value"] == 1440 || smaUpdate[1]["value"] == 10080 || smaUpdate[1]["value"] == 43200)) {


            if (smaUpdate[0]["value"].slice(0, 1) === "-") {
                console.log(smaUpdate[0])
                console.log(previousTimeframes.findIndex((item) => item.value === "-n"))
                previousTimeframes.splice(previousTimeframes.findIndex((item) => item.value === "-n"), 0, smaUpdate[0]);
                setPreviousTimeframes([...previousTimeframes])


            }
        } else if ((previousTimeframesMinutes.findIndex((item) => item.value === smaUpdate[0]["value"])) == -1) {


            if (smaUpdate[0]["value"].slice(0, 1) === "-") {

                previousTimeframesMinutes.splice(previousTimeframesMinutes.findIndex((item) => item.value === "-n"), 0, smaUpdate[0]);
                setPreviousTimeframesMinutes([...previousTimeframesMinutes])


            }
            else if (smaUpdate[0]["value"].slice(0, 2) === "=-") {

                previousTimeframesMinutes.splice(previousTimeframesMinutes.findIndex((item) => item.value === "=-n"), 0, smaUpdate[0]);
                setPreviousTimeframesMinutes([...previousTimeframesMinutes])


            }
            else if (smaUpdate[0]["value"].slice(0, 1) === "=") {

                previousTimeframesMinutes.splice(previousTimeframesMinutes.findIndex((item) => item.value === "=n"), 0, smaUpdate[0]);
                setPreviousTimeframesMinutes([...previousTimeframesMinutes])
            }
        }
    }


    useEffect(() => {
        setSmaUpdate(props.arrayPass)
    }, [props.arrayPass])




    const passtoSma = (v) => {

        let temp = [...smaUpdate]
        
        temp.splice(0, 2, v[0], v[1])
        
        setSmaUpdate(temp)
        props.passto(temp)

    }

    const handleValueChangeFor3 = (v) => {
        let temp = [...smaUpdate]
        temp[3] = ohlc[ohlc.findIndex((item) => item.value === v)]
        setSmaUpdate(temp)
        props.passto(temp)
    }

    const handleValueChangeFor4 = (v) => {

        if (checkIfNumber(parseInt(v.slice(-1)))) {
            
            if (v.slice(0,1) == "0"){
                
                v = v.slice(1, v.length)
                
            }
            let temp = [...smaUpdate];
            temp[4]["value"] = v
            setSmaUpdate(temp);
            props.passto(temp);
            setError("");
        }
        else if(v === ""){
            let temp = [...smaUpdate];
            temp[4]["value"] = 0
            setSmaUpdate(temp);
            props.passto(temp);
            setError("Input cannot be empty");
        }
        else {
            let temp = [...smaUpdate];
            temp[4]["value"] = v.slice(0, v.length - 1)
            setSmaUpdate(temp);
            props.passto(temp);
            setError("Only integers are allowed");
        }


    };

    const checkIfNumber = (number) => {
        if (0 <= number && number <= 9) {
            return true
        }
        else {
            return false
        }
    }



    return (

        <>
            <div >

                <Popover>
                    <PopoverTrigger asChild>
                        <Button onClick={valueDefine} variant="outline">{`[${smaUpdate[0]["value"]}]${smaUpdate[1]["label"]} ${smaUpdate[2]["value"]}(${smaUpdate[3]["value"]}, ${smaUpdate[4]["value"]})`}</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div>
                            <TimeFrameOption variablePass={smaUpdate.slice(0, 2)} passto={passtoSma}></TimeFrameOption>



                            <select value={smaUpdate[3]["value"]} onChange={(e) => handleValueChangeFor3(e.target.value)} className='border-2 border-black mr-auto  overflow-y-scroll'>

                                {ohlc.map((e, id) => {
                                    return (
                                        <option key={id} value={e.value}>{e.value}</option>
                                    );
                                })}


                            </select>
                            <Input type='text' value={smaUpdate[4]["value"]} onChange={(e) => handleValueChangeFor4(e.target.value)}></Input>
                            {error && <span className="text-red-500">{error}</span>}
                        </div>
                    </PopoverContent>
                </Popover>

            </div>

        </>
    );
}