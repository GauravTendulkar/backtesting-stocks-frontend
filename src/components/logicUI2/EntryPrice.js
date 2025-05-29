import React, { memo, useEffect, useState } from 'react'
import ConditionUI from './ConditionUI'

const EntryPrice = memo(({ valueProp = {}, onChangeProp = () => { }, objectProp }) => {
    // console.log("EntryPrice")
    const [currentComponentState, setCurrentComponentState] = useState(valueProp)

    useEffect(() => {
        if (JSON.stringify(valueProp) !== JSON.stringify(currentComponentState)) {
            setCurrentComponentState(valueProp)
        }
        // setCurrentComponentState(valueProp)
    }, [valueProp]);

    const onChange = (data, index) => {
        // console.log("EntryPrice", data, index)
        onChangeProp(data, objectProp)
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

export default EntryPrice