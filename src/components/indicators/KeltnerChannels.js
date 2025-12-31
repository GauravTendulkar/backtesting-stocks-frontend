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
import InputFloat from "../InputFloat"; // ⬅️ Import your component
import { Label } from "../ui/label";

export default function KeltnerChannels(props) {
  const [keltnerUpdate, setKeltnerUpdate] = useState(props.arrayPass);
  const [isOnClickTrue, setIsOnClickTrue] = useState(false);
  const { ohlc } = useContext(EquationContext);

  useEffect(() => {
    setKeltnerUpdate(props.arrayPass);
  }, [props.arrayPass]);

  const passtoKeltner = (v) => {
    let temp = [...keltnerUpdate];
    temp.splice(0, 2, v[0], v[1]);
    setKeltnerUpdate(temp);
    props.passto(temp);
  };

  const handlePeriodChange = (v) => {
    let temp = [...keltnerUpdate];
    temp[3]["value"] = v;
    setKeltnerUpdate(temp);
    props.passto(temp);
  };

  const handleMultiplierChange = (v) => {
    let temp = [...keltnerUpdate];
    temp[4]["value"] = v;
    setKeltnerUpdate(temp);
    props.passto(temp);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button onClick={() => setIsOnClickTrue(true)} variant="outline">
          {`[${keltnerUpdate[0]["value"]}]${keltnerUpdate[1]["label"]} ${keltnerUpdate[2]["label"]}(${keltnerUpdate[3]["value"]}, ${keltnerUpdate[4]["value"]})`}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[300px] p-4">
        <div className="flex flex-col gap-2">
          <Label>Time Frame</Label>
          <TimeFrameOption
            isOnClickTrue={isOnClickTrue}
            setIsOnClickTrue={setIsOnClickTrue}
            variablePass={keltnerUpdate}
            passto={passtoKeltner}
          />

          <Label>Period</Label>
          <InputInteger
            value={keltnerUpdate[3]["value"]}
            onChange={handlePeriodChange}
          />

          <Label>Multiplier</Label>
          <InputFloat
            value={keltnerUpdate[4]["value"]}
            onChange={handleMultiplierChange}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
