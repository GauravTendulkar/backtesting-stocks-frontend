import React, { memo, useEffect, useState } from 'react'
import ConditionUI from './ConditionUI'

const EntryPrice = memo(({ valueProp = {}, objectPath=[], dispachStateEquation, onChangeProp = () => { }, objectProp }) => {
   

    return (
        <div className="w-full  mx-auto my-4 px-4">
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 shadow-md p-4 bg-muted">
                {/* <div className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
          Entry Price Condition
        </div> */}
                <div className="text-sm font-medium text-muted-foreground mb-2">
                    Entry Price Condition
                </div>
                <div className="mt-4">
                    <ConditionUI
                        indexProp={undefined}
                        valueProp={valueProp}
                        objectPath={objectPath}
                        objectProp={Object.keys(valueProp)[0]}
                        dispachStateEquation={dispachStateEquation}
                        
                        disableSwitchProp={objectProp}
                    />
                </div>
            </div>
        </div>
    )
})

export default EntryPrice
