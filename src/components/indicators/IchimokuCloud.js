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

export default function IchimokuCloud(props) {
  const [icUpdate, setIcUpdate] = useState(props.arrayPass);
  const { ohlc } = useContext(EquationContext);
  const [isOnClickTrue, setIsOnClickTrue] = useState(false);

  useEffect(() => {
    setIcUpdate(props.arrayPass);
  }, [props.arrayPass]);

  const passtoIC = (v) => {
    let temp = [...icUpdate];
    temp.splice(0, 2, v[0], v[1]); // update time frame
    setIcUpdate(temp);
    props.passto(temp);
  };

  const handleChange = (index, value) => {
    let temp = [...icUpdate];
    temp[index]["value"] = value;
    setIcUpdate(temp);
    props.passto(temp);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          onClick={() => setIsOnClickTrue(true)}
          variant="outline"
        >
          {`[${icUpdate[0]["value"]}]${icUpdate[1]["label"]} ${icUpdate[2]["label"]}(${icUpdate[3]["value"]}, ${icUpdate[4]["value"]}, ${icUpdate[5]["value"]}, ${icUpdate[6]["value"]})`}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[300px] p-4">
        <div className="flex flex-col gap-2">
          <Label>Time Frame</Label>
          <TimeFrameOption
            isOnClickTrue={isOnClickTrue}
            setIsOnClickTrue={setIsOnClickTrue}
            variablePass={icUpdate}
            passto={passtoIC}
          />

          <Label>Conversion Line Length</Label>
          <InputInteger
            value={icUpdate[3]["value"]}
            onChange={(v) => handleChange(3, v)}
          />

          <Label>Base Line Length</Label>
          <InputInteger
            value={icUpdate[4]["value"]}
            onChange={(v) => handleChange(4, v)}
          />

          <Label>Leading Span B Length</Label>
          <InputInteger
            value={icUpdate[5]["value"]}
            onChange={(v) => handleChange(5, v)}
          />

          <Label>Lagging Span</Label>
          <InputInteger
            value={icUpdate[6]["value"]}
            onChange={(v) => handleChange(6, v)}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
