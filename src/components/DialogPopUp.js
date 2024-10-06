
"use client";

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
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react";

export default function DialogPopUp(props) {


    const [dialogUpdate, setDialogUpdate] = useState("");

    const [dialoBoxTrigger, setDialoBoxTrigger] = useState(props.open);
    

    useEffect(()=>{
        setDialoBoxTrigger(props.open)
    },[props.open]);

    const handleCancel = (v)=>{
        console.log(v)
        setDialoBoxTrigger(v)
        props.setOpen(v)

    }


    const handleSubmit = () =>{
        // console.log(dialogUpdate)
        if(dialogUpdate == ""){
            setError('Do not submit empty');
        }
        else{
            props.updateDialog(dialogUpdate)
            setError('');
        }
        

        
    }

    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
    
        // Check if the input is an integer or empty
        if (/^\d*$/.test(value)) {
          setDialogUpdate(value);
          setError('');
        } else {
          setError('Only integers are allowed');
        }
      };

    return (
        <>
            <Dialog open={dialoBoxTrigger} onOpenChange={handleCancel}>
                {/* <DialogTrigger asChild>
                    <Button variant="outline">Edit Profile</Button>
                </DialogTrigger> */}

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Enter Value</DialogTitle>
                        <DialogDescription>

                        </DialogDescription>


                    </DialogHeader>
                    <div className="flex flex-col">
                        

                            <Input value={dialogUpdate} onChange={handleInputChange} className="col-span-3" />
                            {error && <p className="text-red-600">{error}</p>}
                        
                        
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleSubmit}>Submit</Button>
                    </DialogFooter>
                </DialogContent>

            </Dialog>


        </>
    )

}