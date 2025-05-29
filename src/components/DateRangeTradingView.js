"use client"
import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState('2023-12-15 14:45');
  const [endDate, setEndDate] = useState('2024-01-09 10:15');
  const [currentMonth, setCurrentMonth] = useState(new Date(2023, 11)); // December 2023

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const weeks = [];
  while (days.length) weeks.push(days.splice(0, 7));

  return (
    <div className="bg-gray-900 text-gray-300 p-4 rounded-lg shadow-xl w-80">
      {/* Header with date inputs */}
      <div className="mb-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">From</label>
            <input
              type="text"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">To</label>
            <input
              type="text"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="mb-4">
        <div className="text-center font-medium text-sm mb-4">
          {format(currentMonth, 'MMMM yyyy')}
        </div>
        
        <table className="w-full">
          <thead>
            <tr>
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
                <th key={day} className="text-gray-500 text-xs font-normal py-1">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((day, dayIndex) => {
                  const isOtherMonth = !isSameMonth(day, currentMonth);
                  const isSelected = isSameDay(day, new Date(2023, 11, 15)); // Example selected date
                  
                  return (
                    <td
                      key={dayIndex}
                      className={`
                        text-center text-sm p-1
                        ${isOtherMonth ? 'text-gray-600' : 'hover:bg-gray-800 cursor-pointer'}
                        ${isSelected ? 'bg-blue-600 text-white rounded' : ''}
                      `}
                    >
                      {format(day, 'd')}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer buttons */}
      <div className="flex justify-end gap-2">
        <button className="px-4 py-2 text-gray-500 hover:bg-gray-800 rounded-md text-sm">
          Cancel
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
          Go to
        </button>
      </div>
    </div>
  );
};

export default DateRangePicker;