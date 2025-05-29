import React from 'react'
import EntryUI from './EntryUI'
import { useState } from 'react'
import EntryPrice from './EntryPrice';
import { Input } from '../ui/input';
import ExitEquation from './ExitEquation';
import { Card } from '../ui/card';

function ExitUI() {

    const [exitUpdate, setExitUpdate] = useState([
        {
            "exitEquation": [{ "AND": [{ "condition": [] }] }],
            "exitPrice": [{ "condition": [] }],
            "label": ""
        },
        {
            "exitEquation": [{ "AND": [{ "condition": [] }] }],
            "exitPrice": [{ "condition": [] }],
            "label": ""
        }
    ]);

    const getExit = (data, index) => {
        let temp = [...exitUpdate]
        temp[index] = data
        setExitUpdate(temp)
        
        
    }
    return (
        <>
        {exitUpdate.map((e, index)=>{
            return(
                <Card key={index} className='m-2'>
                    
                <ExitEquation value={e} onChange={(data)=>getExit(data, index)} index={index}></ExitEquation>
                </Card>
            )
        })}

            




        </>
    )
}

export default ExitUI