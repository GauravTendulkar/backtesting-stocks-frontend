import React, { memo, useCallback, useContext, useEffect, useState } from 'react'
import { ClipboardCopy, X } from 'lucide-react'
import { CopyIndicatorContext } from '@/app/context/CopyIndicatorContext'

import Sma from '../indicators/Sma'
import Macd from '../indicators/Macd'
import LogicalOperators from '../indicators/LogicalOperators'
import Ohlc from '../indicators/Ohlc'
import EntryValue from '../indicators/EntryValue'
import Number from '../indicators/Number'
import ArithmeticOperators from '../indicators/ArithmeticOperators'
import Brackets from '../indicators/Brackets'
import Ema from '../indicators/Ema'
import Rsi from '../indicators/Rsi'
import BollingerBands from '../indicators/BollingerBands'
import Time from '../indicators/Time'
import Supertrend from '../indicators/Supertrend'
import Camarilla from '../indicators/Camarilla'
import PrevTradeCount from '../indicators/PrevTradeCount'
import Ceil from '../indicatorsFunction/Ceil'
import Max from '../indicatorsFunction/Max'
import Min from '../indicatorsFunction/Min'
import Log10 from '../indicatorsFunction/Log10'
import Log from '../indicatorsFunction/Log'
import Abs from '../indicatorsFunction/Abs'
import Floor from '../indicatorsFunction/Floor'
import PivotPointsAndCPR from '../indicators/PivotPointsAndCPR'
import StochasticRSI from '../indicators/StochasticRSI'
import ATR from '../indicators/ATR'
import IchimokuCloud from '../indicators/IchimokuCloud'
import Momentum from '../indicators/Momentum'
import RateOfChange from '../indicators/RateOfChange'
import CommodityChannelIndex from '../indicators/CommodityChannelIndex'
import WilliamsPercentR from '../indicators/WilliamsPercentR'
import ChandeMomentumOscillator from '../indicators/ChandeMomentumOscillator'
import ChaikinMoneyFlow from '../indicators/ChaikinMoneyFlow'
import DonchianChannels from '../indicators/DonchianChannels'
import KeltnerChannels from '../indicators/KeltnerChannels'

const renderComponent = (currentComponentState, onchange) => {
    const getVal = (index) => currentComponentState[index]?.value

    const wrap = (Cmp) => <Cmp arrayPass={currentComponentState} passto={onchange} />

    switch (getVal(2)) {
        case 'sma': return wrap(Sma)
        case 'ema': return wrap(Ema)
        case 'rsi': return wrap(Rsi)
        case 'macdLine':
        case 'signalLine':
        case 'macdHistogram': return wrap(Macd)
        case 'BBbasis':
        case 'BBupper':
        case 'BBlower': return wrap(BollingerBands)
        case 'supertrend': return wrap(Supertrend)
        case 'H1': case 'H2': case 'H3': case 'H4':
        case 'L1': case 'L2': case 'L3': case 'L4': return wrap(Camarilla)
        case 'CPRPP': case 'CPRBC': case 'CPRTC':
        case 'pivotR1': case 'pivotR2': case 'pivotR3': case 'pivotR4':
        case 'pivotS1': case 'pivotS2': case 'pivotS3': case 'pivotS4': return wrap(PivotPointsAndCPR)
        case 'stochasticRSIK':
        case 'stochasticRSID': return wrap(StochasticRSI)
        case 'atr': return wrap(ATR)
        case 'conversionLineIC':
        case 'baseLineIC':
        case 'laggingLineIC':
        case 'leadingSpanAIC':
        case 'leadingSpanBIC': return wrap(IchimokuCloud)
        case 'momentum': return wrap(Momentum)
        case 'roc': return wrap(RateOfChange)
        case 'cci': return wrap(CommodityChannelIndex)
        case 'williamsPercentR': return wrap(WilliamsPercentR)
        case 'cmo': return wrap(ChandeMomentumOscillator)
        case 'cmf': return wrap(ChaikinMoneyFlow)
        case 'donchianUpper':
        case 'donchianLower':
        case 'donchianMiddle': return wrap(DonchianChannels)
        case 'keltnerBasis':
        case 'keltnerUpper':
        case 'keltnerLower': return wrap(KeltnerChannels)
        case 'high':
        case 'low':
        case 'open':
        case 'close':
        case 'volume': return wrap(Ohlc)
    }

    switch (getVal(0)) {
        case '<': case '>': case '<=': case '>=': case '==': case '!=': return <LogicalOperators arrayPass={currentComponentState} />
        case '+': case '-': case '*': case '/': return wrap(ArithmeticOperators)
        case 'number': return wrap(Number)
        case 'entry': return wrap(EntryValue)
        case 'countPrevTrades': return wrap(PrevTradeCount)
        case 'time': return wrap(Time)
        case '(': case ')': return wrap(Brackets)
        case 'ceil': return wrap(Ceil)
        case 'floor': return wrap(Floor)
        case 'abs': return wrap(Abs)
        case 'log10': return wrap(Log10)
        case 'log': return wrap(Log)
        case 'max': return wrap(Max)
        case 'min': return wrap(Min)
    }

    return <div>Hello</div>
}

const IndicatorUI = ({ indexProp, valueProp, onChangeProp = () => { }, objectProp = "", removeIndicatorProp = () => { } }) => {
    const [currentComponentState, setCurrentComponentState] = useState(valueProp[objectProp])
    const [display, setDisplay] = useState("hidden")
    const { setCopyIndicator } = useContext(CopyIndicatorContext)

    useEffect(() => {
        setCurrentComponentState(valueProp[objectProp])
    }, [valueProp[objectProp]])

    const onchange = useCallback((data) => {
        const tempObj = { [objectProp]: [...data] }
        setCurrentComponentState([...data])
        onChangeProp(tempObj, indexProp)
    }, [objectProp, onChangeProp, indexProp])

    const handleCopy = () => {
        const temp = { [objectProp]: JSON.parse(JSON.stringify(currentComponentState)) }
        setCopyIndicator(temp)
    }

    return (
        <div
            className="relative rounded-md border border-muted bg-muted/20 hover:border-accent transition-all flex items-center gap-2"
            onMouseEnter={() => setDisplay("")}
            onMouseLeave={() => setDisplay("hidden")}
        >
            <button
                className={`absolute -top-2 -left-2 p-1 rounded-full bg-background shadow ${display}`}
                onClick={handleCopy}
                title="Copy"
            >
                <ClipboardCopy size={14} />
            </button>

            <button
                className={`absolute -top-2 -right-2 p-1 rounded-full bg-background shadow ${display}`}
                onClick={() => removeIndicatorProp(indexProp)}
                title="Remove"
            >
                <X size={14} />
            </button>

            <div className="w-full">{renderComponent(currentComponentState, onchange)}</div>
        </div>
    )
}

export { renderComponent }
export default IndicatorUI
