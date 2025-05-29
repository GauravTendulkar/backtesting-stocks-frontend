import React, { useState, useEffect } from 'react'
import { Input } from './ui/input'


function InputFloat(props) {


    const [error, setError] = useState("")
    const [inputFloatUpdate, setInputFloatUpdate] = useState(props.value)

    useEffect(() => {
        setInputFloatUpdate(props.value)
    }, [props.value])

    const valueChange = (v) => {
        // console.log("v from Input Float")
        // console.log(v)
        // console.log(v.slice(-7).slice(0, 1) == ".")
        if (v.length > 0 && v.slice(-1) == ".") {

            if (v.slice(0, v.length - 1).includes(".")) {
                setError("Only one decimal point is allowed");
            }
            else {

                setError("");
                setInputFloatUpdate(v);
                props.onChange(parseFloat(v));

            } 



        }
        else if (v.slice(-8).slice(0, 1) == ".") {
            setError("");
            setInputFloatUpdate(v.slice(0, v.length - 1));
            props.onChange(parseFloat(v.slice(0, v.length - 1)));
            
        }
        else if (checkIfNumber(parseInt(v.slice(-1)))) {

            if (v.slice(0, 1) == "0") {

                v = v.slice(0, v.length)

            }


            setInputFloatUpdate(v);
            props.onChange(parseFloat(v));
            setError("");
            

        }
        else if (v === "") {

            setInputFloatUpdate(0);
            props.onChange(0);
            setError("Input cannot be empty");
            
        }
        else {

            setInputFloatUpdate(v.slice(0, v.length - 1));
            props.onChange(parseFloat(v.slice(0, v.length - 1)));
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
        <>
            <div className='flex flex-col'>
                <Input type='text' value={inputFloatUpdate} onChange={(e) => valueChange(e.target.value)}></Input>
                {error && <span className="text-red-500">{error}</span>}
            </div>

        </>
    )
}

export default InputFloat