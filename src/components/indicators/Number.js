"use client";

import React, { useState, useEffect } from 'react'
import InputFloat from '../InputFloat'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"


function Number(props) {

  const [inputNumberUpdate, setInputNumberUpdate] = useState(props.arrayPass);
  useEffect(() => {
    setInputNumberUpdate(props.arrayPass);
    // console.log("props.arrayPass");
    // console.log(props.arrayPass[0]);
  }, [props.arrayPass]);

  const passtoNumber = (v) => {
    // console.log("v");
    // console.log(v);
    let temp = [...inputNumberUpdate]
    temp[1]["value"] = v
    temp[1]["label"] = v
    setInputNumberUpdate(temp)
    props.passto(temp)
  }

  return (
    <>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline"><div>{`${inputNumberUpdate[0]["label"]}(${inputNumberUpdate[1]["label"]})`}</div> </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div>

            <InputFloat value={inputNumberUpdate[1]["value"]} onChange={passtoNumber} />


          </div>
        </PopoverContent>
      </Popover>

    </>
  )
}

export default Number