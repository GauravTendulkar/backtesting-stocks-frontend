import React from 'react'
import { Button } from '../ui/button'

const ArithmeticOperators = ({ arrayPass, passto = () => { } }) => {
  if (arrayPass[0]["value"] == "+" || arrayPass[0]["value"] == "-" || arrayPass[0]["value"] == "*" || arrayPass[0]["value"] == "/") {
    return (
      <Button variant="outline" >{arrayPass[0]["label"]}</Button>
    )
  }

}

export default ArithmeticOperators