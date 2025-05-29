"use client";

import React from 'react'
import { Label } from '../ui/label'
import { Button } from '../ui/button';

const Time = ({ arrayPass, passto = () => { } }) => {

    // console.log("arrayPass", arrayPass)
    if (arrayPass[0]["value"] == "time") {
        return (
            <>
                {/* <Label>{arrayPass[0]["label"]}</Label> */}
                <Button variant="outline">{arrayPass[0]["label"]}</Button>
            </>
        )
    }

}

export default Time