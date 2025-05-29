"use client";

import React, { useEffect } from 'react'
import { useState } from 'react';
import Sma from '../indicators/Sma';
import Ohlc from '../indicators/Ohlc';
import LogicalOperators from '../indicators/LogicalOperators';
import { ClipboardCopy, X } from 'lucide-react';
import Macd from '../indicators/Macd';
import Number from '../indicators/Number';

function IndicatorUI(props) {
    const [updateIndicator, setUpdateIndicator] = useState(props.objectPass);

    useEffect(() => {

        setUpdateIndicator(props.objectPass)
    }, [props.objectPass]);

    const handleTimeFrame = (event) => {
        let temp = [...updateIndicator]
        temp[1] = event.target.value
        setUpdateIndicator(temp); // Update the state with the selected value

        props.passToCondition(temp, props.index, props.objName[0])



    };


    const passToIndicator = (arr) => {


        setUpdateIndicator(arr)
        props.passToCondition(arr, props.index, props.objName[0])

    }

    const [display, setDisplay] = useState("hidden")
    const handleMouseEnter = () => {
        setDisplay("")

    }
    const handleMouseLeave = () => {
        setDisplay("hidden")

    }


    const renderComponent = () => {



        if (updateIndicator[2] && updateIndicator[2]["value"] === "sma") {
            return (
                <Sma arrayPass={updateIndicator} passto={passToIndicator} />
            );
        }
        else if (updateIndicator[2] && (updateIndicator[2]["value"] === "macd_line" || updateIndicator[2]["value"] === "signal_line" || updateIndicator[2]["value"] === "macd_histogram")) {
            return (
                <Macd arrayPass={updateIndicator} passto={passToIndicator} />
            );
        }

        else if (updateIndicator[0] && (updateIndicator[0]["value"] === "<"
            || updateIndicator[0]["value"] === ">"
            || updateIndicator[0]["value"] === "<="
            || updateIndicator[0]["value"] === ">="
            || updateIndicator[0]["value"] === "=="
            || updateIndicator[0]["value"] === "!="
        )) {
            return <LogicalOperators arrayPass={updateIndicator} />;
        }
        else if (updateIndicator[2] && (updateIndicator[2]["value"] === "high"
            || updateIndicator[2]["value"] === "low"
            || updateIndicator[2]["value"] === "open"
            || updateIndicator[2]["value"] === "close"
        )) {
            return (
                <Ohlc arrayPass={updateIndicator} passto={passToIndicator} />
            )

        }
        else if (updateIndicator[0] && (updateIndicator[0]["value"] === "number")) {
            return (
                <Number arrayPass={updateIndicator} passto={passToIndicator}/>
            )

        }
        else {
            return <div>Hello</div>;
        } 
    }
    return (
        <>
 
            <div className='relative  flex flex-shrink-0 flex-grow-0 justify-center content-center rounded-md'
                onMouseEnter={() => handleMouseEnter()}
                onMouseLeave={() => handleMouseLeave()}>
                {/* <button className={`border-2 border-black rounded-lg px-2 ${display}`} onClick={() => props.handleCopyIndicator(props.index)}>+</button> */}

                <button className={`rounded-full  absolute -top-2.5 -left-2 ${display}`} variant="outline" onClick={() => props.handleCopyIndicator(props.index)}><ClipboardCopy /></button>


                <button className={`rounded-full  absolute -top-2.5 -right-0 ${display}`} variant="outline" onClick={() => props.removeIndicator(props.index)}> <X /></button>

                {renderComponent()}



                {/* <button className={`border-2 border-black rounded-r-full px-2 ${display}`}
                    onClick={() => props.removeIndicator(props.index)}

                >x</button> */}
            </div>


        </>
    )
}

export default IndicatorUI