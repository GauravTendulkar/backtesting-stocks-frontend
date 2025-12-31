import React, { memo, useEffect, useState } from 'react'
import ConditionUI from './ConditionUI';

const ExitPrice = memo(({ objectPath, valueProp = {}, dispachStateEquation, objectProp }) => {
  // const [currentComponentState, setCurrentComponentState] = useState(valueProp)

  // useEffect(() => {
  //   setCurrentComponentState(valueProp)
  // }, [valueProp]);

  // const onChange = (data) => {
  //   setCurrentComponentState(data)
  //   onChangeProp(data, indexProp, objectProp)
  // }

  return (
    <div className="border rounded-xl bg-muted p-4 my-4 shadow-sm">
      <div className="text-sm font-medium text-muted-foreground mb-2">
        Exit Price Condition
      </div>
      <ConditionUI
        indexProp={undefined}
        valueProp={valueProp}
        objectProp={Object.keys(valueProp)[0]}
        objectPath={objectPath}
        dispachStateEquation={dispachStateEquation}
        // onChangeProp={onChange}
        disableSwitchProp={objectProp}
      />
    </div>
  )
})

export default ExitPrice
