"use client" 
import { Skeleton } from "@/components/ui/skeleton"


export default function Loading(){

return(<>
<div className="p-4">
<div className="space-y-4 p-4">
      {/* Skeleton for the header */}
      <div className="h-8 bg-gray-200 rounded-md animate-pulse"></div>

      {/* Skeleton for body sections */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded-md animate-pulse"></div>
      </div>

      {/* Skeleton for buttons */}
      <div className="flex space-x-2">
        <div className="h-10 w-24 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-10 w-24 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
    </div>
    </div>
</>);
}