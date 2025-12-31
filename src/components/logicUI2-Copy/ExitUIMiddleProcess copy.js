import React, { memo, useEffect, useState } from 'react'
import EquationUI from './EquationUI'

const ExitUIMiddleProcess = memo(({ indexProp, valueProp = {}, onChangeProp = () => { }, objectProp }) => {
    // console.log("ExitUIMiddleProcess")
    const [currentComponentState, setCurrentComponentState] = useState(valueProp)


    useEffect(() => {
        // console.log("ExitUIMiddleProcess valueProp", valueProp)
        setCurrentComponentState(valueProp)
    }, [valueProp])

    // useEffect(() => {
    //     console.log("ExitUIMiddleProcess", currentComponentState)
    // }, [currentComponentState]);

    const onChange = (data) => {
        // console.log("ExitUIMiddleProcess data", data)
        setCurrentComponentState(data)
        onChangeProp(data, indexProp, objectProp)
    }
    const getObjectType = () => {
        const keys = Object.keys(currentComponentState);
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

    return (


        <EquationUI indexProp={undefined} valueProp={currentComponentState} objectProp={getObjectType()} onChangeProp={onChange} />


    )
})

export default ExitUIMiddleProcess