"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format, subMonths, subYears } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function DateRangePickerTradingView({ className, dateRange, getDateRange }) {
    const [tempDate, setTempDate] = React.useState({
        from: dateRange?.from ? new Date(dateRange.from) : null,
        to: dateRange?.to ? new Date(dateRange.to) : null
    })

    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
    const [inputError, setInputError] = React.useState(null)

    // Use a ref to track whether the date range has been initialized
    const isInitialized = React.useRef(false)

    // Dynamically update the date range whenever tempDate changes
    React.useEffect(() => {
        if (!isInitialized.current) {
            // Skip the first render to avoid unnecessary updates
            isInitialized.current = true
            return
        }

        if (tempDate.from && tempDate.to) {
            if (tempDate.from > tempDate.to) {
                setInputError("Start date cannot be greater than end date")
                return
            }
            setInputError(null)
            getDateRange({
                from: format(tempDate.from, "yyyy-MM-dd"),
                to: format(tempDate.to, "yyyy-MM-dd")
            })
        }
    }, [tempDate]) // Only trigger when tempDate changes

    const setPredefinedRange = (range) => {
        let today = new Date(tempDate.to || new Date()) // Use current date if tempDate.to is null
        let fromDate

        switch (range) {
            case '1m':
                fromDate = subMonths(today, 1)
                break
            case '3m':
                fromDate = subMonths(today, 3)
                break
            case '6m':
                fromDate = subMonths(today, 6)
                break
            case '1y':
                fromDate = subYears(today, 1)
                break
            case '3y':
                fromDate = subYears(today, 3)
                break
            case '5y':
                fromDate = subYears(today, 5)
                break
            default:
                fromDate = today
        }

        setTempDate({
            from: fromDate,
            to: today
        })
    }

    const setToDateRange = (range) => {
        let today = new Date(tempDate.to || new Date()) // Use current date if tempDate.to is null
        switch (range) {

            case 'today':
                today = new Date()
                break
            case '-1y':
                today = subYears(today, -1)
                break
            case '1y':
                today = subYears(today, 1)
                break
            case '-1m':
                today = subMonths(today, -1)
                break
            case '1m':
                today = subMonths(today, 1)
                break

            default:
                today = new Date(tempDate.to || new Date())
        }

        setTempDate({
            ...tempDate,
            to: today
        })
    }


    return (
        <Popover open={isPopoverOpen} onOpenChange={(open) => {
            if (open) setTempDate({
                from: dateRange?.from ? new Date(dateRange.from) : null,
                to: dateRange?.to ? new Date(dateRange.to) : null
            })
            setIsPopoverOpen(open)
            setInputError(null)
        }}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "h-8 justify-start text-left font-normal",
                        !dateRange && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from && dateRange?.to ? (
                        `${format(new Date(dateRange.from), "MMM dd, y")} - ${format(new Date(dateRange.to), "MMM dd, y")}`
                    ) : (
                        "Go to Custom Range"
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
                <div className="flex flex-col bg-background p-4">
                    <h3 className="text-lg font-semibold mb-4">Custom Range</h3>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                        <Button variant="outline" onClick={() => setPredefinedRange('1m')}>1M</Button>
                        <Button variant="outline" onClick={() => setPredefinedRange('3m')}>3M</Button>
                        <Button variant="outline" onClick={() => setPredefinedRange('6m')}>6M</Button>
                        <Button variant="outline" onClick={() => setPredefinedRange('1y')}>1Y</Button>
                        <Button variant="outline" onClick={() => setPredefinedRange('3y')}>3Y</Button>
                        <Button variant="outline" onClick={() => setPredefinedRange('5y')}>5Y</Button>
                    </div>


                    <div className="flex-col gap-4 mb-4">
                        <div className="flex flex-col">
                            <label className="text-sm mb-1">From</label>
                            <input
                                type="date"
                                className="p-2 border rounded"
                                value={tempDate.from ? format(tempDate.from, 'yyyy-MM-dd') : ''}
                                onChange={(e) => setTempDate(prev => ({
                                    ...prev,
                                    from: e.target.value ? new Date(e.target.value) : null
                                }))}
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-2 my-4">
                            <Button variant="outline" onClick={() => setToDateRange('today')}>Today</Button>
                            <Button variant="outline" onClick={() => setToDateRange('1y')}>{"< Y"}</Button>
                            <Button variant="outline" onClick={() => setToDateRange('-1y')}>{"Y >"}</Button>
                            <Button variant="outline" onClick={() => setToDateRange('1m')}>{"< M"}</Button>
                            <Button variant="outline" onClick={() => setToDateRange('-1m')}>{"M >"}</Button>
                        </div>


                        <div className="flex flex-col">
                            <label className="text-sm mb-1">To</label>
                            <input
                                type="date"
                                className="p-2 border rounded"
                                value={tempDate.to ? format(tempDate.to, 'yyyy-MM-dd') : ''}
                                onChange={(e) => setTempDate(prev => ({
                                    ...prev,
                                    to: e.target.value ? new Date(e.target.value) : null
                                }))}
                            />
                        </div>
                    </div>

                    {inputError && (
                        <div className="text-red-500 text-sm mt-2">{inputError}</div>
                    )}

                    <div className="flex justify-end gap-2 mt-4">
                        <Button
                            variant="outline"
                            onClick={() => setIsPopoverOpen(false)}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}