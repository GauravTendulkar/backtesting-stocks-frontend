import React, { memo, useEffect, useState } from 'react'
import EquationUI from './EquationUI'
import { Card } from '../ui/card';

const EntryUI = ({ valueProp = {}, objectPath=[],dispachStateEquation, objectProp }) => {
    

    const getObjectType = () => {
        const keys = Object.keys(valueProp);
        if (keys.includes("AND")) return "AND";
        if (keys.includes("OR")) return "OR";
        if (keys.includes("condition")) return "condition";
        return null;
    }

    return (
        <div className="w-full  mx-auto my-4 px-4">
            <Card className="p-4 shadow-lg border border-gray-200 rounded-2xl bg-muted">
                {/* <div className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
          Entry Condition
        </div> */}
                <div className="text-sm font-medium text-muted-foreground mb-2">
                    Entry Condition
                </div>
                <div className="mt-4">
                    <EquationUI
                        indexProp={undefined}
                        valueProp={valueProp}
                        objectPath={objectPath}
                        dispachStateEquation={dispachStateEquation}
                        objectProp={getObjectType()}
                        
                    />
                </div>
            </Card>
        </div>
    )
}

export default EntryUI
