import React, { memo, useEffect, useState } from 'react'
import EquationUI from './EquationUI'

const ExitUIMiddleProcess = memo(({  objectPath, valueProp = {}, dispachStateEquation, objectProp }) => {
  

  const getObjectType = () => {
    const keys = Object.keys(valueProp);
    if (keys.includes("AND")) {
      return "AND"
    } else if (keys.includes("OR")) {
      return "OR"
    } else if (keys.includes("condition")) {
      return "condition"
    } else {
      return null;
    }
  }

  return (
    <div className="border rounded-xl bg-muted p-4 my-4 shadow-sm">
      <div className="text-sm font-medium text-muted-foreground mb-2">
        Condition Logic
      </div>
      <EquationUI
        indexProp={undefined}
        objectPath={objectPath}
        valueProp={valueProp}
        objectProp={getObjectType()}
        dispachStateEquation={dispachStateEquation}
      // onChangeProp={onChange}
      />
    </div>
  )
})

export default ExitUIMiddleProcess
