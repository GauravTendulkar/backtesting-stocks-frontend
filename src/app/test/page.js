"use client"


import SearchDropdown from "@/components/dropdowns/SearchDropdown";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import { useState } from "react";



export default function Test() {

  const [isWwitch, setIsSwitch] = useState("true");


  function onChange(data) {
    console.log(data)
    setIsSwitch(data) 
  }

  return (
    <>
      <div className="h-80 bg-slate-500">height</div>
      <div className="flex"><button>Click me</button>
        <SearchDropdown valueArray={[]} onChange={onChange}><Plus /></SearchDropdown>
        <button>Click me</button>
        <Switch 
        checked={isWwitch}
          onCheckedChange={onChange}
          disabled={false}
          aria-readonly />


      </div>
    </>
  );
}