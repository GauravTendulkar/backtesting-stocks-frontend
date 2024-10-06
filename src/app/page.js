"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button"
import { useContext } from "react";
import { EquationContext } from "./context/EquationContext";

export default function Home() {

  const {createEquation, setcreateEquation} = useContext(EquationContext);
  return (
    
      <>
      <div>Hello World</div>
      <Button>Button</Button>
      {/* {console.log(createEquation)} */}
      
      </>
  );
}
