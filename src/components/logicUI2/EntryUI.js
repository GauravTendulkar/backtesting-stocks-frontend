import React, { memo, useEffect, useState } from 'react'
import EquationUI from './EquationUI'
import { Card } from '../ui/card';

const EntryUI = memo(({ valueProp = {}, onChangeProp = () => { }, objectProp }) => {
// console.log("EntryUI")
    // const [currentComponentState, setCurrentComponentState] = useState({
    //     "AND": [{
    //         "condition": [{ "indicator": [{ "value": 0, "label": 0 }] },
    //         { "indicator": [{ "value": 0, "label": 0 }] }]
    //     },
    //     {
    //         "condition": [{ "indicator": [{ "value": 0, "label": 0 }] },
    //         { "indicator": [{ "value": 0, "label": 0 }] }]
    //     },
    //     {
    //         "AND": [{
    //             "condition": [{ "indicator": [{ "value": 0, "label": 0 }] },
    //             { "indicator": [{ "value": 0, "label": 0 }] }]
    //         }]
    //     },
    //     {
    //         "OR": [{
    //             "condition": [{ "indicator": [{ "value": 0, "label": 0 }] },
    //             { "indicator": [{ "value": 0, "label": 0 }] }]
    //         }]
    //     }]
    // });

    const [currentComponentState, setCurrentComponentState] = useState(valueProp)


    useEffect(() => {
        setCurrentComponentState(valueProp)
    }, [valueProp])

    useEffect(() => {
        // console.log("EntryUI", currentComponentState)
    }, [currentComponentState]);

    const onChange = (data) => {

        setCurrentComponentState({ ...data })
        onChangeProp({ ...data }, objectProp)
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
        <>

            <EquationUI
                indexProp={undefined}
                valueProp={currentComponentState}
                objectProp={getObjectType()}
                onChangeProp={onChange} />
        </>

    )
})

export default EntryUI