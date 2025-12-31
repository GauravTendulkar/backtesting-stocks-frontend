"use client"
import React, { useEffect, useState } from 'react'
import InputInteger from '../InputInteger'

const DateRangeDisplay = ({ value = [], onChange }) => {
    const [data, setData] = useState(value)

    const handleChange = (value, index, dateKey) => {
        const temp = [...data]
        temp[index]["range"][dateKey] = value
        setData(temp)
        onChange(temp)
    }

    useEffect(() => {
        setData(value)
    }, [value])

    return (
        <div className="space-y-2">
            {data.map((e, i) => (
                <div key={i} className="grid grid-cols-6 items-center gap-2 bg-slate-300 p-2 rounded">
                    <div className="font-medium">TF:</div>
                    <div>{e["tf"]}</div>
                    <InputInteger onChange={(val) => handleChange(val, i, "years")} value={e["range"]["years"]} />
                    <InputInteger onChange={(val) => handleChange(val, i, "months")} value={e["range"]["months"]} />
                    <InputInteger onChange={(val) => handleChange(val, i, "days")} value={e["range"]["days"]} />
                </div>
            ))}
        </div>
    )
}

export default DateRangeDisplay
