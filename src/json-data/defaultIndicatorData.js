
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
    { "value": "atr", "label": "ATR" },
    { "value": 14 },
    { "value": "RMA" },


    ],
    label: "ATR",
    "search": ["ATR"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "conversionLineIC", "label": "Conversion Line(IC)" },
    { "value": 9 },
    { "value": 26 },
    { "value": 52 },
    { "value": 26 },
    ],
    label: "conversion Line (Ichimoku Cloud)",
    "search": ["conversion line", "Ichimoku Cloud", "IC"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "baseLineIC", "label": "Base Line(IC)" },
    { "value": 9 },
    { "value": 26 },
    { "value": 52 },
    { "value": 26 },
    ],
    label: "Base Line (Ichimoku Cloud)",
    "search": ["Base Line", "Ichimoku Cloud", "IC"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "laggingLineIC", "label": "Lagging Line(IC)" },
    { "value": 9 },
    { "value": 26 },
    { "value": 52 },
    { "value": 26 },
    ],
    label: "Lagging Line (Ichimoku Cloud)",
    "search": ["Lagging Line", "Ichimoku Cloud", "IC"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "leadingSpanAIC", "label": "Leading Span A(IC)" },
    { "value": 9 },
    { "value": 26 },
    { "value": 52 },
    { "value": 26 },
    ],
    label: "Leading Span A (Ichimoku Cloud)",
    "search": ["Leading Span A", "Ichimoku Cloud", "IC"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "leadingSpanBIC", "label": "Leading Span B(IC)" },
    { "value": 9 },
    { "value": 26 },
    { "value": 52 },
    { "value": 26 },
    ],
    label: "Leading Span B (Ichimoku Cloud)",
    "search": ["Leading Span B", "Ichimoku Cloud", "IC"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "momentum", "label": "Momentum" },
    { "value": 10 },
    { "value": "close" }
    ],
    label: "Momentum",
    "search": ["momentum"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "roc", "label": "ROC" },
    { "value": 10 },
    { "value": "close" }
    ],
    label: "ROC (Rate of change)",
    "search": ["roc", "Rate of change"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "cci", "label": "CCI" },
    { "value": 20 },
    { "value": "hlc" }
    ],
    label: "CCI (Commodity Channel Index)",
    "search": ["cci", "Commodity Channel Index"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "williamsPercentR", "label": "williams %R" },
    { "value": 20 },
    { "value": "close" }
    ],
    label: "williams %R",
    "search": ["williams %Ri", "%", "Percent", "R"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "cmo", "label": "CMO" },
    { "value": 14 },
    { "value": "close" }
    ],
    label: "CMO (Chande Momentum Oscillator)",
    "search": ["CMO", "Chande Momentum Oscillator"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "cmf", "label": "CMF" },
    { "value": 20 }
    ],
    label: "CMF (Chaikin Money Flow)",
    "search": ["CMF", "Chaikin Money Flow"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "donchianUpper", "label": "Donchian Upper" },
    { "value": 20 }
    ],
    label: "Donchian Upper",
    "search": ["Donchian Upper", "Donchian Channels"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "donchianLower", "label": "Donchian Lower" },
    { "value": 20 }
    ],
    label: "Donchian Lower",
    "search": ["Donchian Lower", "Donchian Channels"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "donchianMiddle", "label": "Donchian Middle" },
    { "value": 20 }
    ],
    label: "Donchian Middle",
    "search": ["Donchian Middle", "Donchian Channels"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "keltnerBasis", "label": "Keltner Basis" },
    { "value": 20 },
    { "value": 2.0 }
    ],
    label: "Keltner Basis",
    "search": ["Keltner Basis", "Keltner Channels"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "keltnerUpper", "label": "Keltner Upper" },
    { "value": 20 },
    { "value": 2.0 }
    ],
    label: "Keltner Upper",
    "search": ["Keltner Upper", "Keltner Channels"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "keltnerLower", "label": "Keltner Lower" },
    { "value": 20 },
    { "value": 2.0 }
    ],
    label: "Keltner Lower",
    "search": ["Keltner Lower", "Keltner Channels"]
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
    { "value": "CPRPP", "label": "CPR PP" },
    ],
    label: "CPR PP",
    "search": ["PP", "CPR"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "CPRBC", "label": "CPR BC" },
    ],
    label: "CPR BC",
    "search": ["BC", "CPR"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "CPRTC", "label": "CPR TC" },
    ],
    label: "CPR TC",
    "search": ["TC", "CPR"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "pivotR1", "label": "Pivot R1" },
    ],
    label: "Pivot R1",
    "search": ["R1", "Pivot", "pivotR1"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "pivotR2", "label": "Pivot R2" },
    ],
    label: "Pivot R2",
    "search": ["R2", "Pivot", "pivotR2"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "pivotR3", "label": "Pivot R3" },
    ],
    label: "Pivot R3",
    "search": ["R3", "Pivot", "pivotR3"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "pivotR4", "label": "Pivot R4" },
    ],
    label: "Pivot R4",
    "search": ["R4", "Pivot", "pivotR4"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "pivotS1", "label": "Pivot S1" },
    ],
    label: "Pivot S1",
    "search": ["S1", "Pivot", "pivotS1"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "pivotS2", "label": "Pivot S2" },
    ],
    label: "Pivot S2",
    "search": ["S2", "Pivot", "pivotS2"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "pivotS3", "label": "Pivot S3" },
    ],
    label: "Pivot S3",
    "search": ["S3", "Pivot", "pivotS3"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "pivotS4", "label": "Pivot S4" },
    ],
    label: "Pivot S4",
    "search": ["S4", "Pivot", "pivotS4"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "stochasticRSIK", "label": "Stochastic RSI K" },
    { "value": 3 },
    { "value": 3 },
    { "value": 14 },
    { "value": 14 },
    { "value": "close" },

    ],
    label: "Stochastic RSI K",
    "search": ["Stochastic RSI K", "K", "Stochastic RSI"]
  },
  {
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "stochasticRSID", "label": "Stochastic RSI D" },
    { "value": 3 },
    { "value": 3 },
    { "value": 14 },
    { "value": 14 },
    { "value": "close" },

    ],
    label: "Stochastic RSI D",
    "search": ["Stochastic RSI D", "D", "Stochastic RSI"]
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
    value: [{ "value": "0", "label": "current candle" },
    { "value": "Daily", "label": "Daily" },
    { "value": "volume", "label": "Volume" },
    ],
    label: "Volume",
    "search": ["volume"]
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
    value: [{ "value": "countPrevTradesWeekly", "label": "Prev Trade Count Weekly" }],
    label: "Prev Trade Count Weekly",
    "search": ["Prev Trade Count Weekly"]
  },
  {
    value: [{ "value": "countPrevTradesMonthly", "label": "Prev Trade Count Monthly" }],
    label: "Prev Trade Count Monthly",
    "search": ["Prev Trade Count Monthly"]
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