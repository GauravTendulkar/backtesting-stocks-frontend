import React, { memo, useCallback, useContext, useEffect, useState } from 'react'
import IndicatorUI from './IndicatorUI'
import { Button } from '../ui/button'
import { ClipboardCopy, ClipboardPaste, Plus, X } from 'lucide-react'
import SearchDropdown from '../dropdowns/SearchDropdown'
import { indicatorData } from '@/json-data/defaultIndicatorData'
import { indicator } from '@/json-data/loading-create'
import { Switch } from '../ui/switch'

import useDragAndDrop from '@/hooks/useDragAndDrop'
import { CopyIndicatorContext } from '@/app/context/CopyIndicatorContext'
import dynamic from 'next/dynamic'

const Plus1 = React.memo(Plus)
const ClipboardPaste1 = React.memo(ClipboardPaste)
const X1 = React.memo(X)
const Button1 = React.memo(Button)

const ConditionUI = ({ indexProp, objectPath = [], dispachStateEquation, objectProp, valueProp, onChangeProp = () => { }, removeConditionProp = () => { }, disableSwitchProp = '' }) => {

  // console.log("ConditionUI", objectPath, valueProp)

  // const [currentComponentState, setCurrentComponentState] = useState(valueProp)
  // const [isSwitch, setIsSwitch] = useState(() => valueProp.switch !== undefined ? valueProp.switch : true)
  const [errorForBrackets, setErrorForBrackets] = useState(null)

  useEffect(() => {
    // setIsSwitch(valueProp.switch !== undefined ? valueProp.switch : true)
    // console.log("valueProp.switch", valueProp.switch,)
  }, [valueProp.switch])

  // useEffect(() => {
  //   checkBracketsIsClosed(valueProp[objectProp])
  //   if (JSON.stringify(valueProp) !== JSON.stringify(currentComponentState)) {
  //     setCurrentComponentState(valueProp)
  //   }
  // }, [valueProp])

  // useEffect(() => {
  //   console.log("ConditionUI", currentComponentState)
  // }, [currentComponentState])

  const findUnclosedBracketsIndices = useCallback((arr) => {
    const stack = []
    const indices = []

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === '(') {
        stack.push(arr[i])
        indices.push(i)
      } else if (arr[i] === ')') {
        if (stack.length && stack[stack.length - 1] === '(') {
          stack.pop()
          indices.pop()
        } else {
          indices.push(i)
        }
      }
    }

    return indices
  }, [])

  const checkBracketsIsClosed = useCallback((data) => {
    let temp = data.map(d => ['(', ')'].includes(d?.indicator?.[0]?.value) ? d.indicator[0].value : 'x')
    const tempIndex = findUnclosedBracketsIndices(temp)

    if (tempIndex.length === 0) {
      setErrorForBrackets(null)
    } else {
      let formatted = tempIndex.map(i => i + 1)
      const message = formatted.length === 1
        ? `Bracket no. ${formatted[0]} is not closed properly`
        : `Brackets no. ${formatted.slice(0, -1).join(', ')} and ${formatted.at(-1)} are not closed properly.`
      setErrorForBrackets(message)
    }
  }, [findUnclosedBracketsIndices])

  useEffect(() => {
    checkBracketsIsClosed(valueProp[objectProp])
  }, [valueProp[objectProp]])

  const onChangeData = (data) => {
    // console.log(data)
    // checkBracketsIsClosed(data)

    dispachStateEquation({ type: "dragAndDrop_ConditionUI", path: [...objectPath, objectProp], value: data })
  }

  const {
    isDragging,
    dragID,
    handleOnDragStart,
    handleDragOver,
    handleOnDrop,
    handleOnDragEnd
  } = useDragAndDrop(valueProp[objectProp], onChangeData)



  const { getCopyIndicator, getCopyConditionAndGroup, setCopyConditionAndGroup } = useContext(CopyIndicatorContext)



  return (
    <div className={`flex flex-wrap items-center gap-1 border-l-4 border-primary bg-muted/30 mx-2 pl-2 pr-1 py-1 rounded-md text-sm ${['entryPrice', 'quantity', 'exitPrice'].includes(disableSwitchProp) || valueProp.switch ? 'opacity-100' : 'opacity-40'}`}>
      {valueProp[objectProp]?.map((e, id) => (
        <div
          draggable
          onDragStart={() => handleOnDragStart(id)}
          onDragOver={(event) => handleDragOver(event, id)}
          onDrop={handleOnDrop}
          onDragEnd={handleOnDragEnd}
          className={`transition-all duration-300 ${dragID === id && isDragging ? 'opacity-50 scale-95' : 'hover:scale-105'}`}
          key={id}
        >
          <IndicatorUI
            indexProp={id}
            valueProp={e}
            objectPath={[...objectPath, objectProp, id]}
            dispachStateEquation={dispachStateEquation}
            objectProp={Object.keys(e)[0]}

          />
        </div>
      ))}

      <div className="flex items-center gap-1">
        <SearchDropdown size="icon" valueArray={indicatorData} onChange={(data) => {
          // console.log("addIndicator", [...objectPath, objectProp], { "indicator": data })
          // checkBracketsIsClosed(data)
          dispachStateEquation({ type: "addIndicator_ConditionUI", path: [...objectPath, objectProp], value: { "indicator": data } })

        }//addIndicator

        }>
          <Plus1 className="w-4 h-4" />
        </SearchDropdown>
        <Button1 size="icon" variant="secondary" onClick={() => {
          const copy = getCopyIndicator()
          if (copy) {

            console.log({ "indicator": copy })

            dispachStateEquation({ type: "handlePaste_ConditionUI", path: [...objectPath, objectProp], value: { "indicator": copy } })
          }
        }//handlePaste

        }>
          <ClipboardPaste1 className="w-4 h-4" />
        </Button1>

        <Button1 size="icon" variant="secondary" onClick={() => {
          // const copy = getCopyConditionAndGroup()
          // if (copy) {

          //   // dispachStateEquation({ type: "handlePaste_ConditionUI", path: [...objectPath, objectProp], value: { "indicator": copy } })

          // }
          console.log("setCopyConditionAndGroup", valueProp)
          setCopyConditionAndGroup(valueProp)
        }//handlePaste

        }>
          <ClipboardCopy size={14} />
        </Button1>

        {/* <ClipboardCopy size={14} /> */}

        {indexProp !== undefined && (
          <Button1 size="icon" variant="destructive" onClick={() => dispachStateEquation({ type: "removeCondition_ConditionUI", path: [...objectPath] })}>
            <X1 className="w-4 h-4" />
          </Button1>
        )}
        {!['entryPrice', 'quantity', 'exitPrice'].includes(disableSwitchProp) && (
          <Switch checked={valueProp.switch} onCheckedChange={() => {
            // console.log({ type: "toggleSwitch_ConditionUI", path: [...objectPath, "switch"], value: valueProp.switch })
            dispachStateEquation({ type: "toggleSwitch_ConditionUI", path: [...objectPath, "switch"], value: valueProp.switch })
          }//toggleSwitch

          } />
        )}
      </div>

      {errorForBrackets && <div className="text-xs text-red-500 ml-2">{errorForBrackets}</div>}
    </div>
  )
}
export default ConditionUI
