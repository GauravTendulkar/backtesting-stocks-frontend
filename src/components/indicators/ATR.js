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

const maTypes = [
  { value: "RMA" },
  { value: "SMA" },
  { value: "EMA" },
  { value: "WMA" },
];

export default function ATR(props) {
  const [atrUpdate, setAtrUpdate] = useState(props.arrayPass);
  const { ohlc } = useContext(EquationContext);
  const [isOnClickTrue, setIsOnClickTrue] = useState(false);

  useEffect(() => {
    setAtrUpdate(props.arrayPass);
  }, [props.arrayPass]);

  const passtoAtr = (v) => {
    let temp = [...atrUpdate];
    temp.splice(0, 2, v[0], v[1]); // replace first two (candle + tf)
    setAtrUpdate(temp);
    props.passto(temp);
  };

  const handlePeriodChange = (v) => {
    let temp = [...atrUpdate];
    temp[3]["value"] = v;
    setAtrUpdate(temp);
    props.passto(temp);
  };

  const handleMaTypeChange = (v) => {
    let temp = [...atrUpdate];
    temp[4] = maTypes.find((item) => item.value === v);
    setAtrUpdate(temp);
    props.passto(temp);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          onClick={() => setIsOnClickTrue(true)}
          variant="outline"
        >
          {`[${atrUpdate[0]["value"]}]${atrUpdate[1]["label"]} ${atrUpdate[2]["label"]}(${atrUpdate[3]["value"]}, ${atrUpdate[4]["value"]})`}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[300px] p-4">
        <div className="flex flex-col gap-2">
          <Label>Time Frame</Label>
          <TimeFrameOption
            isOnClickTrue={isOnClickTrue}
            setIsOnClickTrue={setIsOnClickTrue}
            variablePass={atrUpdate}
            passto={passtoAtr}
          />

          <Label>Period</Label>
          <InputInteger
            value={atrUpdate[3]["value"]}
            onChange={(v) => handlePeriodChange(v)}
          />

          <Label>MA Type</Label>
          <select
            value={atrUpdate[4]["value"]}
            onChange={(e) => handleMaTypeChange(e.target.value)}
            className="border-2 border-black"
          >
            {maTypes.map((e, id) => (
              <option key={id} value={e.value}>
                {e.value}
              </option>
            ))}
          </select>
        </div>
      </PopoverContent>
    </Popover>
  );
}
