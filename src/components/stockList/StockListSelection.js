"use client";

import { StockListContext } from "@/app/context/StockListContext";
import React, { memo, useContext, useEffect, useState } from "react";

const StockListSelection = memo(({ valueList = "default", onChangeList }) => {
    const { stockData } = useContext(StockListContext);

    // Array of objects where each object has { name, list }
    const [stockLists, setStockLists] = useState([]);
    const [selectedListName, setSelectedListName] = useState(valueList);
    const [selectedList, setSelectedList] = useState([]);

    useEffect(() => {
        // console.log("selectedListName", selectedListName)
    }, [selectedListName])

    // Build combined stock lists from context data
    useEffect(() => {
        if (stockData) {
            let combinedLists = [];
            // Convert defaultStockList (array of strings) into an object
            combinedLists.push(...stockData.defaultStockList);
            // Assume customStockList is already an array of objects with { name, list }
            if (stockData.customStockList) {
                combinedLists = combinedLists.concat(stockData.customStockList);
            }
            setStockLists(combinedLists);
        }
    }, [stockData]);

    // Update selectedList when stockLists or selectedListName changes
    useEffect(() => {
        const tempList = stockLists.find(
            (list) => list.name === selectedListName
        );
        if (tempList) {
            setSelectedList(tempList.list);
            if (onChangeList) onChangeList(tempList);
        } else {
            // Fallback to the default list if selectedListName isn't found
            const defaultList = stockLists.find((list) => list.name === "default");
            if (defaultList) {
                setSelectedList(defaultList.list);
                if (onChangeList) onChangeList(defaultList);
            } else {
                setSelectedList([]);
                if (onChangeList) onChangeList({});
            }
        }


    }, [stockLists, selectedListName, onChangeList]);

    const handleSelectChange = (e) => {
        setSelectedListName(e.target.value);
    };

    return (
        <div className="p-4">
            <label htmlFor="stockListSelector" className="mr-2 font-medium">
                Select Stock List:
            </label>
            {/* {console.log("selectedListName", selectedListName)} */}
            <select
                id="stockListSelector"
                value={selectedListName}
                onChange={handleSelectChange}
                className="p-2 border rounded"
            >
                {stockLists.map((list, index) => (
                    <option key={index} value={list.name}>
                        {list.name}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default StockListSelection;
