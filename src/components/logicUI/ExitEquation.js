import React, { useEffect } from 'react'
import EntryUI from './EntryUI'
import { useState } from 'react'
import EntryPrice from './EntryPrice';
import { Input } from '../ui/input';

function ExitEquation(props) {

    const [exitEquationUpdate, setExitEquationUpdate] = useState(props.value);

    useEffect(()=>{
        setExitEquationUpdate(props.value)
    },[props.value])

    const getExit = (data) => {
        
        let temp = {...exitEquationUpdate}
        temp["exitEquation"] = data
        setExitEquationUpdate(temp)
        props.onChange(temp, props.index)
    }
    return (
        <>

            <EntryUI entry={exitEquationUpdate["exitEquation"]} getEntry={getExit}></EntryUI>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mx-2">
                Exit Price
            </h4>
            <EntryPrice exitPrice={exitEquationUpdate["exitPrice"]} ></EntryPrice>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mx-2">
                Label
            </h4>
            <Input type="text" placeholder="Label" value={exitEquationUpdate.label} onChange={(e) => setExitEquationUpdate({ ...exitEquationUpdate, label: e.target.value })} />





        </>
    )
}

export default ExitEquation