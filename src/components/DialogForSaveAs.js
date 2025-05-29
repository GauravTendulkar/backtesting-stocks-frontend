
"use client";

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from '@radix-ui/react-dropdown-menu';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
const DialogForSaveAs = ({ open = false, setOpen = () => { }, valueProp = {}, onSubmitProp }) => {

    // const [dialogUpdate, setDialogUpdate] = useState("");

    const [dialoBoxTrigger, setDialoBoxTrigger] = useState(open);
    const [currentComponentState, setCurrentComponentState] = useState(valueProp);

    useEffect(() => {
        console.log("valueProp", valueProp)
    }, [valueProp]);

    useEffect(() => {
        setDialoBoxTrigger(open)
    }, [open]);

    const handleCancel = (v) => {

        setDialoBoxTrigger(v)
        setOpen(v)

    }

    const handleTitleChange = (data) => {
        let temp = { ...currentComponentState }
        temp["title"] = data
        setCurrentComponentState({ ...temp })
    }

    const handleDescriptionChange = (data) => {
        let temp = { ...currentComponentState }
        temp["description"] = data
        setCurrentComponentState({ ...temp })
    }

    const handleScanCategoryChange = (data) => {

        let temp = { ...currentComponentState }
        temp["scanCategory"] = data
        setCurrentComponentState({ ...temp })
    }

    const handleISPrivateChange = (data) => {

        let temp = { ...currentComponentState }
        temp["isPrivate"] = data
        setCurrentComponentState({ ...temp })
    }

    const handleSubmit = () => {
        setDialoBoxTrigger(false)
        setOpen(false)
        onSubmitProp({ ...currentComponentState })
    }

    const scanCategory = [
        {
            "value": "long",
            "label": "Bullish Scan"
        },
        {
            "value": "short",
            "label": "Bearish Scan"
        },
        {
            "value": "intraday_long",
            "label": "Intraday Bullish Scan"
        },
        {
            "value": "intraday_short",
            "label": "Intraday Bearish Scan"
        },
        {
            "value": "Other",
            "label": "Other"
        },
    ]

    return (
        <>

            <Dialog open={dialoBoxTrigger} onOpenChange={handleCancel}>
                {/* <DialogTrigger asChild>
                    <Button variant="outline">Edit Profile</Button>
                </DialogTrigger> */}

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Save As</DialogTitle>
                        <DialogDescription>

                        </DialogDescription>


                    </DialogHeader>
                    <div className="flex flex-col space-y-2">

                        <Label>Title</Label>
                        <Input value={currentComponentState.title} onChange={(e) => { handleTitleChange(e.target.value) }} className="col-span-3" />
                        <Label>Description</Label>
                        <Textarea value={currentComponentState.description} onChange={(e) => { handleDescriptionChange(e.target.value) }} className="col-span-3" />
                        <Label>Scan Category</Label>

                        <select

                            value={currentComponentState.scanCategory}
                            onChange={(e) => handleScanCategoryChange(e.target.value)}
                            className='border-2 border-black mr-auto  overflow-y-scroll'>

                            <option value="" disabled>
                                Select a category
                            </option>
                            {scanCategory.map((e, id) => {
                                return (
                                    <option key={id} value={e.value}>{e.label}</option>
                                );
                            })}
                        </select>


                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms"
                                checked={currentComponentState.isPrivate}
                                onCheckedChange={handleISPrivateChange} />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Is Private
                            </label>
                        </div>

                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleSubmit}>Submit</Button>
                    </DialogFooter>
                </DialogContent>

            </Dialog>
        </>
    )
}

export default DialogForSaveAs