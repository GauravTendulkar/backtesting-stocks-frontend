import React, { memo, useEffect, useState } from 'react'
import ConditionUI from './ConditionUI';

const ExitPrice = memo(({ indexProp, valueProp = {}, onChangeProp = () => { }, objectProp }) => {
    const [currentComponentState, setCurrentComponentState] = useState(valueProp)
    // console.log("ExitPrice")
    useEffect(() => {
        setCurrentComponentState(valueProp)
        // console.log("ExitPrice", valueProp)
    }, [valueProp]);

    const onChange = (data) => {
        // console.log("ExitPrice data", data)
        setCurrentComponentState(data)
        onChangeProp(data, indexProp, objectProp)
    }
    return (
        <>
            <ConditionUI
                indexProp={undefined}
                valueProp={currentComponentState}
                objectProp={Object.keys(currentComponentState)[0]}
                onChangeProp={onChange}
                disableSwitchProp={objectProp}></ConditionUI>
        </>
    )
})

export default ExitPrice