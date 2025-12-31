"use client";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { useContext, useEffect, useState } from "react";
import { EquationContext } from "@/app/context/EquationContext";
import DialogPopUp from "../DialogPopUp";
import TimeFrameOption from "../TimeFrameOption";

import InputInteger from "../InputInteger";
import { Label } from "../ui/label";
import { indicatorData } from "@/json-data/defaultIndicatorData";
import { renderComponent } from "../logicUI2/IndicatorUI";
import SearchDropdown from "../dropdowns/SearchDropdown";
import { Plus } from "lucide-react";

export default function Max(props) {
    const [smaUpdate, setSmaUpdate] = useState(props.arrayPass);
    const { ohlc } = useContext(EquationContext);
    const [isOnClickTrue, setIsOnClickTrue] = useState(false);

    useEffect(() => {
        setSmaUpdate(props.arrayPass);
    }, [props.arrayPass]);

    const onChange = (data) => {
        let temp = [...smaUpdate];
        temp[2]["value"]["indicator"] = JSON.parse(JSON.stringify(data));
        setSmaUpdate([...temp]);
        props.passto([...temp]);
    };

    const changeIndicator = (data) => {
        let temp = [...smaUpdate];
        temp[2]["value"]["indicator"] = JSON.parse(JSON.stringify(data));
        setSmaUpdate([...temp]);
        props.passto([...temp]);
    };

    const handleChangeLength = (v) => {
        let temp = [...smaUpdate];
        temp[1]["value"] = v;
        setSmaUpdate(temp);
        props.passto(temp);
    };

    return (
        <div className="inline-flex items-center space-x-1 text-sm text-gray-700 dark:text-gray-100 border rounded-md px-2 py-1 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800">
            <span className="font-medium">{smaUpdate[0]["value"]} (</span>
            
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-6 px-2 py-0 text-sm"
                    >
                        {smaUpdate[1]["value"]}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-2 w-64 space-y-2">
                    <InputInteger
                        value={smaUpdate[1]["value"]}
                        onChange={handleChangeLength}
                        className="h-8 text-sm"
                    />
                    <div className="flex items-center justify-between">
                        <Label className="text-sm">Change Indicator</Label>
                        <SearchDropdown
                            size="icon"
                            valueArray={indicatorData}
                            onChange={changeIndicator}
                        >
                            <Plus size={16} />
                        </SearchDropdown>
                    </div>
                </PopoverContent>
            </Popover>

            <span className="text-sm font-mono">,</span>
            <div className="ml-1">{renderComponent(smaUpdate[2]["value"]["indicator"], onChange)}</div>
            <span className="ml-1">)</span>
        </div>
    );
}
