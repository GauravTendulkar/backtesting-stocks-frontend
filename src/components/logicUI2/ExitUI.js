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

const ExitUI = memo(({ valueProp = {}, objectPath = [], onChangeProp = () => { }, dispachStateEquation, objectProp }) => {
  // const [currentComponentState, setCurrentComponentState] = useState(valueProp)

  // useEffect(() => {
  //   setCurrentComponentState(valueProp)
  // }, [valueProp]);

  // const onChange = (data, index, obj) => {
  //   let temp = [...currentComponentState]
  //   temp[index][obj] = data
  //   setCurrentComponentState(temp)
  //   onChangeProp(temp, objectProp)
  // }

  // const addExitCondition = () => {
  //   const temp = [...currentComponentState, JSON.parse(JSON.stringify(addExit))];
  //   setCurrentComponentState(temp)
  //   onChangeProp(temp, objectProp)
  // }

  // const removeExitCondition = (index) => {
  //   const temp = [...currentComponentState]
  //   temp.splice(index, 1)
  //   setCurrentComponentState(temp)
  //   onChangeProp(temp, objectProp)
  // }

  // const toggleSwitch = (data, index) => {
  //   const temp = [...currentComponentState]
  //   temp[index]["switch"] = data
  //   onChangeProp(temp, objectProp)
  // }

  // const moveUp = (index) => {
  //   if (index <= 0) return;
  //   const temp = [...currentComponentState];
  //   [temp[index - 1], temp[index]] = [temp[index], temp[index - 1]];
  //   setCurrentComponentState(temp);
  //   onChangeProp(temp, objectProp);
  // }

  // const moveDown = (index) => {
  //   if (index >= currentComponentState.length - 1) return;
  //   const temp = [...currentComponentState];
  //   [temp[index], temp[index + 1]] = [temp[index + 1], temp[index]];
  //   setCurrentComponentState(temp);
  //   onChangeProp(temp, objectProp);
  // }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-xl font-medium">Exit</h2>
        <Button onClick={() => { dispachStateEquation({ type: "addExitCondition_ExitUI", path: [...objectPath] }) }
          // addExitCondition
        }>+ Add Exit Condition</Button>
      </div>

      {valueProp?.map((e, id) => (
        <div
          key={id}
          className={`rounded-xl border border-muted p-4 shadow-sm transition-all duration-200 ${e["switch"] ? "opacity-100" : "opacity-50"} bg-background`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-muted-foreground">Exit Condition #{id + 1}</span>
            <div className="flex items-center space-x-2">
              <Button
                size="icon"
                variant="secondary"
                className={`${id === 0 ? "hidden" : ""}`}
                onClick={() => { dispachStateEquation({ type: "moveUp_ExitUI", path: [...objectPath, id] }) }//moveUp(id)

                }
              >
                <MoveUp className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className={`${id === valueProp.length - 1 ? "hidden" : ""}`}
                onClick={() => {
                  console.log({ type: "moveDown_ExitUI", path: [...objectPath, id] })
                  dispachStateEquation({ type: "moveDown_ExitUI", path: [...objectPath, id] })
                }//moveDown(id)

                }
              >
                <MoveDown className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="destructive"
                onClick={() => { dispachStateEquation({ type: "removeExitCondition_ExitUI", path: [...objectPath, id] }) }//removeExitCondition(id)
                }
              >
                <X className="h-4 w-4" />
              </Button>
              <Switch
                checked={e["switch"]}
                onCheckedChange={(data) => dispachStateEquation({ type: "toggleSwitch_ExitUI", path: [...objectPath, id, "switch"], value: data })}
                aria-readonly
              />
            </div>
          </div>

          <Separator className="mb-4" />

          <div className="space-y-4">
            <div>
              <ExitUIMiddleProcess
                indexProp={id}
                valueProp={e["exit"]}
                // onChangeProp={onChange}
                objectPath={[...objectPath, id, "exit"]}
                dispachStateEquation={dispachStateEquation}
                objectProp={"exit"}
              />
            </div>

            <div>
              {/* <label className="block mb-1 text-sm font-medium">Exit Price</label> */}
              <ExitPrice
                indexProp={id}
                valueProp={e["exitPrice"]}
                objectPath={[...objectPath, id, "exitPrice"]}
                dispachStateEquation={dispachStateEquation}
                // onChangeProp={onChange}
                objectProp="exitPrice"
              />
            </div>

            <div>
              {/* <label className="block mb-1 text-sm font-medium">Label</label> */}
              <ExitLabel
                indexProp={id}
                valueProp={e["label"]}
                objectPath={[...objectPath, id, "label"]}
                dispachStateEquation={dispachStateEquation}
                
                objectProp="label"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
})

export default ExitUI
