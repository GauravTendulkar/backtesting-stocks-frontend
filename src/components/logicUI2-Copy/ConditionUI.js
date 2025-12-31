import React, { memo, useCallback, useContext, useEffect, useState } from 'react'
import IndicatorUI from './IndicatorUI'
import { Button } from '../ui/button'
import { ClipboardPaste, Plus, X } from 'lucide-react'
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

const ConditionUI = ({ indexProp, objectProp, valueProp, onChangeProp = () => { }, removeConditionProp = () => { }, disableSwitchProp = '' }) => {
  const [currentComponentState, setCurrentComponentState] = useState(valueProp)
  const [isSwitch, setIsSwitch] = useState(() => valueProp.switch !== undefined ? valueProp.switch : true)
  const [errorForBrackets, setErrorForBrackets] = useState(null)

  useEffect(() => {
    setIsSwitch(valueProp.switch !== undefined ? valueProp.switch : true)
  }, [valueProp.switch])

  useEffect(() => {
    checkBracketsIsClosed(valueProp[objectProp])
    if (JSON.stringify(valueProp) !== JSON.stringify(currentComponentState)) {
      setCurrentComponentState(valueProp)
    }
  }, [valueProp])

  useEffect(() => {
    console.log("ConditionUI", currentComponentState)
  }, [currentComponentState])

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

  const addIndicator = useCallback((data) => {
    let temp = { ...currentComponentState }
    let tempIndicator = { ...indicator }
    tempIndicator.indicator = JSON.parse(JSON.stringify(data))
    temp[objectProp] = [...temp[objectProp], tempIndicator]
    setCurrentComponentState({ ...temp })
    onChangeProp({ ...temp }, indexProp)
  }, [onChangeProp, currentComponentState, indicator])

  const removeIndicator = (index) => {
    let temp = { ...currentComponentState }
    let tempArr = [...temp[objectProp]]
    tempArr.splice(index, 1)
    temp[objectProp] = tempArr
    setCurrentComponentState({ ...temp })
    onChangeProp({ ...temp }, indexProp)
  }

  const onChange = useCallback((data, index) => {
    let temp = { ...currentComponentState }
    temp[objectProp][index] = data
    setCurrentComponentState({ ...temp })
    onChangeProp({ ...temp }, indexProp)
  }, [indexProp, onChangeProp])

  const onChangeData = (data) => {
    let temp = { ...currentComponentState }
    temp[objectProp] = data
    setCurrentComponentState({ ...temp })
  }

  const {
    isDragging,
    dragID,
    handleOnDragStart,
    handleDragOver,
    handleOnDrop,
    handleOnDragEnd
  } = useDragAndDrop(currentComponentState[objectProp], onChangeData)

  const toggleSwitch = (value) => {
    let temp = { ...currentComponentState, switch: value }
    setIsSwitch(value)
    setCurrentComponentState(temp)
    onChangeProp(temp, indexProp)
  }

  const { getCopyIndicator } = useContext(CopyIndicatorContext)

  const handlePaste = () => {
    const copy = JSON.parse(getCopyIndicator())
    if (copy) {
      let temp = { ...currentComponentState }
      temp[objectProp] = [...temp[objectProp], copy]
      setCurrentComponentState(temp)
      onChangeProp(temp, indexProp)
    }
  }

  return (
    <div className={`flex flex-wrap items-center gap-1 border-l-4 border-primary bg-muted/30 mx-2 pl-2 pr-1 py-1 rounded-md text-sm ${isSwitch ? 'opacity-100' : 'opacity-40'}`}>
      {currentComponentState[objectProp]?.map((e, id) => (
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
            objectProp={Object.keys(e)[0]}
            onChangeProp={onChange}
            removeIndicatorProp={removeIndicator}
          />
        </div>
      ))}

      <div className="flex items-center gap-1">
        <SearchDropdown size="icon" valueArray={indicatorData} onChange={addIndicator}>
          <Plus1 className="w-4 h-4" />
        </SearchDropdown>
        <Button1 size="icon" variant="secondary" onClick={handlePaste}>
          <ClipboardPaste1 className="w-4 h-4" />
        </Button1>
        {indexProp !== undefined && (
          <Button1 size="icon" variant="destructive" onClick={() => removeConditionProp(indexProp)}>
            <X1 className="w-4 h-4" />
          </Button1>
        )}
        {!['entryPrice', 'quantity', 'exitPrice'].includes(disableSwitchProp) && (
          <Switch checked={isSwitch} onCheckedChange={toggleSwitch} />
        )}
      </div>

      {errorForBrackets && <div className="text-xs text-red-500 ml-2">{errorForBrackets}</div>}
    </div>
  )
}
export default ConditionUI
