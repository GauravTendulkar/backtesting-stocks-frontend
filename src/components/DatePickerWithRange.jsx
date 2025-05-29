"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
// import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerWithRange({
  className, dateRange, getDateRange
}) {
  const [date, setDate] = React.useState(() => {
    if (dateRange == undefined) {
      return dateRange
    }
    else {

      return { "from": (dateRange.from == undefined) ? undefined : new Date(dateRange.from), "to": (dateRange.to == undefined) ? undefined : new Date(dateRange.to) }
    }
  });
  const [error, setError] = React.useState(false)



  React.useEffect(() => {
    // setDate({ "from": new Date(dateRange.from), "to": new Date(dateRange.to) })


    if (dateRange == undefined) {
      setDate(dateRange)
    }
    else {

      setDate({ "from": (dateRange.from == undefined) ? undefined : new Date(dateRange.from), "to": (dateRange.to == undefined) ? undefined : new Date(dateRange.to) })
    }

  }, [dateRange]);

  React.useEffect(() => {
    if (date == undefined){
      setError(true)
    }
    else{
      if (date.from == undefined || date.to == undefined){
        setError(true)
      }
      else{
        setError(false)
      }
    }
  }, [date]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {!error &&<div>{date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}</div>}
            {error && <div className="text-red-500">Error:Please select a date range</div>}
          </Button>
          
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(value) => {


              setDate(value);
              if (value === undefined) {
                getDateRange(undefined)

              }
              else {


                getDateRange({
                  "from": (value.from == undefined) ? undefined : format(value.from, "yyyy-MM-dd"),
                  "to": (value.to == undefined) ? undefined : format(value.to, "yyyy-MM-dd")
                })

              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
