"use client";

import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import IndicatorUI from './IndicatorUI';
import { EquationContext } from '@/app/context/EquationContext';
import { ComboboxDemo } from '../ui/combobox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCopy, faPaste, faTimes } from '@fortawesome/free-solid-svg-icons';
import SearchDropdown from '../SearchDropdown';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from '../ui/button';
import { ClipboardPaste, Plus, X } from 'lucide-react';
import { cn } from "@/lib/utils";

function ConditionUI(props) {
    const [frameworks, setFrameworks] = useState([
        {
            value: JSON.stringify([{ "value": "0", "label": "current candle" },
            { "value": "Daily", "label": "Daily" },
            { "value": "sma" },
            { "value": "close" },
            { "value": 9 }
            ]),
            label: "Simple Moving Average",
            "search": ["sma", "Simple Moving Average"]
        },
        {
            value: JSON.stringify([{ "value": "0", "label": "current candle" },
            { "value": "Daily", "label": "Daily" },
            { "value": "macd_line" },
            { "value": 12 },
            { "value": 26 },
            { "value": 9 },
            { "value": "close" },

            ]),
            label: "Macd line",
            "search": ["MACD", "Moving Average Convergence Divergence, Macd line"]
        },
        {
            value: JSON.stringify([{ "value": "0", "label": "current candle" },
            { "value": "Daily", "label": "Daily" },
            { "value": "signal_line" },
            { "value": 12 },
            { "value": 26 },
            { "value": 9 },
            { "value": "close" },

            ]),
            label: "Macd Signal line",
            "search": ["MACD", "Moving Average Convergence Divergence", "Macd Signal line"]
        },
        {
            value: JSON.stringify([{ "value": "0", "label": "current candle" },
            { "value": "Daily", "label": "Daily" },
            { "value": "macd_histogram" },
            { "value": 12 },
            { "value": 26 },
            { "value": 9 },
            { "value": "close" },

            ]),
            label: "Macd histogram",
            "search": ["MACD", "Moving Average Convergence Divergence", "Macd histogram"]
        },
        {
            value: JSON.stringify([{ "value": "0", "label": "current candle" },
            { "value": "Daily", "label": "Daily" },
            { "value": "high", "label": "HIGH" },
            ]),
            label: "HIGH",
            "search": ["high"]
        },
        {
            value: JSON.stringify([{ "value": "0", "label": "current candle" },
            { "value": "Daily", "label": "Daily" },
            { "value": "low", "label": "LOW" },
            ]),
            label: "LOW",
            "search": ["low"]
        },
        {
            value: JSON.stringify([{ "value": "0", "label": "current candle" },
            { "value": "Daily", "label": "Daily" },
            { "value": "open", "label": "OPEN" },
            ]),
            label: "OPEN",
            "search": ["open"]
        },
        {
            value: JSON.stringify([{ "value": "0", "label": "current candle" },
            { "value": "Daily", "label": "Daily" },
            { "value": "close", "label": "CLOSE" },
            ]),
            label: "CLOSE",
            "search": ["close"]
        },
        {
            value: JSON.stringify([{ "value": "<", "label": "<" }]),
            label: "<",
            "search": ["<"]

        },
        {
            value: JSON.stringify([{ "value": ">", "label": ">" }]),
            label: ">",
            "search": [">"]
        },
        {
            value: JSON.stringify([{ "value": "<=", "label": "<=" }]),
            label: "<=",
            "search": ["<="]
        },
        {
            value: JSON.stringify([{ "value": ">=", "label": ">=" }]),
            label: ">=",
            "search": [">="]
        },
        {
            value: JSON.stringify([{ "value": "!=", "label": "!=" }]),
            label: "!=",
            "search": ["!="]
        },
        {
            value: JSON.stringify([{ "value": "==", "label": "==" }]),
            label: "==",
            "search": ["=="]
        },
        {
            value: JSON.stringify([{ "value": "number", "label": "Number" },
            { "value": 20, "label": 20 }]),
            label: "Number",
            "search": ["Number"]
        },

    ]);

    const [updateCondition, setUpdateCondition] = useState(props.objectPass);
    const [selectedOption, setSelectedOption] = useState("");
    const [draggedItem, setDraggedItem] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const { copyIndicator, setCopyIndicator } = useContext(EquationContext);

    const handleChange = (event) => {


        let temp = [...updateCondition]
        temp = [...temp, { "indicator": event }]
        setUpdateCondition(temp)
        props.passToEquation(temp, props.index, props.objName[0])


        setSelectedOption([]); // Update the state with the selected value

    };

    const passToCondition = (arr, id, objName) => {


        let temp = [...updateCondition];

        temp[id][objName] = [...arr]
        setUpdateCondition(temp)
        props.passToEquation(temp, props.index, props.objName[0])


    }

    useEffect(() => {

        setUpdateCondition(props.objectPass)
    }, [props.objectPass]);


    const handleDragStart = (index) => {
        setDraggedItem(index);
        setIsDragging(true);
        // console.log("handleDragStart")
        // console.log(index)
    };



    const handleDragOver = (event, index) => {
        event.preventDefault();

        if (draggedItem === null || draggedItem === index) {
            return;
        }

        // Get the target element's bounding rectangle
        const targetRect = event.currentTarget.getBoundingClientRect();
        // Get the mouse position relative to the target element's center
        const mouseX = event.clientX;
        const targetCenter = targetRect.left + (targetRect.width / 2);

        let temp = [...updateCondition];
        const draggedOverItem = temp[draggedItem];

        // Only reorder if mouse is on the appropriate side of the target element
        if ((mouseX < targetCenter && index < draggedItem) ||
            (mouseX >= targetCenter && index > draggedItem)) {
            temp.splice(draggedItem, 1);
            temp.splice(index, 0, draggedOverItem);
            setUpdateCondition(temp);
            setDraggedItem(index);
            props.passToEquation(temp, props.index, props.objName[0]);
        }
    };

    const handleDrop = (index) => {
        let temp = [...updateCondition];
        const b = temp.splice(draggedItem, 1);
        temp.splice(index, 0, b[0]);
        setUpdateCondition(temp);
        props.passToEquation(temp, props.index, props.objName[0]);
        setIsDragging(false);  // Reset dragging state
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    const removeIndicator = (index) => {


        let temp = [...updateCondition];

        temp.splice(index, 1)
        setUpdateCondition(temp)
        props.passToEquation(temp, props.index, props.objName[0])


    }

    const handleCopyIndicator = (index) => {
        let temp = [...updateCondition];
        console.log(temp[index])
        setCopyIndicator(JSON.parse(JSON.stringify(temp[index])));



    }

    const handlePasteIndicator = () => {
        let temp = [...updateCondition];
        // let copyTemp = [...copyIndicator]
        if (copyIndicator !== null) {
            temp = [...temp, copyIndicator]
            console.log(temp)
            setUpdateCondition(temp)
            props.passToEquation(temp, props.index, props.objName[0])

        }

    }


    return (
        <>
            <div className='  flex flex-col '>




                <div className='flex flex-wrap p-1 mt-1 border-l-4 border-primary'>

                    {/* indicators structure */}
                    {updateCondition.map((e, id) => {
                        return (
                            <div key={id}
                                draggable
                                onDragStart={() => handleDragStart(id)}
                                onDragOver={(e) => handleDragOver(e, id)}
                                onDrop={() => handleDrop(id)}
                                onDragEnd={handleDragEnd}
                                className={cn(
                                    "relative cursor-move transition-all duration-200 ease-in-out",
                                    draggedItem === id && isDragging && "opacity-50 border-2 border-dashed border-primary",
                                    "hover:shadow-sm"
                                )}

                            >
                                {/* {console.log("from conditionUI")}
                                {console.log(props.objectPass[id])}
                                {console.log(e["indicator"])} */}

                                <IndicatorUI

                                    index={id}
                                    objectPass={e["indicator"]}
                                    passToCondition={passToCondition}
                                    objName={Object.keys(props.objectPass[id])}
                                    removeIndicator={removeIndicator}
                                    handleCopyIndicator={handleCopyIndicator}></IndicatorUI>
                            </div>
                        );
                    })}

                    <SearchDropdown size="icon" arrayPass={frameworks} onChange={handleChange} textForTooltip={"Add"}>

                        <Plus />
                    </SearchDropdown>





                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="secondary" size="icon" onClick={handlePasteIndicator}><ClipboardPaste /></Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Paste</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="destructive" size="icon" onClick={() => { props.removeCondition(props.index) }}><X /></Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Cancel</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>


                </div>


            </div>


        </>
    )
}

export default ConditionUI