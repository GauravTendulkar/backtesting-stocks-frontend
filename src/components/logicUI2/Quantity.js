import React, { memo, useEffect, useState } from 'react'
import ConditionUI from './ConditionUI';

const Quantity = memo(({ valueProp = {}, onChangeProp = () => { }, objectProp }) => {
    // console.log("Quantity")
    const [currentComponentState, setCurrentComponentState] = useState(valueProp)

    useEffect(() => {
        setCurrentComponentState(valueProp)
    }, [valueProp]);

    const onChange = (data, index) => {

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

export default Quantity