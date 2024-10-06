"use client";

import React from 'react'
import { useState, useEffect } from 'react'

import ConditionUI from './ConditionUI';

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
            <div className=' border-4 border-blue-700 bg-slate-200 m-2'>
                <div className='flex border-2 border-black justify-end'>
                    <span className='mr-auto'>
                        <button className={(updateAndOr == 'AND') ? 'px-2 border-2 border-black bg-black text-white' : 'px-2 border-2 border-black'} onClick={() => { toggleAndOr('AND') }}>AND</button>
                        <button className={(updateAndOr == 'OR') ? 'px-2 border-2 border-black bg-black text-white' : 'px-2 border-2 border-black'} onClick={() => { toggleAndOr('OR') }}>OR</button>

                    </span>

                    <button className='px-2 border-2 border-black' onClick={addCondition}>Condition</button>
                    <button className='px-2 border-2 border-black' onClick={addGroup}>Group</button>
                    <button className='px-2 border-2 border-black' onClick={()=>{if (props.level == 1){props.removeGroup(props.index)}}}>X</button>
                    {/* {console.log(props.objectPass)} */}
                </div>


                <div >
                    {updateEquation.map((e, id) => {

                        if (Object.keys(props.objectPass[id])[0] === "condition") {
                            return <ConditionUI key={id} index={id} passToEquation={passToEquation} objName={Object.keys(props.objectPass[id])} objectPass={e["condition"]} removeCondition={removeCondition} ></ConditionUI>
                        }
                        else if (Object.keys(props.objectPass[id])[0] === "AND") {
                            return <EquationUI key={id} index={id} level={1} passToEquation={passToEquation} objName={Object.keys(props.objectPass[id])} changeKeyOfEquation={changeKeyOfEquation} objectPass={e["AND"]} removeGroup={removeGroup}></EquationUI>
                        }
                        else if (Object.keys(props.objectPass[id])[0] === "OR") {
                            return <EquationUI key={id} index={id} level={1} passToEquation={passToEquation} objName={Object.keys(props.objectPass[id])} changeKeyOfEquation={changeKeyOfEquation} objectPass={e["OR"]} removeGroup={removeGroup}></EquationUI>
                        }



                    })}



                </div>


            </div>
        </>
    )
}

export default EquationUI;