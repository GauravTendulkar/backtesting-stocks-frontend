"use client";

import React, { createContext, useEffect, useState } from 'react'


export const EquationContext = createContext([]);

function EquationContextProvider(props) {
  // const [createEquation, setcreateEquation] = useState([{
  //   "AND": [{ "condition": [{ "indicator": [{"value": "=-10", "label":"=-10" },
  //     { "value": 60, "label": "1h" },
  //     {"value": "sma"},
  //     {"value":"close"},
  //     {"value":20}
  //   ] }] },
  //   { "AND": [{ "condition": [{ "indicator": [{"value": "=-10", "label":"=-10" },
  //     { "value": 60, "label": "1h" },
  //     {"value": "sma"},
  //     {"value":"close"},
  //     {"value":20}
  //   ] }] }, { "condition": [{ "indicator": [{"value": "=-10", "label":"=-10" },
  //     { "value": 60, "label": "1h" },
  //     {"value": "sma"},
  //     {"value":"close"},
  //     {"value":20}
  //   ] }] }] }]
  // }
  // ])

  const [copyIndicator, setCopyIndicator] = useState(null);


  let [previousTimeframes, setPreviousTimeframes] = useState([
    { "value": "0", "label": "current candle" },
    { "value": "-1", "label": "1 candle ago" },
    { "value": "-2", "label": "2 candles ago" },
    { "value": "-3", "label": "3 candles ago" },
    { "value": "-n", "label": "n candles ago" },


])
let [previousTimeframesMinutes, setPreviousTimeframesMinutes] = useState([
  { "value": "0", "label": "current candle" },
  { "value": "-1", "label": "1 candle ago" },
  { "value": "-2", "label": "2 candles ago" },
  { "value": "-3", "label": "3 candles ago" },
  { "value": "-n", "label": "n candles ago" },
  
  { "value": "=1", "label": "=1(1st candle of the day)" },
  { "value": "=2", "label": "=2(2nd candle of the day)" },
  { "value": "=3", "label": "=3" },
  { "value": "=n", "label": "nth candle of the day" },

  { "value": "=-1", "label": "=-1(previous days last candle)" },
  { "value": "=-2", "label": "=-2(previous days 2nd last candle)" },
  { "value": "=-3", "label": "=-3" },
  { "value": "=-n", "label": "=-n(previous days nth last candle)" },


])

const ohlc = [
  // Minutes
  { "value": "open" },
  { "value": "high" },
  { "value": "low" },
  { "value": "close" }
]

const timeframe = [
  // Minutes
  { "value": 1, "label": "1min" },
  { "value": 2, "label": "2min" },
  { "value": 3, "label": "3min" },
  { "value": 5, "label": "5min" },
  { "value": 10, "label": "10min" },
  { "value": 15, "label": "15min" },
  { "value": 30, "label": "30min" },

  // Hours
  { "value": 60, "label": "1h" },
  { "value": 120, "label": "2h" },
  { "value": 180, "label": "3h" },
  { "value": 240, "label": "4h" },

  // Daily
  { "value": 1440, "label": "Daily" },  // 1 day (24 hours)

  // Weekly
  { "value": 10080, "label": "Weekly" },  // 7 days

  // Monthly
  { "value": 43200, "label": "Monthly" },  // 30 days
];


  // useEffect(() => {
  //   console.log("createEquation")
  //   console.log(createEquation)
  // }, [createEquation]);




  return (
    <EquationContext.Provider value={{ copyIndicator, setCopyIndicator, previousTimeframes,setPreviousTimeframes,  previousTimeframesMinutes,setPreviousTimeframesMinutes ,timeframe ,ohlc }}>
      {props.children}

    </EquationContext.Provider>
  )
}

export default EquationContextProvider   