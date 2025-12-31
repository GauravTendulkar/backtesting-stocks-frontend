import React, { memo, useEffect, useState } from 'react'

import { Input } from '../ui/input'

const ExitLabel = memo(({ indexProp, valueProp = {}, onChangeProp = () => { }, objectProp }) => {
    // console.log("ExitLabel")

    const [currentComponentState, setCurrentComponentState] = useState(valueProp)

    useEffect(() => {
        setCurrentComponentState(valueProp)
    }, [valueProp])


    const onchange = (data) => {

        setCurrentComponentState(data)
        onChangeProp(data, indexProp, objectProp)
    }

    return (
        <>
            <Input value={currentComponentState} onChange={(e) => onchange(e.target.value)}></Input>

        </>
    )
})

export default ExitLabel