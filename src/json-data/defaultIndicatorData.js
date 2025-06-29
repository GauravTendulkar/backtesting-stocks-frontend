
const arithmeticOperators = [
  {
    value: [{ "value": "+", "label": "+" }],
    label: "Add(+)",
    search: ["+", "Add"]
  },
  {
    value: [{ "value": "-", "label": "-" }],
    label: "Subtract(-)",
    search: ["-", "Subtract"]
  },
  {
    value: [{ "value": "*", "label": "X" }],
    label: "Multiply(*)",
    search: ["*", "Multiply", "X"]
  },
  {
    value: [{ "value": "/", "label": "/" }],
    label: "Divide(/)",
    search: ["/", "Divide"]
  },

]

const logicalOperators = [
  {
    value: [{ "value": "<", "label": "<" }],
    label: "<",
    "search": ["<"]

  },
  {
    value: [{ "value": ">", "label": ">" }],
    label: ">",
    "search": [">"]
  },
  {
    value: [{ "value": "<=", "label": "<=" }],
    label: "<=",
    "search": ["<="]
  },
  {
    value: [{ "value": ">=", "label": ">=" }],
    label: ">=",
    "search": [">="]
  },
  {
    value: [{ "value": "!=", "label": "!=" }],
    label: "!=",
    "search": ["!="]
  },
  {
    value: [{ "value": "==", "label": "==" }],
    label: "==",
    "search": ["=="]
  },
]

const indicatorFunction = [

  {
    value: [{ "value": "ceil", "label": "Ceil" },
    {
      "value": {
        "indicator": [{ "value": "number", "label": "Number" },
        { "value": 20, "label": 20 }]
      }
    }
    ],
    label: "Ceil",
    "search": ["Ceil"]
  },
  {
    value: [{ "value": "floor", "label": "Floor" },
    {
      "value": {
        "indicator": [{ "value": "number", "label": "Number" },
        { "value": 20, "label": 20 }]
      }
    }
    ],
    label: "Floor",
    "search": ["Floor"]
  },
  {
    value: [{ "value": "abs", "label": "Abs" },
    {
      "value": {
        "indicator": [{ "value": "number", "label": "Number" },
        { "value": 20, "label": 20 }]
      }
    }
    ],
    label: "Abs",
    "search": ["Abs"]
  },
  {
    value: [{ "value": "log10", "label": "log10" },
    {
      "value": {
        "indicator": [{ "value": "number", "label": "Number" },
        { "value": 20, "label": 20 }]
      }
    }
    ],
    label: "log10",
    "search": ["log10"]
  },
  {
    value: [{ "value": "log", "label": "log" },
    {
      "value": {
        "indicator": [{ "value": "number", "label": "Number" },
        { "value": 20, "label": 20 }]
      }
    }
    ],
    label: "log",
    "search": ["log"]
  },
  {
    value: [{ "value": "max", "label": "Max" },
    { "value": "20" },

    {
      "value": {
        "indicator": [{ "value": "0", "label": "current candle" },
        { "value": "Daily", "label": "Daily" },
        { "value": "close", "label": "CLOSE" },
        ]
      }
    }
    ],
    label: "Max",
    "search": ["Max"]
  },
  {
    value: [{ "value": "min", "label": "Min" },
    { "value": "20" },

    {
      "value": {
        "indicator": [{ "value": "0", "label": "current candle" },
        { "value": "Daily", "label": "Daily" },
        { "value": "close", "label": "CLOSE" },
        ]
      }
    }
    ],
    label: "Min",
    "search": ["Min"]
  }
]

