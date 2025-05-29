import React, { useEffect, useState } from 'react'
import ConditionUI from './ConditionUI'


function EntryPrice(props) {
    const [updateEntryPrice, setUpdateEntryPrice] = useState(props.exitPrice)
    // useEffect(() => {
    //     console.log("exitPrice")
    //     console.log(props.exitPrice)
    //     setUpdateEntryPrice(props.exitPrice)
    // }, [props.exitPrice])    

    const passToEquation = (arr, id, objName) => {
        let temp = [...updateEntryPrice]
        temp[id][objName] = arr
        setUpdateEntryPrice([...temp])


        // if (props.level == 0) {
        //     props.passToMain([...temp], props.index, props.objName[0])
        // }
        // else if (props.level == 1) {
        //     props.passToEquation(temp, props.index, props.objName[0])
        // }

    }

    const removeCondition = (index) => {
        console.log("removeCondition")
        console.log(index)
        // let temp = [...updateEntryPrice];

        
        // temp.splice(index, 1)

        // setUpdateEntryPrice([...temp])


        // if (props.level == 0) {
        //     props.passToMain([...temp], props.index, props.objName[0])
        // }
        // else if (props.level == 1) {
        //     props.passToEquation(temp, props.index, props.objName[0])
        // }

    }
    return (
        <>
            <ConditionUI index={0} objectPass={updateEntryPrice[0]["condition"]} objName={Object.keys(updateEntryPrice[0])} passToEquation={passToEquation} removeCondition={removeCondition} ></ConditionUI>
        


        </>
    )
}

export default EntryPrice