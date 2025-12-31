import React, { memo, useContext, useEffect, useState } from 'react'
import ConditionUI from './ConditionUI';
import { condition, group } from '@/json-data/loading-create';
import { Button } from '../ui/button';
import { ClipboardCopy, ClipboardPaste, X } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Switch } from '../ui/switch';
import { useCallback } from 'react';
import { CopyIndicatorContext } from '@/app/context/CopyIndicatorContext';

const EquationUI = ({ indexProp, objectPath = [], dispachStateEquation, valueProp, onChangeProp = () => { }, objectProp, removeGroupProp = () => { }, disableSwitchProp = "" }) => {
    const { getCopyIndicator, getCopyConditionAndGroup, setCopyConditionAndGroup } = useContext(CopyIndicatorContext)

    const getObjectType = (e) => {
        const keys = Object.keys(e);
        if (keys.includes("AND")) return "AND";
        if (keys.includes("OR")) return "OR";
        if (keys.includes("condition")) return "condition";
        return null;
    }

    const renderComponents = (e, id, arr) => {
        const type = getObjectType(e);
        if (type === "condition") {
            return (
                <ConditionUI
                    indexProp={id}
                    valueProp={e}
                    objectPath={[...objectPath, ...arr]}
                    dispachStateEquation={dispachStateEquation}
                    objectProp={type}

                />
            );
        }
        if (type === "AND" || type === "OR") {
            return (
                <EquationUI
                    indexProp={id}
                    valueProp={e}
                    objectPath={[...objectPath, ...arr]}
                    dispachStateEquation={dispachStateEquation}
                    // onChangeProp={onChange}
                    objectProp={type}
                // removeGroupProp={removeGroup}
                />
            );
        }
    }


// border-muted
    return (
        <div className={`${valueProp.switch ? "opacity-100" : "opacity-35"} p-2 border-l-4 border-t-4 border-red-400  rounded  bg-muted/50`}>
            <div className='flex flex-wrap gap-1 justify-between items-center mb-2 '>
                <div className='flex gap-1'>
                    <Button size="sm" variant={objectProp === "AND" ? "default" : "secondary"} onClick={() => {
                        // console.log("onChangeANDOR_EquationUI", [...objectPath, objectProp])
                        dispachStateEquation({ type: "toggleANDOR_EquationUI", path: [...objectPath, objectProp] })
                    }}>AND</Button>
                    <Button size="sm" variant={!(objectProp === "AND") ? "default" : "secondary"} onClick={() => { dispachStateEquation({ type: "toggleANDOR_EquationUI", path: [...objectPath, objectProp] }) }
                        // onChangeANDOR
                    }>OR</Button>
                </div>
                <div className='flex gap-1 items-center'>
                    <Button size="icon" variant="secondary" onClick={() => {

                        console.log("setCopyConditionAndGroup", valueProp)
                        setCopyConditionAndGroup(valueProp)
                    }//handlePaste

                    }>
                        <ClipboardCopy size={14} />
                    </Button>
                    <Button size="sm" onClick={() => {
                        // dispachStateEquation({ type: "addCondition_EquationUI", path: [...objectPath, objectProp] })
                        const copy = getCopyConditionAndGroup()
                        if (copy) {

                            console.log("handleConditionAndGroupPaste_EquationUI", copy)

                            dispachStateEquation({ type: "handleConditionAndGroupPaste_EquationUI", path: [...objectPath, objectProp], value: copy })
                        }


                    }} //</div>addCondition
                    ><ClipboardPaste className="w-4 h-4" />Paste Group/Condition</Button>


                    <Button size="sm" onClick={() => { dispachStateEquation({ type: "addCondition_EquationUI", path: [...objectPath, objectProp] }) }} //</div>addCondition
                    >+ Condition</Button>
                    <Button size="sm" variant="secondary" onClick={() => {
                        // console.log("addGroup", [...objectPath, objectProp])
                        dispachStateEquation({ type: "addGroup_EquationUI", path: [...objectPath, objectProp] })
                    } //addGroup

                    }>+ Group</Button>
                    {indexProp !== undefined && (
                        <Button size="icon" variant="destructive" onClick={() => {
                            console.log("removeGroup_EquationUI", [...objectPath])
                            dispachStateEquation({ type: "removeGroup_EquationUI", path: [...objectPath] })
                        }//removeGroupProp(indexProp)
                        }>
                            <X size={16} />
                        </Button>
                    )}
                    <Switch
                        className={`${(indexProp == undefined) ? "hidden" : ""} ${(disableSwitchProp == "entryPrice" || disableSwitchProp == "quantity" || disableSwitchProp == "exitPrice") ? "hidden" : ""}`}
                        checked={valueProp.switch}
                        onCheckedChange={() => {
                            console.log("toggleSwitch", objectPath)
                            dispachStateEquation({ type: "toggleSwitch_EquationUI", path: [...objectPath, "switch"], value: valueProp.switch })
                        } //toggleSwitch

                        }
                    />
                </div>
            </div >
            <div className='space-y-1'>
                {valueProp[objectProp] && valueProp[objectProp].map((e, id) => (
                    <div className='p-1 rounded bg-background shadow-sm' key={id}>
                        {renderComponents(e, id, [objectProp, id])}
                    </div>
                ))}
            </div>
        </div >
    );
}

export default EquationUI;
