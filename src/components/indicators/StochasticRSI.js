import React, { useEffect, useState, useContext } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import InputInteger from '../InputInteger'
import { EquationContext } from '@/app/context/EquationContext'
import TimeFrameOption from '../TimeFrameOption'
import { Label } from '../ui/label'

function StochasticRSI(props) {
  const [stochRsiUpdate, setStochRsiUpdate] = useState(props.arrayPass)
  const [isOnClickTrue, setIsOnClickTrue] = useState(false)

  const { ohlc } = useContext(EquationContext)

  useEffect(() => {
    setStochRsiUpdate(props.arrayPass)
  }, [props.arrayPass])

  const passtoStochRsi = (v) => {
    const temp = [...stochRsiUpdate]
    temp.splice(0, 2, v[0], v[1])
    setStochRsiUpdate(temp)
    props.passto(temp)
  }

  const handleChange = (index, value) => {
    const temp = [...stochRsiUpdate]
    temp[index]["value"] = value
    setStochRsiUpdate(temp)
    props.passto(temp)
  }

  const handleOhlcChange = (v) => {
    const temp = [...stochRsiUpdate]
    temp[7] = ohlc.find((item) => item.value === v)
    setStochRsiUpdate(temp)
    props.passto(temp)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          onClick={() => setIsOnClickTrue(true)}
          variant="outline"
        >
          {`[${stochRsiUpdate[0]["value"]}]${stochRsiUpdate[1]["label"]} ${stochRsiUpdate[2]["label"]}(${stochRsiUpdate[3]["value"]}, ${stochRsiUpdate[4]["value"]}, ${stochRsiUpdate[5]["value"]}, ${stochRsiUpdate[6]["value"]}, ${stochRsiUpdate[7]["value"]})`}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className='flex flex-col gap-2'>
          <Label>Time Frame</Label>
          <TimeFrameOption
            isOnClickTrue={isOnClickTrue}
            setIsOnClickTrue={setIsOnClickTrue}
            variablePass={stochRsiUpdate}
            passto={passtoStochRsi}
          />
          <Label>K Smoothing</Label>
          <InputInteger value={stochRsiUpdate[3]["value"]} onChange={(v) => handleChange(3, v)} />
          <Label>D Smoothing</Label>
          <InputInteger value={stochRsiUpdate[4]["value"]} onChange={(v) => handleChange(4, v)} />
          <Label>RSI Length</Label>
          <InputInteger value={stochRsiUpdate[5]["value"]} onChange={(v) => handleChange(5, v)} />
          <Label>Stochastic Length</Label>
          <InputInteger value={stochRsiUpdate[6]["value"]} onChange={(v) => handleChange(6, v)} />
          <Label>OHLC</Label>
          <select
            value={stochRsiUpdate[7]["value"]}
            onChange={(e) => handleOhlcChange(e.target.value)}
            className='border-2 border-black'
          >
            {ohlc.map((e, id) => (
              <option key={id} value={e.value}>{e.value}</option>
            ))}
          </select>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default StochasticRSI
