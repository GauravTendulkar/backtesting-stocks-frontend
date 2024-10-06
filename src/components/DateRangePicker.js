"use client";
import React, { useEffect, useState } from 'react'

const DateRangePicker = (props) => {

    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

    

    useEffect(() => {
        console.log(endDate);
        props.getDateRange({"startDate": startDate , "endDate": endDate })
    }, [endDate, startDate]);

    const handleStartDateChange = (e) => {
        console.log(e.target.value)
        setStartDate(e.target.value)
        props.getDateRange({"startDate": e.target.value})
    }

    const handleEndDateChange = (e) => {
        console.log(e.target.value)
        setEndDate(e.target.value)
        props.getDateRange({"endDate": e.target.value})
    }

    return (
        <>
            <div className='grid grid-rows-2 grid-cols-2 w-max'>
                
                    <label className='grow-0 shrink-0'>Start Date :- </label>
                    <input type='date' required className='border-2 border-black grow-0 shrink-0' value={startDate} onChange={handleStartDateChange}></input>
                
                    <label className='grow-0 shrink-0'>End Date :- </label>
                    <input type='date' required className='border-2 border-black grow-0 shrink-0' value={endDate} onChange={handleEndDateChange}></input>
                
            </div >



        </>
    )
}

export default DateRangePicker