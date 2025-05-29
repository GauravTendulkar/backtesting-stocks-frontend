import React from 'react'
import { useState, useEffect } from 'react'
import { Input } from './ui/input'

function InputInteger(props) {
    const [error, setError] = useState("")
    const [inputIntegerUpdate, setInputIntegerUpdate] = useState(props.value)

    useEffect(() => {
        setInputIntegerUpdate(props.value)
    }, [props.value])

    const valueChange = (v) => {

        if (checkIfNumber(parseInt(v.slice(-1)))) {

            if (v.slice(0, 1) == "0") {

                v = v.slice(0, v.length)

            }
             
            
            setInputIntegerUpdate(v);
            props.onChange(parseInt(v));
            setError("");
        }
        else if (v === "") {
            
           
            setInputIntegerUpdate(0);
            props.onChange(0);
            setError("Input cannot be empty");
        }
        else {
            
            setInputIntegerUpdate(v.slice(0, v.length - 1));
            props.onChange(parseInt(v.slice(0, v.length - 1)));
            setError("Only integers are allowed");
        }


    };

    const checkIfNumber = (number) => {
        if (0 <= number && number <= 9) {
            return true
        }
        else {
            return false
        }
    }

    return (
        <>  <div className='flex flex-col'>
            <Input type='text' value={inputIntegerUpdate} onChange={(e) => valueChange(e.target.value)}></Input>
            {error && <span className="text-red-500">{error}</span>}
            </div>

        </>
    )
}

export default InputInteger