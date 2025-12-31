import React, { memo, useEffect, useState } from 'react'
import ConditionUI from './ConditionUI';
import { condition, group } from '@/json-data/loading-create';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Switch } from '../ui/switch';
import { useCallback } from 'react';

const EquationUI = memo(({ indexProp, valueProp, onChangeProp = () => { }, objectProp, removeGroupProp = () => { }, disableSwitchProp = "" }) => {
    const [currentComponentState, setCurrentComponentState] = useState(valueProp);
    const [isAND, setIsAND] = useState(() => objectProp === "AND");
    const [isSwitch, setIsSwitch] = useState(() => valueProp.switch !== undefined ? valueProp.switch : true);

    useEffect(() => {
        setIsSwitch(valueProp.switch !== undefined ? valueProp.switch : true);
    }, [valueProp.switch]);

    useEffect(() => {
        if (JSON.stringify(valueProp) !== JSON.stringify(currentComponentState)) {
            setCurrentComponentState(valueProp);
        }
    }, [valueProp]);

    useEffect(() => {
        setIsAND(objectProp === "AND");
    }, [objectProp]);

    const toggleSwitch = (data) => {
        const temp = { ...currentComponentState, switch: data };
        setIsSwitch(data);
        onChangeProp({ ...temp }, indexProp);
    }

    const addGroup = () => {
        const temp = { ...currentComponentState };
        const tempGroup = JSON.parse(JSON.stringify(group));
        temp[objectProp].push(tempGroup);
        setCurrentComponentState({ ...temp });
        indexProp === undefined ? onChangeProp({ ...temp }) : onChangeProp({ ...temp }, indexProp);
    }

    const onChange = (data, index) => {
        const temp = { ...currentComponentState };
        temp[objectProp][index] = { ...data };
        indexProp === undefined ? onChangeProp({ ...temp }) : onChangeProp({ ...temp }, indexProp);
    }

    const onChangeANDOR = () => {
        const temp = { ...currentComponentState };
        if (objectProp === "AND") {
            temp["OR"] = [...temp[objectProp]];
        } else {
            temp["AND"] = [...temp[objectProp]];
        }
        delete temp[objectProp];
        setCurrentComponentState({ ...temp });
        indexProp === undefined ? onChangeProp({ ...temp }) : onChangeProp({ ...temp }, indexProp);
    }

    const getObjectType = (e) => {
        const keys = Object.keys(e);
        if (keys.includes("AND")) return "AND";
        if (keys.includes("OR")) return "OR";
        if (keys.includes("condition")) return "condition";
        return null;
    }

    const renderComponents = (e, id) => {
        const type = getObjectType(e);
        if (type === "condition") {
            return (
                <ConditionUI
                    indexProp={id}
                    valueProp={e}
                    objectProp={type}
                    onChangeProp={onChange}
                    removeConditionProp={removeCondition}
                />
            );
        }
        if (type === "AND" || type === "OR") {
            return (
                <EquationUI
                    indexProp={id}
                    valueProp={e}
                    onChangeProp={onChange}
                    objectProp={type}
                    removeGroupProp={removeGroup}
                />
            );
        }
    }

    const addCondition = () => {
        const temp = { ...currentComponentState };
        const tempCondition = JSON.parse(JSON.stringify(condition));
        temp[objectProp].push(tempCondition);
        setCurrentComponentState({ ...temp });
        indexProp === undefined ? onChangeProp({ ...temp }) : onChangeProp({ ...temp }, indexProp);
    }

    const removeGroup = (index) => {
        if (index !== undefined) {
            const temp = { ...currentComponentState };
            temp[objectProp].splice(index, 1);
            setCurrentComponentState({ ...temp });
            onChangeProp({ ...temp }, indexProp);
        }
    }

    const removeCondition = useCallback((index) => {
        const temp = { ...currentComponentState };
        temp[objectProp].splice(index, 1);
        setCurrentComponentState({ ...temp });
        onChangeProp({ ...temp }, indexProp);
    }, [objectProp, onChangeProp, indexProp]);

    return (
        <div className={`${isSwitch ? "opacity-100" : "opacity-35"} p-2 rounded border border-muted bg-muted/50`}>
            <div className='flex flex-wrap gap-1 justify-between items-center mb-2'>
                <div className='flex gap-1'>
                    <Button size="sm" variant={isAND ? "default" : "secondary"} onClick={onChangeANDOR}>AND</Button>
                    <Button size="sm" variant={!isAND ? "default" : "secondary"} onClick={onChangeANDOR}>OR</Button>
                </div>
                <div className='flex gap-1'>
                    <Button size="sm" onClick={addCondition}>+ Condition</Button>
                    <Button size="sm" variant="secondary" onClick={addGroup}>+ Group</Button>
                    {indexProp !== undefined && (
                        <Button size="icon" variant="destructive" onClick={() => removeGroupProp(indexProp)}>
                            <X size={16} />
                        </Button>
                    )}
                    <Switch
                        className={`${(indexProp == undefined) ? "hidden" : ""} ${(disableSwitchProp == "entryPrice" || disableSwitchProp == "quantity" || disableSwitchProp == "exitPrice") ? "hidden" : ""}`}
                        checked={isSwitch}
                        onCheckedChange={toggleSwitch}
                    />
                </div>
            </div>
            <div className='space-y-1'>
                {currentComponentState[objectProp] && currentComponentState[objectProp].map((e, id) => (
                    <div className='p-1 rounded bg-background shadow-sm' key={id}>
                        {renderComponents(e, id)}
                    </div>
                ))}
            </div>
        </div>
    );
});

export default EquationUI;
