"use client";

import React from 'react'
import { Button } from '../ui/button';

const PrevTradeCount = ({ arrayPass, passto = () => { } }) => {

    // console.log("arrayPass", arrayPass)
    if (arrayPass[0]["value"] == "countPrevTrades") {
        return (
            <>
                {/* <Label>{arrayPass[0]["label"]}</Label> */}
                <Button variant="outline">{arrayPass[0]["label"]}</Button>
            </>
        )
    }

}

export default PrevTradeCount
