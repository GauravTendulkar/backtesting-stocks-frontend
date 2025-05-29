import React, { useEffect, useState, useContext } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'

import InputInteger from '../InputInteger'
import { EquationContext } from '@/app/context/EquationContext';
import TimeFrameOption from '../TimeFrameOption';
import { Label } from '../ui/label';


function Macd(props) {

  const [macdUpdate, setMacdUpdate] = useState(props.arrayPass);

  const [isOnClickTrue, setIsOnClickTrue] = useState(false)

  const { ohlc } = useContext(EquationContext);

  useEffect(() => {
    setMacdUpdate(props.arrayPass)
  }, [props.arrayPass])

  const passtoMacd = (v) => {

    let temp = [...macdUpdate]

    temp.splice(0, 2, v[0], v[1])

    setMacdUpdate(temp)
    props.passto(temp)

  }

  const handleOhlcChange = (v) => {
    let temp = [...macdUpdate]
    temp[6] = ohlc[ohlc.findIndex((item) => item.value === v)]
    setMacdUpdate(temp)
    props.passto(temp)
  }

  const handleValueChangeFor3 = (v) => {

    let temp = [...macdUpdate];
    temp[3]["value"] = v
    setMacdUpdate(temp);
    props.passto(temp);
  }
  const handleValueChangeFor4 = (v) => {

    let temp = [...macdUpdate];
    temp[4]["value"] = v
    setMacdUpdate(temp);
    props.passto(temp);
  }
  const handleValueChangeFor5 = (v) => {

    let temp = [...macdUpdate];
    temp[5]["value"] = v
    setMacdUpdate(temp);
    props.passto(temp);
  }



  return (
    <>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            onClick={() => {

              setIsOnClickTrue(true)
            }}
            variant="outline">{`[${macdUpdate[0]["value"]}]${macdUpdate[1]["label"]} ${macdUpdate[2]["label"]}(${macdUpdate[3]["value"]}, ${macdUpdate[4]["value"]}, ${macdUpdate[5]["value"]}, ${macdUpdate[6]["value"]})`}</Button>
        </PopoverTrigger>
        <PopoverContent className="">
          <div className='flex flex-col gap-2'>
            {/* <TimeFrameOption variablePass={smaUpdate.slice(0, 2)} passto={passtoSma}></TimeFrameOption> */}
            <Label>Time Frame</Label>
            <TimeFrameOption
              isOnClickTrue={isOnClickTrue}
              setIsOnClickTrue={setIsOnClickTrue}

              variablePass={macdUpdate}
              passto={passtoMacd}></TimeFrameOption>
            <Label>Fast</Label>
            <InputInteger value={macdUpdate[3]["value"]} onChange={(e) => handleValueChangeFor3(e)} ></InputInteger>
            <Label>Slow</Label>
            <InputInteger value={macdUpdate[4]["value"]} onChange={(e) => handleValueChangeFor4(e)} ></InputInteger>
            <Label>Signal</Label>
            <InputInteger value={macdUpdate[5]["value"]} onChange={(e) => handleValueChangeFor5(e)} ></InputInteger>

            <Label>OHLC</Label>
            <select value={macdUpdate[6]["value"]} onChange={(e) => handleOhlcChange(e.target.value)} className='border-2 border-black mr-auto  overflow-y-scroll'>

              {ohlc.map((e, id) => {
                return (
                  <option key={id} value={e.value}>{e.value}</option>
                );
              })}


            </select>



          </div>
        </PopoverContent>
      </Popover>


    </>
  )
}

export default Macd