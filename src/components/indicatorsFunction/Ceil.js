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
import { indicatorData } from "@/json-data/defaultIndicatorData";
import { renderComponent } from "../logicUI2/IndicatorUI";
import SearchDropdown from "../dropdowns/SearchDropdown";
import { Plus } from "lucide-react";


export default function Ceil(props) {


    const [smaUpdate, setSmaUpdate] = useState(props.arrayPass);


    // useContext ________________________________________________________________________________________
    const { ohlc } = useContext(EquationContext);


    const [isOnClickTrue, setIsOnClickTrue] = useState(false)



    useEffect(() => {
        setSmaUpdate(props.arrayPass)
        // console.log(props.arrayPass[1]["value"]["indicator"])
        // console.log(props.arrayPass)
    }, [props.arrayPass])


    const [display, setDisplay] = useState("hidden")
    const handleMouseEnter = () => {
        setDisplay("")

    }
    const handleMouseLeave = () => {
        setDisplay("hidden")

    }


    const onChange = (data) => {
        // console.log("onChange", data)

        let temp = [...smaUpdate]
        temp[1]["value"]["indicator"] = JSON.parse(JSON.stringify(data))
        setSmaUpdate([...temp])
        props.passto([...temp])
    }

    const changeIndicator = (data) => {
        // console.log(data)

        let temp = [...smaUpdate]
        temp[1]["value"]["indicator"] = JSON.parse(JSON.stringify(data))
        setSmaUpdate([...temp])
        props.passto([...temp])
    }




    return (

        <>




            <div
                // onMouseEnter={() => handleMouseEnter()}
                // onMouseLeave={() => handleMouseLeave()}
                // className={"flex items-center"}
                className={"inline-flex items-center justify-center rounded-md border border-gray-300 bg-transparent px-2 py-0 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800 cursor-pointer"}

                variant="outline"><Popover>

                    <PopoverTrigger asChild>
                        <div
                            // onMouseEnter={() => handleMouseEnter()}
                            // onMouseLeave={() => handleMouseLeave()}
                            className={"inline-flex items-center justify-center rounded-md border border-gray-300 bg-transparent px-2 py-0 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800 cursor-pointer"}
                            variant="outline">{`${smaUpdate[0]["value"]}(`}</div>

                    </PopoverTrigger>
                    <PopoverContent className="">
                        <div className='flex flex-col gap-2'>
                            {/* <SearchDropdown className={`${display}`} size="icon" valueArray={indicatorData} onChange={changeIndicator}><Plus /></SearchDropdown> */}

                            <div className="flex items-center">
                                <Label>Change Indcator: </Label>
                                <SearchDropdown className={""} size="icon" valueArray={indicatorData} onChange={changeIndicator}><Plus /></SearchDropdown>
                            </div>


                        </div>
                    </PopoverContent>
                </Popover>
                {renderComponent(props.arrayPass[1]["value"]["indicator"], onChange)}<div className={""}>{")"}</div></div>



            {/* <Popover>
                <PopoverTrigger asChild>
                    <div
                        // onMouseEnter={() => handleMouseEnter()}
                        // onMouseLeave={() => handleMouseLeave()}
                        className={"inline-flex items-center justify-center rounded-md border border-gray-300 bg-transparent px-2 py-0 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800 cursor-pointer"}
                        variant="outline">{`${smaUpdate[0]["value"]}(`}</div>

                </PopoverTrigger>
                <PopoverContent className="">
                    <div className='flex flex-col gap-2'> */}
            {/* <SearchDropdown className={`${display}`} size="icon" valueArray={indicatorData} onChange={changeIndicator}><Plus /></SearchDropdown> */}

            {/* <div className="flex items-center">
                            <Label>Change Indcator: </Label>
                            <SearchDropdown className={""} size="icon" valueArray={indicatorData} onChange={changeIndicator}><Plus /></SearchDropdown>
                        </div>


                    </div>
                </PopoverContent>
            </Popover> */}

        </>
    );
}