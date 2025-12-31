import React, { memo, useCallback, useContext, useEffect, useState } from 'react'
import IndicatorUI from './IndicatorUI';
import { Button } from '../ui/button';
import { ClipboardPaste, Plus, X } from 'lucide-react';
import SearchDropdown from '../dropdowns/SearchDropdown';
import { indicatorData } from '@/json-data/defaultIndicatorData';
import { indicator } from '@/json-data/loading-create';
import { Switch } from '../ui/switch';

import useDragAndDrop from '@/hooks/useDragAndDrop';
import { CopyIndicatorContext } from '@/app/context/CopyIndicatorContext';
import dynamic from 'next/dynamic';

const Plus1 = React.memo(Plus)
const ClipboardPaste1 = React.memo(ClipboardPaste)
const X1 = React.memo(X)
const Button1 = React.memo(Button)


// const IndicatorUI = dynamic(() => import('./IndicatorUI'));

const ConditionUI = memo(({ indexProp, objectProp, valueProp, onChangeProp = () => { }, removeConditionProp = () => { }, disableSwitchProp = "" }) => {
    // console.log("ConditionUI")
    // console.log("ConditionUI")
    const [currentComponentState, setCurrentComponentState] = useState(valueProp);
    const [isSwitch, setIsSwitch] = useState(() => {
        if (valueProp.switch == undefined) {
            return true
        }
        return valueProp.switch
    });
    const [errorForBrackets, setErrorForBrackets] = useState(null);



    useEffect(() => {

        setIsSwitch(() => {
            if (valueProp.switch == undefined) {
                return true
            }
            return valueProp.switch
        })
    }, [valueProp.switch])


    useEffect(() => {
        // console.log("ConditionUI", valueProp)
        checkBracketsIsClosed(valueProp[objectProp])
        // setCurrentComponentState(valueProp)

        if (JSON.stringify(valueProp) !== JSON.stringify(currentComponentState)) {
            setCurrentComponentState(valueProp)
        }
    }, [valueProp]);

    const findUnclosedBracketsIndices = useCallback((arr) => {
        const stack = [];
        const indices = [];

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === "(") {
                stack.push(arr[i]);
                indices.push(i); // Track the index of the opening bracket
            } else if (arr[i] === ")") {
                if (stack.length > 0 && stack[stack.length - 1] === "(") {
                    stack.pop(); // Pop the last opening bracket
                    indices.pop(); // Remove its index
                } else {
                    indices.push(i); // Unmatched closing bracket
                }
            }
        }

        // Remaining indices in the stack are unclosed opening brackets
        return indices;
    }, [])

    const checkBracketsIsClosed = useCallback((data) => {
        let temp = []
        // console.log("checkBracketsIsClosed", data)
        for (let i = 0; i < data.length; i++) {
            // console.log("checkBracketsIsClosed", data[i]["indicator"][0]["value"])
            if (data[i]["indicator"][0]["value"] === "(" || data[i]["indicator"][0]["value"] === ")") {
                temp.push(data[i]["indicator"][0]["value"])
            }
            else {
                temp.push("x")
            }
        }
        // console.log("checkBracketsIsClosed", temp)

        const tempIndex = findUnclosedBracketsIndices(temp)
        // console.log("tempIndex", tempIndex)
        if (tempIndex.length == 0) {
            setErrorForBrackets(null)
        }
        else {

            if (tempIndex.length == 1) {
                setErrorForBrackets(`Bracket no. ${tempIndex[0] + 1} is not closed properly`);
            }
            else {
                let tempStr = ""
                for (let i = 0; i < tempIndex.length - 1; i++) {
                    tempStr += ` ${tempIndex[i] + 1}`
                    if (i !== tempIndex.length - 2) {
                        tempStr += ","
                    }

                }
                tempStr += ` and ${tempIndex[tempIndex.length - 1] + 1}`
                setErrorForBrackets(`Brackets no.${tempStr} are not closed properly.`);
            }


        }


    }, [])

    // ________________________________________________________________________________________________________

    const addIndicator = useCallback((data) => {
        console.log("addIndicator ***********************************")
        let temp = { ...currentComponentState }
        let tempIndicator = { ...indicator }

        tempIndicator["indicator"] = JSON.parse(JSON.stringify(data))
        let tempArr = []
        tempArr = [...temp[objectProp], tempIndicator]

        temp[objectProp] = tempArr

        setCurrentComponentState({ ...temp })
        // console.log("temp", temp)
        onChangeProp({ ...temp }, indexProp)

    }, [onChangeProp, currentComponentState, indicator])

    const removeIndicator = (index) => {
        let temp = { ...currentComponentState }
        let tempArr = temp[objectProp]
        tempArr.splice(index, 1)
        temp[objectProp] = [...tempArr]
        setCurrentComponentState({ ...temp })
        onChangeProp({ ...temp }, indexProp)



    }

    const onChange = useCallback((data, index) => {

        let temp = { ...currentComponentState }
        temp[objectProp][index] = data
        setCurrentComponentState({ ...temp })
        onChangeProp({ ...temp }, indexProp)
    }, [indexProp, onChangeProp])

    // useEffect(() => {


    //     const handler = setTimeout(() => {
    //         onChangeProp({ ...currentComponentState }, indexProp)
    //     }, 500);

    //     return () => clearTimeout(handler);

    // }, [currentComponentState])


    const onChangeData = useCallback((data) => {
        let temp = { ...currentComponentState }
        temp[objectProp] = data

        setCurrentComponentState({ ...temp })

        // onChangeProp({ ...temp }, indexProp)
    }, [onChangeProp])

    const {
        isDragging,
        dragID,
        handleOnDragStart,
        handleDragOver,
        handleOnDrop,
        handleOnDragEnd } = useDragAndDrop(currentComponentState[objectProp], onChangeData)

    const toggleSwitch = (data) => {

        let temp = { ...currentComponentState }
        // console.log("temp", temp)
        temp["switch"] = data
        setIsSwitch(data)
        setCurrentComponentState({ ...temp })

        onChangeProp({ ...temp }, indexProp)
        // setCurrentComponentState(temp)
        // onChangeProp(temp, indexProp)
    }

    // const toggleSwitch = (value) => {
    //     const newState = { ...currentComponentState, switch: value };
    //     setIsSwitch(value);
    //     setCurrentState(newState);
    //     onChangeProp(newState, indexProp);
    // };

    const { copyIndicator, getCopyIndicator } = useContext(CopyIndicatorContext);

    const handlePaste = () => {

        const tempCopy = JSON.parse(getCopyIndicator())
        if (tempCopy != null) {

            let temp = { ...currentComponentState }
            let tempArr = []
            tempArr = [...temp[objectProp], tempCopy]
            temp[objectProp] = tempArr
            setCurrentComponentState({ ...temp })
            onChangeProp({ ...temp }, indexProp)

            console.log("getCopyIndicator()", JSON.parse(getCopyIndicator()))
        }
    }


    return (
        <>
            <div className={` flex flex-wrap  border-l-4 border-primary mx-2 pl-1 items-center ${isSwitch ? "opacity-100" : "opacity-35"}`}>

                {currentComponentState[objectProp] && currentComponentState[objectProp].map((e, id) => {
                    return (


                        <div
                            draggable
                            onDragStart={() => { handleOnDragStart(id) }}
                            onDragOver={(event) => handleDragOver(event, id)}
                            onDrop={() => { handleOnDrop() }}
                            onDragEnd={() => { handleOnDragEnd() }}
                            className={`  flex transition-all duration-300 
                            ${(dragID === id && isDragging) ? "opacity-50 scale-95" : "hover:scale-105"}`}
                            key={id}>


                            <IndicatorUI
                                indexProp={id}
                                valueProp={e}
                                objectProp={Object.keys(e)[0]}
                                onChangeProp={onChange}
                                removeIndicatorProp={removeIndicator} />

                        </div>



                    )
                })}

                <SearchDropdown size="icon" valueArray={indicatorData} onChange={addIndicator}><Plus1 /></SearchDropdown>
                <Button1 variant="secondary" size="icon" onClick={() => { handlePaste() }}><ClipboardPaste1 /></Button1>
                <Button1 className={`${(indexProp == undefined) ? "hidden" : ""}`} onClick={() => { removeConditionProp(indexProp) }} variant="destructive" size="icon"><X1 /></Button1>
                <Switch
                    className={`${(disableSwitchProp == "entryPrice") ? "hidden" : ""} ${(disableSwitchProp == "quantity") ? "hidden" : ""} ${(disableSwitchProp == "exitPrice") ? "hidden" : ""}`}
                    checked={isSwitch}
                    onCheckedChange={toggleSwitch}
                    disabled={false}
                    aria-readonly />

                {errorForBrackets && <div className='p-1 text-red-500'>{errorForBrackets}</div>}
            </div >

        </>
    )
})

export default ConditionUI