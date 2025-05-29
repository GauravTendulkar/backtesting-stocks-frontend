"use client"

import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";  // shadcn Input component
import { Button } from "@/components/ui/button";  // shadcn Button component

export default function Test1() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    console.log(inputValue)
  }, [inputValue]);

  const handleInputChange = (e) => {
    const value = e.target.value;

    // Check if the input is an integer or empty
    if (/^\d*$/.test(value)) {
      setInputValue(value);
      setError('');
    } else {
      setError('Only integers are allowed');
    }
  };

  const handleSubmit = () => {
    if (inputValue === '') {
      setError('Please enter a value');
    } else {
      alert(`You entered: ${inputValue}`);
      setIsDialogOpen(false);
    }
  };

  return (
    <div>
      {/* Trigger Button outside the dialog */}
      <Button onClick={() => setIsDialogOpen(true)}>Open Dialog</Button>

      {/* Dialog Box */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter an Integer</DialogTitle>
          </DialogHeader>

          {/* Input Field */}
          <Input
            value={inputValue}
            onChange={handleInputChange}
            type="text"
            placeholder="Enter a number"
          />
          {error && <p className="text-red-600">{error}</p>}

          {/* Dialog Footer */}
          <DialogFooter>
            <Button onClick={handleSubmit}>Submit</Button>
            <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
