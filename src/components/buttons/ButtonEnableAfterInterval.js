import React, { useState } from 'react'
import { Button } from '../ui/button';

const ButtonEnableAfterInterval = ({ noOfIntervals = 5, onClick = () => { }, children }) => {

    const [count, setCount] = useState(noOfIntervals);

    const handleQuickSave = () => {
        onClick()
        let count = noOfIntervals
        function countFunction() {
            setCount(count -= 1)
            if (count == 0) {
                clearInterval(a)
                setCount(noOfIntervals)

            }
        }
        let a = setInterval(countFunction, 1000);

    }

    return (

        <>
            {(count == noOfIntervals) ? <Button onClick={() => { handleQuickSave() }}>
                {children}
            </Button>
                : (<Button disabled>{children} {count}</Button>)}

        </>
    )
}

export default ButtonEnableAfterInterval