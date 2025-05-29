"use client";

import React from 'react'
import { Label } from '../ui/label'
import { Button } from '../ui/button';

const EntryValue = ({ arrayPass, passto = () => { } }) => {

    // console.log("arrayPass", arrayPass)
    if (arrayPass[0]["value"] == "entry") {
        return (
            <>
                {/* <Label>{arrayPass[0]["label"]}</Label> */}
                <Button variant="outline">{arrayPass[0]["label"]}</Button>
            </>
        )
    }

}

export default EntryValue