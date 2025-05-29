
"use client";

import React, { createContext, useCallback, useEffect, useState } from 'react'


export const CopyIndicatorContext = createContext([]);

const CopyIndicatorContexttProvider = (props) => {

    const [copyIndicator, setCopyIndicator] = useState(null);

    useEffect(() => {
        localStorage.setItem("copyIndicator", JSON.stringify(copyIndicator))
    }, [copyIndicator])

    // Function to lazily fetch the value from local storage
    const getCopyIndicator = () => {

        const storedValue = localStorage.getItem("copyIndicator");

        return storedValue;
    }





    return (
        <CopyIndicatorContext.Provider value={{ copyIndicator, setCopyIndicator, getCopyIndicator }}>
            {props.children}
        </CopyIndicatorContext.Provider>
    )
}

export default CopyIndicatorContexttProvider