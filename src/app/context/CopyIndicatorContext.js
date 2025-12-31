
"use client";

import React, { createContext, useCallback, useEffect, useState } from 'react'


export const CopyIndicatorContext = createContext([]);

const CopyIndicatorContexttProvider = (props) => {

    const [copyIndicator, setCopyIndicator] = useState(null);

    const [copyConditionAndGroup, setCopyConditionAndGroup] = useState(null);

    useEffect(() => {
        localStorage.setItem("copyIndicator", JSON.stringify(copyIndicator))
    }, [copyIndicator])

    useEffect(() => {
        localStorage.setItem("copyConditionAndGroup", JSON.stringify(copyConditionAndGroup))
    }, [copyConditionAndGroup])

    // Function to lazily fetch the value from local storage
    const getCopyIndicator = () => {

        const storedValue = JSON.parse(localStorage.getItem("copyIndicator"));

        return storedValue;
    }



    const getCopyConditionAndGroup = () => {

        const storedValue = JSON.parse(localStorage.getItem("copyConditionAndGroup"));

        return storedValue;
    }





    return (
        <CopyIndicatorContext.Provider value={{ copyIndicator, setCopyIndicator, getCopyIndicator, setCopyConditionAndGroup, getCopyConditionAndGroup }}>
            {props.children}
        </CopyIndicatorContext.Provider>
    )
}

export default CopyIndicatorContexttProvider