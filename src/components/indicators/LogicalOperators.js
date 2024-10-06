
"use client";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";


export default function LogicalOperators(props){

    const [logicalOperatorsUpdate, setLogicalOperatorsUpdate] = useState(props.arrayPass);

    useEffect(()=>{
        setLogicalOperatorsUpdate(props.arrayPass)
    },[props.arrayPass]);


    return(
        <>
        <Button variant="outline" className={"font-bold"} >{logicalOperatorsUpdate[0]["value"]}</Button>

        </>
    );
}