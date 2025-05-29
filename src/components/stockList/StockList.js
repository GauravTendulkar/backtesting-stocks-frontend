"use client";

import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { StockListContext } from "@/app/context/StockListContext";

const StockList = () => {
    const { setTheme, theme, systemTheme } = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;
    const { stockData, setStockData, saveStockData } = useContext(StockListContext);
    // const stockData = {
    //     fullStockList: [
    //         "AARTIIND", "ABB", "ABCAPITAL", "ABFRL", "ACC", "ADANIENT",
    //         "ADANIPORTS", "ALKEM", "AMBUJACEM", "APOLLOHOSP", "APOLLOTYRE",
    //         "ASHOKLEY", "ASIANPAINT", "ASTRAL", "ATUL", "AUBANK", "AUROPHARMA",
    //         "AXISBANK", "BAJAJ_AUTO", "BAJAJFINSV", "BAJFINANCE", "BALKRISIND",
    //         "BALRAMCHIN", "BANDHANBNK", "BANKBARODA",
    //     ],
    //     "defaultStockList": [{
    //         "name": "default",
    //         "list": ["AARTIIND",
    //             "ABB",
    //             "ABCAPITAL",
    //             "ABFRL",
    //             "ACC",]
    //     }
    //     ],
    //     customStockList: [
    //         { name: "list 1", list: ["AARTIIND", "ABB", "ABCAPITAL", "ABFRL", "ACC", "ADANIENT", "ADANIPORTS"] },
    //         { name: "list 2", list: ["ATUL", "AUBANK"] },
    //         { name: "list 3", list: ["BALKRISIND", "BALRAMCHIN", "BANDHANBNK", "BANKBARODA"] },
    //     ]
    // };

    const [customLists, setCustomLists] = useState(stockData?.customStockList || []);
    const [newListName, setNewListName] = useState("");
    const [editingList, setEditingList] = useState(null);

    useEffect(() => {

        setCustomLists(stockData?.customStockList || [])
    }, [stockData])

    useEffect(() => {
        if (customLists.length > 0) {

            setStockData({ ...stockData, "customStockList": customLists })

        }
    }, [customLists])

    // Add stock to a custom list
    const addStockToList = (listName, stock) => {
        setCustomLists(prevLists =>
            prevLists.map(list =>
                list.name === listName && !list.list.includes(stock)
                    ? { ...list, list: [...list.list, stock] }
                    : list
            )
        );
    };

    // Remove stock from a custom list
    const removeStockFromList = (listName, stock) => {
        setCustomLists(prevLists =>
            prevLists.map(list =>
                list.name === listName
                    ? { ...list, list: list.list.filter(s => s !== stock) }
                    : list
            )
        );
    };

    // Create a new custom list
    const createNewCustomList = () => {
        if (newListName.trim() && !customLists.some(list => list.name === newListName)) {
            setCustomLists([...customLists, { name: newListName, list: [] }]);
            setNewListName("");
        }
    };

    // Delete a custom list
    const deleteCustomList = (listName) => {
        setCustomLists(prevLists => prevLists.filter(list => list.name !== listName));
    };

    // Edit the list name (Direct Input)
    const handleListNameChange = (event, oldName) => {
        const newName = event.target.value;
        setCustomLists(prevLists =>
            prevLists.map(list => (list.name === oldName ? { ...list, name: newName } : list))
        );
    };

    // Duplicate a custom list
    const duplicateList = (listName) => {
        const listToDuplicate = customLists.find(list => list.name === listName);
        if (listToDuplicate) {
            const newList = { ...listToDuplicate, name: `${listName}_copy` };
            setCustomLists([...customLists, newList]);
        }
    };

    return (
        <div className={`p-4 transition-colors duration-300 ${currentTheme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
            {/* Theme Toggle Button */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Stock List Manager</h2>
                {/* <button
                    onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
                    className="px-4 py-2 rounded border transition-colors duration-300"
                >
                    {currentTheme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
                </button> */}
                <div className="px-4 py-2 rounded border transition-colors duration-300"
                >{stockData && stockData?.customStockList.length}/{stockData && stockData?.stockListLimit}</div>
            </div>

            {/* Create New Custom List */}
            <div className="mb-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Enter list name"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    className={`border p-2 rounded bg-transparent transition-all ${currentTheme === "dark" ? "border-gray-600 text-white" : "border-gray-300 text-black"}`}
                />
                <button onClick={createNewCustomList} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Create List
                </button>
                <button onClick={() => { saveStockData() }} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Save
                </button>
            </div>

            {/* Display Custom Stock Lists */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {customLists.map((customList, index) => (
                    <div key={index} className={`border p-4 rounded shadow-md transition-colors ${currentTheme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}>
                        <div className="flex justify-between items-center">
                            {/* Editable List Name */}
                            <input
                                type="text"
                                value={customList.name}
                                onChange={(e) => handleListNameChange(e, customList.name)}
                                className={`border p-2 rounded w-full bg-transparent transition-all ${currentTheme === "dark" ? "border-gray-600 text-white" : "border-gray-300 text-black"}`}
                            />

                            <div className="flex gap-2">
                                <button onClick={() => duplicateList(customList.name)} className="bg-green-500 text-white px-2 py-1 rounded">
                                    Duplicate
                                </button>
                                <button onClick={() => deleteCustomList(customList.name)} className="bg-red-500 text-white px-3 py-1 rounded">
                                    Delete
                                </button>
                                <div className="px-4 py-2 rounded border transition-colors duration-300"
                                >{customList && customList.list.length}/{stockData && stockData?.stockExecutionListLimit}</div>
                            </div>
                        </div>

                        {/* Scrollable Stock List */}
                        <div className={`mt-2 max-h-60 overflow-y-auto border p-2 rounded transition-all ${currentTheme === "dark" ? "bg-gray-700 border-gray-600" : "bg-gray-100 border-gray-300"}`}>
                            {customList.list.length > 0 ? (
                                customList.list.map(stock => (
                                    <div key={stock} className="flex justify-between items-center p-1">
                                        {stock}
                                        <button onClick={() => removeStockFromList(customList.name, stock)} className="bg-gray-400 text-white px-2 py-1 rounded">
                                            Remove
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No stocks in this list.</p>
                            )}
                        </div>

                        {/* Add Stock Dropdown */}
                        <div className="mt-3">
                            <select onChange={(e) => addStockToList(customList.name, e.target.value)} className={`border p-2 rounded w-full transition-all ${currentTheme === "dark" ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}>
                                <option value="">Add Stock</option>
                                {stockData.fullStockList
                                    .filter(stock => !customList.list.includes(stock))
                                    .map(stock => (
                                        <option key={stock} value={stock}>{stock}</option>
                                    ))}
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StockList;
