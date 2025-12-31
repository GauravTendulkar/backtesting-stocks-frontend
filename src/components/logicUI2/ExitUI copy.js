import React, { memo, useEffect, useState } from 'react'
import EntryUI from './EntryUI';
import EquationUI from './EquationUI';
import ExitUIMiddleProcess from './ExitUIMiddleProcess';
import EntryPrice from './EntryPrice';
import ExitPrice from './ExitPrice';
import ExitLabel from './ExitLabel';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { addExit } from '@/json-data/loading-create';
import { MoveDown, MoveUp, X } from 'lucide-react';
import { Switch } from '../ui/switch';

const ExitUI = memo(({ valueProp = {}, onChangeProp = () => { }, objectProp }) => {
  // console.log("ExitUI")
  const [currentComponentState, setCurrentComponentState] = useState(valueProp)
  // const [isSwitch, setIsSwitch] = useState(() => {
  //   if (valueProp.switch == undefined) {
  //     return true
  //   }
  //   return valueProp.switch
  // });

  // useEffect(() => {

  //   setIsSwitch(() => {
  //     if (valueProp.switch == undefined) {
  //       return true
  //     }
  //     return valueProp.switch
  //   })
  // }, [valueProp.switch])


  useEffect(() => {
    // console.log("ExitUI", valueProp)
    setCurrentComponentState(valueProp)
  }, [valueProp]);

  const onChange = (data, index, obj) => {
    // console.log("data", data, index, obj)

    let temp = [...currentComponentState]
    temp[index][obj] = data

    setCurrentComponentState(temp)
    onChangeProp(temp, objectProp)
  }

  const addExitCondition = () => {
    let temp = [...currentComponentState]
    const tempAddExit = JSON.parse(JSON.stringify(addExit));
    temp = [...temp, tempAddExit]
    setCurrentComponentState([...temp])
    onChangeProp([...temp], objectProp)
  }

  const removeExitCondition = (index) => {
    let temp = [...currentComponentState]
    temp.splice(index, 1)
    setCurrentComponentState([...temp])
    onChangeProp([...temp], objectProp)
  }

  const toggleSwitch = (data, index) => {

    let temp = [...currentComponentState]
    temp[index]["switch"] = data

    // console.log("temp", temp, data, index)
    // console.log("temp", temp)
    // temp["switch"] = data
    // setIsSwitch(data)
    onChangeProp([...temp], objectProp)
  }

  const moveUp = (index) => {
    // console.log("moveUp", index, currentComponentState.length)
    let temp = [...currentComponentState];
    let tempItem;
    if (index > 0) {
      tempItem = temp[index];
      temp[index] = temp[index - 1];
      temp[index - 1] = tempItem

    }
    setCurrentComponentState([...temp])
    onChangeProp([...temp], objectProp)

  }

  const moveDown = (index) => {
    // console.log("moveDown", index, currentComponentState.length)

    let temp = [...currentComponentState];
    let tempItem;
    if (index < currentComponentState.length - 1) {
      tempItem = temp[index];
      temp[index] = temp[index + 1];
      temp[index + 1] = tempItem

    }
    setCurrentComponentState([...temp])
    onChangeProp([...temp], objectProp)
  }

  return (
    <>
      <div className='flex flex-col '>
        <div className='flex justify-end '>
          <Button onClick={addExitCondition}>Add Exit Condition</Button>

        </div>
        {currentComponentState && currentComponentState.map((e, id) => {
          return (
            <div key={id} className={`p-1 ${e["switch"] ? "opacity-100" : "opacity-35"}`}>
              <div className='flex justify-end items-center space-x-2'>
                <Button size="icon" variant="secondary" className={`${(id == 0) ? "hidden" : ""}`} onClick={() => { moveUp(id) }}><MoveUp /></Button>
                <Button size="icon" variant="secondary" className={`${(id == currentComponentState.length - 1) ? "hidden" : ""}`} onClick={() => { moveDown(id) }}><MoveDown /></Button>
                <Button size="icon" variant="destructive" onClick={() => { removeExitCondition(id) }}><X /></Button>
                <Switch
                  className={``}
                  checked={e["switch"]}
                  onCheckedChange={(data) => toggleSwitch(data, id)}
                  disabled={false}
                  aria-readonly />
              </div>
              <Separator />
              <ExitUIMiddleProcess indexProp={id} valueProp={e["exit"]} onChangeProp={onChange} objectProp={"exit"} ></ExitUIMiddleProcess>
              <label>Exit Price</label>
              <ExitPrice indexProp={id} valueProp={e["exitPrice"]} onChangeProp={onChange} objectProp="exitPrice"></ExitPrice>
              <label>Label</label>
              <ExitLabel indexProp={id} valueProp={e["label"]} onChangeProp={onChange} objectProp="label"></ExitLabel>

            </div>
          )
        })}
      </div>



    </>
  )
})

export default ExitUI