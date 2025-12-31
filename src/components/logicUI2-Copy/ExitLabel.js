import React, { memo, useEffect, useState } from 'react'

import { Input } from '../ui/input'

const ExitLabel = memo(({ indexProp, valueProp = {}, onChangeProp = () => { }, objectProp }) => {
  const [currentComponentState, setCurrentComponentState] = useState(valueProp)

  useEffect(() => {
    setCurrentComponentState(valueProp)
  }, [valueProp])

  const onchange = (data) => {
    setCurrentComponentState(data)
    onChangeProp(data, indexProp, objectProp)
  }

  return (
    <div className="border rounded-xl bg-muted p-4 my-4 shadow-sm">
      <label className="block text-sm font-medium text-muted-foreground mb-2">
        Exit Label
      </label>
      <Input
        value={currentComponentState}
        onChange={(e) => onchange(e.target.value)}
        placeholder="Enter a label for this exit..."
        className="focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  )
})

export default ExitLabel
