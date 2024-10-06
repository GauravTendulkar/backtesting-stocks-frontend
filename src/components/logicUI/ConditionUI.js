"use client";

import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import IndicatorUI from './IndicatorUI';
import { EquationContext } from '@/app/context/EquationContext';
import { ComboboxDemo } from '../ui/combobox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCopy, faPaste, faTimes } from '@fortawesome/free-solid-svg-icons';
import SearchDropdown from '../SearchDropdown';

function ConditionUI(props) {
    const [frameworks, setFrameworks] = useState([
        {
            value: JSON.stringify([{ "value": "0", "label": "current candle" },
            { "value": 1440, "label": "Daily" },
            { "value": "sma" },
            { "value": "close" },
            { "value": 9 }
            ]),
            label: "Simple Moving Average",
            "search": ["sma", "Simple Moving Average"]
        },
        {
            value: JSON.stringify([{ "value": "0", "label": "current candle" },
            { "value": 1440, "label": "Daily" },
            { "value": "high", "label": "HIGH" },
            ]),
            label: "HIGH",
            "search": ["high"]
        },
        {
            value: JSON.stringify([{ "value": "0", "label": "current candle" },
            { "value": 1440, "label": "Daily" },
            { "value": "low", "label": "LOW" },
            ]),
            label: "LOW",
            "search": ["low"]
        },
        {
            value: JSON.stringify([{ "value": "0", "label": "current candle" },
            { "value": 1440, "label": "Daily" },
            { "value": "open", "label": "OPEN" },
            ]),
            label: "OPEN",
            "search": ["open"]
        },
        {
            value: JSON.stringify([{ "value": "0", "label": "current candle" },
            { "value": 1440, "label": "Daily" },
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
    ]);

    const [updateCondition, setUpdateCondition] = useState(props.objectPass);
    const [selectedOption, setSelectedOption] = useState("");
    const [draggedItem, setDraggedItem] = useState(null);
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
        setDraggedItem(index)
        console.log("handleDragStart")
        console.log(index)
    };

    const handleDragOver = (event, index) => {
        event.preventDefault();

    };

    const handleDrop = (index) => {

        let temp = [...updateCondition]

        const b = temp.splice(draggedItem, 1)
        temp.splice(index, 0, b[0])
        setUpdateCondition(temp)
        props.passToEquation(temp, props.index, props.objName[0])
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
        setCopyIndicator(temp[index]);



    }

    const handlePasteIndicator = () => {
        let temp = [...updateCondition];

        temp = [...temp, copyIndicator]
        console.log(temp)
        setUpdateCondition(temp)
        props.passToEquation(temp, props.index, props.objName[0])

    }




    return (
        <>
            <div className='border-2 border-black  flex flex-col m-2 bg-yellow-200'>


                {/* <div className='flex  justify-end m-1'>
                    
                    <div className="mr-auto">
                        
                        <SearchDropdown arrayPass={frameworks} onChange={handleChange}></SearchDropdown>
                    </div>

                    <button className='mx-2' onClick={handlePasteIndicator}>Paste</button>
                    <button className='mx-2' onClick={() => { props.removeCondition(props.index) }} >X</button>
                </div> */}

                <div className='flex flex-wrap'>

                    {/* indicators structure */}
                    {updateCondition.map((e, id) => {
                        return (
                            <div key={id}
                                draggable
                                onDragStart={() => handleDragStart(id)}
                                onDragOver={(e) => handleDragOver(e, id)}
                                onDrop={() => handleDrop(id)}
                            // onMouseEnter={() => handleMouseEnter(id)} 
                            // onMouseLeave={() =>handleMouseLeave(id)}
                            // onMouseDown={handleMouseDown} 
                            // onMouseUp={handleMouseUp}
                            >

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

                    <SearchDropdown arrayPass={frameworks} onChange={handleChange}></SearchDropdown>
                    {/* <button className='' onClick={handlePasteIndicator}>

                    </button> */}
                    <div className="relative group my-2 mx-1">
                        <button onClick={handlePasteIndicator} placeholder={"Paste"} className="px-4 py-3  flex items-center justify-center rounded-lg border text-text-color bg-primary-color hover:bg-primary-color-1">
                            <FontAwesomeIcon icon={faPaste} className="text-center" /> 
                        </button>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Paste
                        </div>
                    </div>
                    {/* <button className='' onClick={() => { props.removeCondition(props.index) }} >X</button> */}

                    <div className="relative group my-2 mx-1">
                        <button onClick={() => { props.removeCondition(props.index) }} placeholder={"Cancel"} className="px-4 py-3 flex items-center justify-center rounded-lg border text-text-color bg-primary-color hover:bg-primary-color-1">
                            <FontAwesomeIcon icon={faTimes} className="text-center" />
                        </button>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Cancel
                        </div>
                    </div>
                </div>







            </div>


        </>
    )
}

export default ConditionUI