const indicatorData = [
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "sma" },
    { "value": "close" },
    { "value": 9 }
    ],
    label: "Simple Moving Average",
    "search": ["sma", "Simple Moving Average"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "ema" },
    { "value": "close" },
    { "value": 9 }
    ],
    label: "Exponential Moving Average",
    "search": ["ema", "Exponential Moving Average"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "rsi" },
    { "value": "close" },
    { "value": 14 }
    ],
    label: "Relative Strength Index (RSI)",
    "search": ["rsi", "Relative Strength Index"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "BBbasis" },
    { "value": 20 },
    { "value": "sma" },
    { "value": "close" },
    { "value": 2 }
    ],
    label: "Basis (BB)",
    "search": ["BB", "Bollinger Bands", "Middle BB", "Middle Bollinger Bands"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "BBupper" },
    { "value": 20 },
    { "value": "sma" },
    { "value": "close" },
    { "value": 2 }
    ],
    label: "Upper (BB)",
    "search": ["BB", "Bollinger Bands", "Upper BB", "Upper Bollinger Bands"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "BBlower" },
    { "value": 20 },
    { "value": "sma" },
    { "value": "close" },
    { "value": 2 }
    ],
    label: "Lower (BB)",
    "search": ["BB", "Bollinger Bands", "Lower BB", "Lower Bollinger Bands"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "macdLine", "label": "Macd Line" },
    { "value": 12 },
    { "value": 26 },
    { "value": 9 },
    { "value": "close" },

    ],
    label: "Macd line",
    "search": ["MACD", "Moving Average Convergence Divergence, Macd line"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "signalLine", "label": "Signal Line" },
    { "value": 12 },
    { "value": 26 },
    { "value": 9 },
    { "value": "close" },

    ],
    label: "Macd Signal line",
    "search": ["MACD", "Moving Average Convergence Divergence", "Macd Signal line"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "macdHistogram", "label": "Macd Histogram" },
    { "value": 12 },
    { "value": 26 },
    { "value": 9 },
    { "value": "close" },

    ],
    label: "Macd histogram",
    "search": ["MACD", "Moving Average Convergence Divergence", "Macd histogram"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "supertrend", "label": "Supertrend" },
    { "value": 10 },
    { "value": 3 },


    ],
    label: "Supertrend",
    "search": ["Supertrend", "Super Trend",]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "H1", "label": "H1" },
    ],
    label: "Camarilla H1",
    "search": ["H1", "Camarilla"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "H2", "label": "H2" },
    ],
    label: "Camarilla H2",
    "search": ["H2", "Camarilla"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "H3", "label": "H3" },
    ],
    label: "Camarilla H3",
    "search": ["H3", "Camarilla"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "H4", "label": "H4" },
    ],
    label: "Camarilla H4",
    "search": ["H4", "Camarilla"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "L1", "label": "L1" },
    ],
    label: "Camarilla L1",
    "search": ["L1", "Camarilla"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "L2", "label": "L2" },
    ],
    label: "Camarilla L2",
    "search": ["L2", "Camarilla"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "L3", "label": "L3" },
    ],
    label: "Camarilla L3",
    "search": ["L3", "Camarilla"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "L4", "label": "L4" },
    ],
    label: "Camarilla L4",
    "search": ["L4", "Camarilla"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "high", "label": "HIGH" },
    ],
    label: "HIGH",
    "search": ["high"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "low", "label": "LOW" },
    ],
    label: "LOW",
    "search": ["low"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "open", "label": "OPEN" },
    ],
    label: "OPEN",
    "search": ["open"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "close", "label": "CLOSE" },
    ],
    label: "CLOSE",
    "search": ["close"]
  },

  {
    value: [{ "value": "number", "label": "Number" },
    { "value": 20, "label": 20 }],
    label: "Number",
    "search": ["Number"]
  },
  {
    value: [{ "value": "entry", "label": "Entry" }],
    label: "Entry",
    "search": ["Entry"]
  },
  {
    value: [{ "value": "countPrevTrades", "label": "Prev Trade Count" }],
    label: "Prev Trade Count",
    "search": ["Prev Trade Count"]
  },
  {
    value: [{ "value": "time", "label": "Time" }],
    label: "Time",
    "search": ["Time"]
  },

  {
    value: [{ "value": "(", "label": "(" }],
    label: "(",
    search: ["("]
  },
  {
    value: [{ "value": ")", "label": ")" }],
    label: ")",
    search: [")"]
  },
  ...arithmeticOperators,
  ...logicalOperators,
  ...indicatorFunction

]


export { indicatorData, arithmeticOperators, logicalOperators } 