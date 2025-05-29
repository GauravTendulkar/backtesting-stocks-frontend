import React, { memo, useEffect, useState } from 'react'
import ConditionUI from './ConditionUI';
import { condition, group } from '@/json-data/loading-create';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Switch } from '../ui/switch';
import { useCallback } from 'react';

const EquationUI = memo(({ indexProp, valueProp, onChangeProp = () => { }, objectProp, removeGroupProp = () => { }, disableSwitchProp = "" }) => {
    // console.log("EquationUI")
    const [currentComponentState, setCurrentComponentState] = useState(valueProp);
    const [isAND, setIsAND] = useState(() => {
        if (objectProp === "AND") {
            return true;
        }
        else if (objectProp === "OR") {
            return false;
        }
    });

    const [isSwitch, setIsSwitch] = useState(() => {
        if (valueProp.switch == undefined) {
            return true
        }
        return valueProp.switch
    });

    useEffect(() => {

        setIsSwitch(() => {
            if (valueProp.switch == undefined) {
                return true
            }
            return valueProp.switch
        })
    }, [valueProp.switch])

    useEffect(() => {
        // console.log("EquationUI valueProp", valueProp, objectProp)
        // setCurrentComponentState(valueProp)

        if (JSON.stringify(valueProp) !== JSON.stringify(currentComponentState)) {
            setCurrentComponentState(valueProp)
        }

    }, [valueProp]);

    useEffect(() => {
        toggleANDOR();
    }, [objectProp]);

    const toggleSwitch = (data) => {

        let temp = { ...currentComponentState }
        // console.log("temp", temp)
        temp["switch"] = data
        setIsSwitch(data)
        onChangeProp({ ...temp }, indexProp)
    }

    const deepCopy = (data) => {
        return data
    }
    // ________________________________________________________________________________________________________
    const addGroup = () => {
        // console.log("addGroup", indexProp)
        if (indexProp == undefined) {
            let temp = { ...currentComponentState }

            // const tempGroup = { ...group }
            // const tempGroup = { "AND": [{ "condition": [], "switch": true }], "switch": true }
            const tempGroup = JSON.parse(JSON.stringify(group));
            temp[objectProp].push(tempGroup)


            setCurrentComponentState({ ...temp })

            onChangeProp({ ...temp })
        }
        else {
            let temp = { ...currentComponentState }

            const tempGroup = JSON.parse(JSON.stringify(group));
            // const tempGroup = { "AND": [{ "condition": [], "switch": true }], "switch": true }
            temp[objectProp].push(tempGroup)
            // console.log("temp", temp, indexProp)
            // console.log("group", tempGroup, indexProp)
            setCurrentComponentState({ ...temp })
            onChangeProp({ ...temp }, indexProp)

        }
    }
    // ________________________________________________________________________________________________________

    const onChange = (data, index) => {
        // console.log("EquatioUI", "indexProp", indexProp, "index", index, data)
        // console.log("EquatioUI", "onChange", "indexProp", indexProp, "index", index)
        // console.log("currentComponentState", "indexProp", indexProp, currentComponentState,)

        if (indexProp == undefined) {
            // let temp = [...currentComponentState[objectProp]]
            // temp[index] = data
            // let tempObj = {}
            // tempObj[objectProp] = [...temp]

            let temp = { ...currentComponentState }
            temp[objectProp][index] = { ...data }
            onChangeProp({ ...temp })        //correct
        }
        else {
            let temp = { ...currentComponentState }

            temp[objectProp][index] = { ...data }
            onChangeProp({ ...temp }, indexProp)
        }



    }

    const toggleANDOR = () => {

        // console.log("toggleANDOR", objectProp)
        if (objectProp == "AND" && objectProp) {

            setIsAND(true)
        }
        else if (objectProp == "OR" && objectProp) {

            setIsAND(false)
        }
    }

    const onChangeANDOR = () => {

        if (indexProp == undefined) {
            console.log("objectProp undefined", objectProp)
            if (objectProp == "AND") {
                // let temp = [...currentComponentState[objectProp]]
                // let tempObj = {}
                // tempObj["OR"] = temp
                // delete tempObj[objectProp]
                // onChangeProp({ ...tempObj })

                let temp = { ...currentComponentState }
                temp["OR"] = [...temp[objectProp]]
                delete temp[objectProp]
                console.log(temp)
                setCurrentComponentState({ ...temp })
                onChangeProp({ ...temp })

            }
            else if (objectProp == "OR") {
                let temp = { ...currentComponentState }
                temp["AND"] = [...temp[objectProp]]
                delete temp[objectProp]
                console.log(temp)
                setCurrentComponentState({ ...temp })
                onChangeProp({ ...temp })
            }
        }
        else {
            console.log("onChangeANDOR", objectProp)

            if (objectProp == "AND") {

                let temp = { ...currentComponentState }
                temp["OR"] = [...temp[objectProp]]
                delete temp[objectProp]

                setCurrentComponentState({ ...temp })
                onChangeProp({ ...temp }, indexProp)

            }
            else if (objectProp == "OR") {
                let temp = { ...currentComponentState }
                temp["AND"] = [...temp[objectProp]]
                delete temp[objectProp]

                setCurrentComponentState({ ...temp })
                onChangeProp({ ...temp }, indexProp)

            }
        }

    }

    const getObjectType = (e) => {
        const keys = Object.keys(e);
        // console.log("keys", keys)
        if (keys.includes("AND")) {
            return "AND"
        }
        else if (keys.includes("OR")) {
            return "OR"
        }
        else if (keys.includes("condition")) {
            return "condition"
        }
        else {
            return null;
        }
    }



    const renderComponents = (e, id) => {



        if (getObjectType(e) == "condition") {
            return (
                <div className=''>
                    <ConditionUI

                        indexProp={id}
                        valueProp={e}
                        objectProp={getObjectType(e)}
                        onChangeProp={onChange}
                        removeConditionProp={removeCondition}></ConditionUI>
                </div>
            )
        }
        else if (getObjectType(e) == "AND" || getObjectType(e) == "OR") {
            return (
                <div className=''>
                    <EquationUI
                        indexProp={id}
                        valueProp={e}
                        onChangeProp={onChange}
                        objectProp={getObjectType(e)}
                        removeGroupProp={removeGroup}></EquationUI>
                </div>)
        }

    }

    // ________________________________________________________________________________________________________

    const addCondition = () => {


        if (indexProp == undefined) {
            let temp = { ...currentComponentState }
            let tempArr = []
            const tempCondition = JSON.parse(JSON.stringify(condition));
            tempArr = [...temp[objectProp], tempCondition]

            temp[objectProp] = [...tempArr]

            setCurrentComponentState({ ...temp })

            onChangeProp({ ...temp })

        }
        else {
            let temp = { ...currentComponentState }
            let tempArr = []
            const tempCondition = JSON.parse(JSON.stringify(condition));
            tempArr = [...temp[objectProp], tempCondition]

            temp[objectProp] = [...tempArr]
            setCurrentComponentState({ ...temp })
            onChangeProp({ ...temp }, indexProp)

        }
    }




    const removeGroup = (index) => {

        if (index !== undefined) {
            let temp = { ...currentComponentState }
            temp[objectProp].splice(index, 1)
            setCurrentComponentState({ ...temp })
            onChangeProp({ ...temp }, indexProp)

        }
    }


    const removeCondition = useCallback((index) => {

        let temp = { ...currentComponentState }
        temp[objectProp].splice(index, 1)

        setCurrentComponentState({ ...temp })
        onChangeProp({ ...temp }, indexProp)

    }, [objectProp, onChangeProp, indexProp])





    return (
        <>
            <div className={`${isSwitch ? "opacity-100" : "opacity-35"}`}>
                <div className='flex space-x-2 justify-end items-center'>
                    <div className='mr-auto'>
                        <Button variant={`${(isAND) ? "" : "secondary"}`} onClick={() => { onChangeANDOR() }}>AND</Button>
                        <Button variant={`${(isAND) ? "secondary" : ""}`} onClick={() => { onChangeANDOR() }}>OR</Button>
                    </div>

                    <Button onClick={() => { addCondition() }}>Condition</Button>
                    <Button onClick={addGroup} variant="secondary">Group</Button>
                    <Button className={`${(indexProp == undefined) ? "hidden" : ""}`} onClick={() => removeGroupProp(indexProp)} variant="destructive" size="icon"><X /></Button>
                    <Switch
                        className={`${(indexProp == undefined) ? "hidden" : ""} ${(disableSwitchProp == "entryPrice") ? "hidden" : ""} ${(disableSwitchProp == "quantity") ? "hidden" : ""} ${(disableSwitchProp == "exitPrice") ? "hidden" : ""}`}
                        checked={isSwitch}
                        onCheckedChange={toggleSwitch}
                        disabled={false}
                        aria-readonly />
                </div>
                <Separator />
                {/* For AND */}
                {currentComponentState[objectProp] && currentComponentState[objectProp].map((e, id) => {
                    return (


                        <div className=' p-1  ' key={id}>
                            {renderComponents(e, id)}

                        </div>

                    )
                })
                }


            </div>
        </>
    )
})

export default EquationUI