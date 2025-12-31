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

export default function CommodityChannelIndex(props) {
  const [momentumUpdate, setMomentumUpdate] = useState(props.arrayPass);
  const { ohlc } = useContext(EquationContext);
  const [isOnClickTrue, setIsOnClickTrue] = useState(false);

  useEffect(() => {
    setMomentumUpdate(props.arrayPass);
  }, [props.arrayPass]);

  const passtoMomentum = (v) => {
    let temp = [...momentumUpdate];
    temp.splice(0, 2, v[0], v[1]);
    setMomentumUpdate(temp);
    props.passto(temp);
  };

  const handlePeriodChange = (v) => {
    let temp = [...momentumUpdate];
    temp[3]["value"] = v;
    setMomentumUpdate(temp);
    props.passto(temp);
  };

  const handleSourceChange = (v) => {
    let temp = [...momentumUpdate];
    temp[4] = ohlc.find((item) => item.value === v);
    setMomentumUpdate(temp);
    props.passto(temp);
  };

  const source = [
  // Minutes
  { "value": "hlc" },
  { "value": "hl" },
  { "value": "ohlc" },
  { "value": "hlcc" },
  { "value": "open" },
  { "value": "high" },
  { "value": "low" },
  { "value": "close" }
]

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          onClick={() => setIsOnClickTrue(true)}
          variant="outline"
        >
          {`[${momentumUpdate[0]["value"]}]${momentumUpdate[1]["label"]} ${momentumUpdate[2]["label"]}(${momentumUpdate[3]["value"]}, ${momentumUpdate[4]["value"]})`}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[300px] p-4">
        <div className="flex flex-col gap-2">
          <Label>Time Frame</Label>
          <TimeFrameOption
            isOnClickTrue={isOnClickTrue}
            setIsOnClickTrue={setIsOnClickTrue}
            variablePass={momentumUpdate}
            passto={passtoMomentum}
          />

          <Label>Period</Label>
          <InputInteger
            value={momentumUpdate[3]["value"]}
            onChange={(v) => handlePeriodChange(v)}
          />

          <Label>Source</Label>
          <select
            value={momentumUpdate[4]["value"]}
            onChange={(e) => handleSourceChange(e.target.value)}
            className="border-2 border-black"
          >
            {source.map((e, id) => (
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
