import { useRef, useState, useMemo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

const ROW_HEIGHT = 48;
const columns = [
  { key: "stock", label: "Stock" },
  { key: "buysell", label: "Type" },
  { key: "entry_date", label: "Entry Date" },
  { key: "entry_time", label: "Entry Time" },
  { key: "entry", label: "Entry Price" },
  { key: "exit_date", label: "Exit Date" },
  { key: "exit_time", label: "Exit Time" },
  { key: "exit", label: "Exit Price" },
  { key: "quantity", label: "Quantity" },
  { key: "pnl", label: "PNL" },
  { key: "sl", label: "SL Type" },
];

export default function TradeTable({ data }) {
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const sortedData = useMemo(() => {
    const sortable = [...data];
    if (sortConfig.key) {
      sortable.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (typeof aVal === "number" && typeof bVal === "number")
          return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
        if (typeof aVal === "string" && typeof bVal === "string")
          return sortConfig.direction === "asc"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        return 0;
      });
    }
    return sortable;
  }, [data, sortConfig]);

  const parentRef = useRef(null);
  const rowVirtualizer = useVirtualizer({
    count: sortedData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 8,
  });

  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">Trade History</h2>
      <div
        ref={parentRef}
        className="overflow-auto"
        style={{ maxHeight: 550, width: "100%", position: "relative" }}
      >
        <Table style={{ width: "100%" }}>
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-gray-800">
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  onClick={() =>
                    setSortConfig((prev) =>
                      prev.key === col.key
                        ? { key: col.key, direction: prev.direction === "asc" ? "desc" : "asc" }
                        : { key: col.key, direction: "asc" }
                    )
                  }
                  className="cursor-pointer"
                  style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 2,
                    background: "inherit",
                    // You can set background specifically if needed: background: 'white'
                  }}
                >
                  {col.label}
                  {sortConfig.key === col.key
                    ? sortConfig.direction === "asc"
                      ? " ↑"
                      : " ↓"
                    : ""}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Top Spacer */}
            {rowVirtualizer.getVirtualItems().length > 0 && (
              <TableRow style={{ height: rowVirtualizer.getVirtualItems()[0].start }}>
                <TableCell colSpan={columns.length} style={{ padding: 0, border: "none" }} />
              </TableRow>
            )}
            {/* Virtual rows */}
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const trade = sortedData[virtualRow.index];
              return (
                <TableRow key={virtualRow.index} style={{ height: ROW_HEIGHT }}>
                  <TableCell>{trade.stock}</TableCell>
                  <TableCell className="capitalize">{trade.buysell}</TableCell>
                  <TableCell>{trade.entry_date}</TableCell>
                  <TableCell>{trade.entry_time}</TableCell>
                  <TableCell>{Number(trade.entry).toFixed(2)}</TableCell>
                  <TableCell>{trade.exit_date}</TableCell>
                  <TableCell>{trade.exit_time}</TableCell>
                  <TableCell>{Number(trade.exit).toFixed(2)}</TableCell>
                  <TableCell>{trade.quantity}</TableCell>
                  <TableCell
                    className={
                      trade.pnl >= 0
                        ? "text-green-500 font-semibold"
                        : "text-red-500 font-semibold"
                    }
                  >
                    {Number(trade.pnl).toFixed(2)}
                  </TableCell>
                  <TableCell>{trade.sl}</TableCell>
                </TableRow>
              );
            })}
            {/* Bottom spacer */}
            {rowVirtualizer.getVirtualItems().length > 0 && (
              <TableRow
                style={{
                  height:
                    rowVirtualizer.getTotalSize() -
                    (rowVirtualizer.getVirtualItems()[0].start +
                      rowVirtualizer.getVirtualItems().length * ROW_HEIGHT),
                }}
              >
                <TableCell colSpan={columns.length} style={{ padding: 0, border: "none" }} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}







// "use client";
// import React, { useState, useMemo } from "react";
// import {
//     Table,
//     TableHeader,
//     TableBody,
//     TableRow,
//     TableHead,
//     TableCell,
// } from "@/components/ui/table";
// import { Card } from "@/components/ui/card";

// const TradeTable = ({ data }) => {
//     // sortConfig holds the key we are sorting by and the direction ("asc" or "desc")
//     const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

//     // When a header is clicked, update the sort config.
//     const handleSort = (key) => {
//         setSortConfig((prevConfig) => {
//             if (prevConfig.key === key) {
//                 // Toggle sort direction if the same key is clicked
//                 return { key, direction: prevConfig.direction === "asc" ? "desc" : "asc" };
//             }
//             return { key, direction: "asc" };
//         });
//     };

//     // Memoize the sorted data so that it only recalculates when data or sortConfig changes.
//     const sortedData = useMemo(() => {
//         const sortableItems = [...data];
//         if (sortConfig.key) {
//             sortableItems.sort((a, b) => {
//                 let aVal = a[sortConfig.key];
//                 let bVal = b[sortConfig.key];

//                 // If both values are numbers, subtract
//                 if (typeof aVal === "number" && typeof bVal === "number") {
//                     return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
//                 }
//                 // If both values are strings, compare them case-insensitively
//                 if (typeof aVal === "string" && typeof bVal === "string") {
//                     return sortConfig.direction === "asc"
//                         ? aVal.localeCompare(bVal)
//                         : bVal.localeCompare(aVal);
//                 }
//                 return 0;
//             });
//         }
//         return sortableItems;
//     }, [data, sortConfig]);

//     // Helper function to show sort indicator for each column
//     const getSortIndicator = (key) => {
//         if (sortConfig.key === key) {
//             return sortConfig.direction === "asc" ? " ↑" : " ↓";
//         }
//         return "";
//     };

//     return (
//         <Card className="p-4">
//             <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
//                 Trade History
//             </h2>
//             <div className="overflow-x-auto">
//                 <Table>
//                     <TableHeader>
//                         <TableRow className="bg-gray-100 dark:bg-gray-800">
//                             <TableHead onClick={() => handleSort("stock")} className="cursor-pointer">
//                                 Stock{getSortIndicator("stock")}
//                             </TableHead>
//                             <TableHead onClick={() => handleSort("buysell")} className="cursor-pointer">
//                                 Type{getSortIndicator("buysell")}
//                             </TableHead>
//                             <TableHead onClick={() => handleSort("date")} className="cursor-pointer">
//                                 Entry Date{getSortIndicator("date")}
//                             </TableHead>
//                             <TableHead onClick={() => handleSort("entryTime")} className="cursor-pointer">
//                                 Entry Time{getSortIndicator("entryTime")}
//                             </TableHead>
//                             <TableHead onClick={() => handleSort("entry")} className="cursor-pointer">
//                                 Entry Price{getSortIndicator("entry")}
//                             </TableHead>
//                             <TableHead onClick={() => handleSort("exit_date")} className="cursor-pointer">
//                                 Exit Date{getSortIndicator("exit_date")}
//                             </TableHead>
//                             <TableHead onClick={() => handleSort("exitTime")} className="cursor-pointer">
//                                 Exit Time{getSortIndicator("exitTime")}
//                             </TableHead>
//                             <TableHead onClick={() => handleSort("exit")} className="cursor-pointer">
//                                 Exit Price{getSortIndicator("exit")}
//                             </TableHead>
//                             <TableHead onClick={() => handleSort("quantity")} className="cursor-pointer">
//                                 Quantity{getSortIndicator("quantity")}
//                             </TableHead>
//                             <TableHead onClick={() => handleSort("pnl")} className="cursor-pointer">
//                                 PNL{getSortIndicator("pnl")}
//                             </TableHead>
//                             <TableHead onClick={() => handleSort("sl")} className="cursor-pointer">
//                                 SL Type{getSortIndicator("sl")}
//                             </TableHead>
//                         </TableRow>
//                     </TableHeader>

//                     <TableBody>
//                         {sortedData.map((trade, index) => (
//                             <TableRow key={index} className="border-b border-gray-200 dark:border-gray-700">
//                                 <TableCell>{trade.stock}</TableCell>
//                                 <TableCell className="capitalize">{trade.buysell}</TableCell>
//                                 <TableCell>{trade.date}</TableCell>
//                                 <TableCell>{trade.entryTime}</TableCell>
//                                 <TableCell>{trade.entry.toFixed(2)}</TableCell>
//                                 <TableCell>{trade.exit_date}</TableCell>
//                                 <TableCell>{trade.exitTime}</TableCell>
//                                 <TableCell>{trade.exit.toFixed(2)}</TableCell>
//                                 <TableCell>{trade.quantity}</TableCell>
//                                 <TableCell
//                                     className={
//                                         trade.pnl >= 0 ? "text-green-500 font-semibold" : "text-red-500 font-semibold"
//                                     }
//                                 >
//                                     {trade.pnl.toFixed(2)}
//                                 </TableCell>
//                                 <TableCell>{trade.sl}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </div>
//         </Card>
//     );
// };

// export default TradeTable;
