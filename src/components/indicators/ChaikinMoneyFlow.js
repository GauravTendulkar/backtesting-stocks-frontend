"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { EquationContext } from "@/app/context/EquationContext";
import TimeFrameOption from "../TimeFrameOption";
import InputInteger from "../InputInteger";
import { Label } from "../ui/label";

export default function ChaikinMoneyFlow(props) {
  const [cmfUpdate, setCmfUpdate] = useState(props.arrayPass);
  const [isOnClickTrue, setIsOnClickTrue] = useState(false);

  useEffect(() => {
    setCmfUpdate(props.arrayPass);
  }, [props.arrayPass]);

  const passtoCmf = (v) => {
    let temp = [...cmfUpdate];
    temp.splice(0, 2, v[0], v[1]);
    setCmfUpdate(temp);
    props.passto(temp);
  };

  const handlePeriodChange = (v) => {
    let temp = [...cmfUpdate];
    temp[3]["value"] = v;
    setCmfUpdate(temp);
    props.passto(temp);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button onClick={() => setIsOnClickTrue(true)} variant="outline">
          {`[${cmfUpdate[0]["value"]}]${cmfUpdate[1]["label"]} ${cmfUpdate[2]["label"]}(${cmfUpdate[3]["value"]})`}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[300px] p-4">
        <div className="flex flex-col gap-2">
          <Label>Time Frame</Label>
          <TimeFrameOption
            isOnClickTrue={isOnClickTrue}
            setIsOnClickTrue={setIsOnClickTrue}
            variablePass={cmfUpdate}
            passto={passtoCmf}
          />

          <Label>Period</Label>
          <InputInteger
            value={cmfUpdate[3]["value"]}
            onChange={(v) => handlePeriodChange(v)}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
