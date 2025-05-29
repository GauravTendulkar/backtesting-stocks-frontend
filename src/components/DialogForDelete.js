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

const DialogForDelete = ({ open = false, setOpen = () => { }, valueID = "", handleDeleteProp = () => { } }) => {

    const [dialoBoxTrigger, setDialoBoxTrigger] = useState(open);


    useEffect(() => {
        setDialoBoxTrigger(open)
    }, [open]);

    const handleCancel = (v) => {

        setDialoBoxTrigger(v)
        setOpen(v)

    }




    const handleDelete = () => {
        setDialoBoxTrigger(false)
        setOpen(false)
        handleDeleteProp(valueID)
    }
    return (
        <>
            <Dialog open={dialoBoxTrigger} onOpenChange={handleCancel}>
                {/* <DialogTrigger asChild>
                    <Button variant="outline">Edit Profile</Button>
                </DialogTrigger> */}

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Are you Sure ?</DialogTitle>
                        <DialogDescription>

                        </DialogDescription>


                    </DialogHeader>

                    <DialogFooter>
                        <Button type="submit" onClick={handleDelete} variant="destructive">Delete</Button>
                    </DialogFooter>
                </DialogContent>

            </Dialog>
        </>
    )
}

export default DialogForDelete