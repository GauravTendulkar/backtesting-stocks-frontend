"use client";

import React from 'react'
import { useState, useEffect } from 'react'

import ConditionUI from './ConditionUI';
import { Button } from '../ui/button';
import { Separator } from "@/components/ui/separator"
import { Card } from '../ui/card';
import { X } from 'lucide-react';

function EquationUI(props) {

    // const { createEquation } = useContext(EquationContext);

    const [updateEquation, setUpdateEquation] = useState(props.objectPass);

    const [updateAndOr, setUpdateAndOr] = useState(props.objName[0]);

    const passToEquation = (arr, id, objName) => {
        let temp = [...updateEquation]
        temp[id][objName] = arr
        setUpdateEquation([...temp])


        if (props.level == 0) {
            props.passToMain([...temp], props.index, props.objName[0])
        }
        else if (props.level == 1) {
            props.passToEquation(temp, props.index, props.objName[0])
        }

    }

    useEffect(() => {

        setUpdateEquation(props.objectPass)
    }, [props.objectPass]);

    useEffect(() => {

        setUpdateAndOr(props.objName[0])
    }, [props.objName]);


    const toggleAndOr = () => {
        if (updateAndOr == 'AND') {

            setUpdateAndOr('OR')
            if (props.level == 0) {
                props.changeKeyOfMain(updateEquation, props.index, updateAndOr)
            }
            else if (props.level == 1) {
                props.changeKeyOfEquation(updateEquation, props.index, updateAndOr)

            }

        }
        else if (updateAndOr == 'OR') {
            setUpdateAndOr('AND')
            if (props.level == 0) {
                props.changeKeyOfMain(updateEquation, props.index, updateAndOr)
            }
            else if (props.level == 1) {
                props.changeKeyOfEquation(updateEquation, props.index, updateAndOr)

            }
        }



    }


    const changeKeyOfEquation = (arr, id, objName) => {


        let temp = [...updateEquation]
        if (objName == 'AND') {
            delete temp[id][objName];
            temp[id]['OR'] = arr
        }
        else if (objName == 'OR') {
            delete temp[id][objName];
            temp[id]['AND'] = arr

        }


        setUpdateEquation([...temp])
        // props.passToMain([...temp], props.index, props.objName[0])
        if (props.level == 0) {
            props.passToMain([...temp], props.index, props.objName[0])
        }
        else if (props.level == 1) {
            props.passToEquation(temp, props.index, props.objName[0])
        }


    }


    const addCondition = () => {
        let temp = [...updateEquation];

        temp = [...temp, { 'condition': [] }]

        setUpdateEquation([...temp])


        if (props.level == 0) {
            props.passToMain([...temp], props.index, props.objName[0])
        }
        else if (props.level == 1) {
            props.passToEquation(temp, props.index, props.objName[0])
        }
    }

    const addGroup = () => {
        let temp = [...updateEquation];

        temp = [...temp, { 'AND': [{ 'condition': [] }] }]

        setUpdateEquation([...temp])


        if (props.level == 0) {

            props.passToMain([...temp], props.index, props.objName[0])

        }
        else if (props.level == 1) {

            props.passToEquation(temp, props.index, props.objName[0])

        }
    }


    const removeCondition = (index) => {
        let temp = [...updateEquation];

        // temp = [...temp, { 'condition': [] }]
        temp.splice(index, 1)

        setUpdateEquation([...temp])


        if (props.level == 0) {
            props.passToMain([...temp], props.index, props.objName[0])
        }
        else if (props.level == 1) {
            props.passToEquation(temp, props.index, props.objName[0])
        }

    }

    const removeGroup = (index) => {

        // console.log('hello')
        let temp = [...updateEquation];

        // temp = [...temp, { 'condition': [] }]
        temp.splice(index, 1)

        setUpdateEquation([...temp])
        // console.log('props.level')
        // console.log(props.level)

        if (props.level == 0) {
            // console.log('hello')
            props.passToMain([...temp], props.index, props.objName[0])
        }
        else if (props.level == 1) {
            props.passToEquation(temp, props.index, props.objName[0])
        }

    }


    return (
        <>
            {/* group structure */}
            <div className=' m-2'>
                <div className='flex  justify-end space-x-2'>
                    <span className='mr-auto'>

                        <Button variant={(updateAndOr == 'AND') ? '' : 'secondary'} onClick={() => { toggleAndOr('AND') }}>AND</Button>
                        <Button variant={(updateAndOr == 'OR') ? '' : 'secondary'} onClick={() => { toggleAndOr('OR') }}>OR</Button>

                    </span>

                    <Button variant='' onClick={addCondition}>Condition</Button>
                    <Button variant='secondary' onClick={addGroup}>Group</Button>
                    <Button variant='destructive' onClick={() => { if (props.level == 1) { props.removeGroup(props.index) } }}><X  /></Button>
                    {/* {console.log(props.objectPass)} */}
                </div>


                <div >
                    {updateEquation.map((e, id) => {

                        if (Object.keys(props.objectPass[id])[0] === "condition") {
                            return <div key={id}>
                                <Separator />
                                {/* {console.log("Object.keys(props.objectPass[id])")}
                                {console.log(updateEquation)}
                                {console.log(e)}
                                {console.log(props.objectPass[id])} */}

                                <ConditionUI  index={id} passToEquation={passToEquation} objName={Object.keys(props.objectPass[id])} objectPass={e["condition"]} removeCondition={removeCondition} ></ConditionUI>


                            </div>
                        }
                        else if (Object.keys(props.objectPass[id])[0] === "AND") {
                            return <Card key={id}>
                                <EquationUI  index={id} level={1} passToEquation={passToEquation} objName={Object.keys(props.objectPass[id])} changeKeyOfEquation={changeKeyOfEquation} objectPass={e["AND"]} removeGroup={removeGroup}></EquationUI>
                            </Card>
                        }
                        else if (Object.keys(props.objectPass[id])[0] === "OR") {
                            return <Card key={id}>
                                <EquationUI  index={id} level={1} passToEquation={passToEquation} objName={Object.keys(props.objectPass[id])} changeKeyOfEquation={changeKeyOfEquation} objectPass={e["OR"]} removeGroup={removeGroup}></EquationUI>
                            </Card>
                        }



                    })}



                </div>


            </div >
        </>
    )
}

export default EquationUI;