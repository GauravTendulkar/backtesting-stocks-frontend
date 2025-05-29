"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button"
import { useContext } from "react";
import { EquationContext } from "./context/EquationContext";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ClipboardCopy, X } from "lucide-react";
import ButtonEnableAfterInterval from "@/components/buttons/ButtonEnableAfterInterval";
import { ValidateAccessTokenContext } from "./context/ValidateAccessTokenContext";
import { DateRangePickerTradingView } from "@/components/DateRangePickerTradingView";
import DateRangePicker from "@/components/DateRangeTradingView";

export default function Home() {

  const { createEquation, setcreateEquation } = useContext(EquationContext);

  const { isTokenValid, checktokenValidaty } = useContext(ValidateAccessTokenContext);
  return (

    <>

      {/* <div className="bg-card text-card-foreground border shadow w-auto h-52 "> */}
      <Card className={"mx-auto w-max"}>
        <h1 className="px-4 mt-3 mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome to this World
        </h1>
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <div className="p-5 mx-5 my-2 bg-card text-card-foreground border shadow w-max">
          <div>Hello World</div>

          <div className={"mt-10 relative  w-max "}>
            <button className="rounded-full  absolute -top-2.5 -left-2" variant="outline"><ClipboardCopy /></button>


            <button className="rounded-full  absolute -top-2.5 -right-1.5 " variant="outline"> <X /></button>

            <Button size={"lg"} className='w-52' variant="outline">Button</Button>
          </div>

          {/* <button className="p-2  bg-primary text-primary-foreground shadow hover:bg-primary/90">Click Me</button>   */}
        </div>
        {/* border-2 border-black */}
        {/* {console.log(createEquation)} */}
      </Card>

      <ButtonEnableAfterInterval noOfIntervals={10}>Quick Save</ButtonEnableAfterInterval>

      <Button onClick={() => { checktokenValidaty() }}>{console.log(isTokenValid)}</Button>
      {/* <div></div> */}

      <div className="h-36">

        Hellow
      </div>
      <DateRangePickerTradingView
        dateRange={
          {
            "from": new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
            "to": new Date().toISOString().split('T')[0]
          }
        }
        getDateRange={(newRange) => console.log(newRange)}
      />

      {/* <DateRangePicker></DateRangePicker> */}

      <input
        type="date"
        className="p-2 border rounded"

      />

      <div>{process.env.NEXT_PUBLIC_VAR}</div>


    </>
  );
}
