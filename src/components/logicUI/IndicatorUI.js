"use client";

import React, { useEffect } from 'react'
import { useState } from 'react';
import Sma from '../indicators/Sma';
import Ohlc from '../indicators/Ohlc';
import LogicalOperators from '../indicators/LogicalOperators';

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

        else if (updateIndicator[0] && (updateIndicator[0]["value"] === "<" || updateIndicator[0]["value"] === ">")) {
            return <LogicalOperators arrayPass={updateIndicator} />;
        }
        else if (updateIndicator[2] && (updateIndicator[2]["value"] === "high"
            || updateIndicator[2]["value"] === "low"
            || updateIndicator[2]["value"] === "open"
            || updateIndicator[2]["value"] === "close"
        )) {
            return (
                <Ohlc arrayPass={updateIndicator} passto={passToIndicator} />
            );
        }
        else {
            return <div>Hello</div>;
        }
    }
    return (
        <>

            <div className='border-2 border-black m-2 flex flex-shrink-0 flex-grow-0 justify-center content-center rounded-md'
                onMouseEnter={() => handleMouseEnter()}
                onMouseLeave={() => handleMouseLeave()}>
                <button className={`border-2 border-black rounded-lg px-2 ${display}`} onClick={() => props.handleCopyIndicator(props.index)}>+</button>


                {renderComponent()}



                <button className={`border-2 border-black rounded-r-full px-2 ${display}`}
                    onClick={() => props.removeIndicator(props.index)}

                >x</button>
            </div>


        </>
    )
}

export default IndicatorUI