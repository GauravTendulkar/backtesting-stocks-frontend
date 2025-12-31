
import React, { memo, useCallback, useContext, useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import { ClipboardCopy, X } from 'lucide-react';
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable';
import { CopyIndicatorContext } from '@/app/context/CopyIndicatorContext';

import Sma from '../indicators/Sma';
import Macd from '../indicators/Macd';
import LogicalOperators from '../indicators/LogicalOperators';
import Ohlc from '../indicators/Ohlc';
import EntryValue from '../indicators/EntryValue';
import Number from '../indicators/Number';
import ArithmeticOperators from '../indicators/ArithmeticOperators';
import Brackets from '../indicators/Brackets';
import Ema from '../indicators/Ema';
import Rsi from '../indicators/Rsi';
import BollingerBands from '../indicators/BollingerBands';
import Time from '../indicators/Time';
import Supertrend from '../indicators/Supertrend';
import Camarilla from '../indicators/Camarilla';
import PrevTradeCount from '../indicators/PrevTradeCount';
import Ceil from '../indicatorsFunction/Ceil';
import Max from '../indicatorsFunction/Max';
import Min from '../indicatorsFunction/Min';
import Log10 from '../indicatorsFunction/Log10';
import Log from '../indicatorsFunction/Log';
import Abs from '../indicatorsFunction/Abs';
import Floor from '../indicatorsFunction/Floor';
import PivotPointsAndCPR from '../indicators/PivotPointsAndCPR';
import StochasticRSI from '../indicators/StochasticRSI';
import ATR from '../indicators/ATR';
import IchimokuCloud from '../indicators/IchimokuCloud';
import Momentum from '../indicators/Momentum';
import RateOfChange from '../indicators/RateOfChange';
import CommodityChannelIndex from '../indicators/CommodityChannelIndex';
import WilliamsPercentR from '../indicators/WilliamsPercentR';
import ChandeMomentumOscillator from '../indicators/ChandeMomentumOscillator';
import ChaikinMoneyFlow from '../indicators/ChaikinMoneyFlow';
import DonchianChannels from '../indicators/DonchianChannels';
import KeltnerChannels from '../indicators/KeltnerChannels';

// const Sma = dynamic(() => import('../indicators/Sma'));
// const Macd = dynamic(() => import('../indicators/Macd'));
// const LogicalOperators = dynamic(() => import('../indicators/LogicalOperators'));
// const Ohlc = dynamic(() => import('../indicators/Ohlc'));
// const EntryValue = dynamic(() => import('../indicators/EntryValue'));
// const Number = dynamic(() => import('../indicators/Number'));
// const ArithmeticOperators = dynamic(() => import('../indicators/ArithmeticOperators'));
// const Brackets = dynamic(() => import('../indicators/Brackets'));
// const Ema = dynamic(() => import('../indicators/Ema'));
// const Rsi = dynamic(() => import('../indicators/Rsi'));
// const BollingerBands = dynamic(() => import('../indicators/BollingerBands'));
// const Time = dynamic(() => import('../indicators/Time'));
// const Supertrend = dynamic(() => import('../indicators/Supertrend'));
// const Camarilla = dynamic(() => import('../indicators/Camarilla'));
// const PrevTradeCount = dynamic(() => import('../indicators/PrevTradeCount'));
// const Ceil = dynamic(() => import('../indicatorsFunction/Ceil'));
// const Max = dynamic(() => import('../indicatorsFunction/Max'));
// const Min = dynamic(() => import('../indicatorsFunction/Min'));
// const Log10 = dynamic(() => import('../indicatorsFunction/Log10'));
// const Log = dynamic(() => import('../indicatorsFunction/Log'));
// const Abs = dynamic(() => import('../indicatorsFunction/Abs'));
// const Floor = dynamic(() => import('../indicatorsFunction/Floor'));

const renderComponent = (currentComponentState, onchange) => {

    if (currentComponentState[2] && currentComponentState[2]["value"] === "sma") {
        return (
            <Sma arrayPass={currentComponentState} passto={onchange} />
        );
    }
    else if (currentComponentState[2] && currentComponentState[2]["value"] === "ema") {
        return (
            <Ema arrayPass={currentComponentState} passto={onchange} />
        );
    }
    else if (currentComponentState[2] && currentComponentState[2]["value"] === "rsi") {
        return (
            <Rsi arrayPass={currentComponentState} passto={onchange} />
        );
    }
    else if (currentComponentState[2] && currentComponentState[2]["value"] === "BBbasis" || currentComponentState[2] && currentComponentState[2]["value"] === "BBupper" || currentComponentState[2] && currentComponentState[2]["value"] === "BBlower") {
        return (
            <BollingerBands arrayPass={currentComponentState} passto={onchange} />
        );
    }
    else if (currentComponentState[2] && (currentComponentState[2]["value"] === "macdLine" || currentComponentState[2]["value"] === "signalLine" || currentComponentState[2]["value"] === "macdHistogram")) {
        return (
            <Macd arrayPass={currentComponentState} passto={onchange} />
        );
    }
    else if (currentComponentState[2] && (currentComponentState[2]["value"] === "supertrend")) {
        return (
            <Supertrend arrayPass={currentComponentState} passto={onchange} />
        );
    }
    else if (currentComponentState[2] && (currentComponentState[2]["value"] === "H1"
        || currentComponentState[2]["value"] === "H2"
        || currentComponentState[2]["value"] === "H3"
        || currentComponentState[2]["value"] === "H4"
        || currentComponentState[2]["value"] === "L1"
        || currentComponentState[2]["value"] === "L2"
        || currentComponentState[2]["value"] === "L3"
        || currentComponentState[2]["value"] === "L4")) {
        return (
            <Camarilla arrayPass={currentComponentState} passto={onchange} />
        );
    }
    else if (currentComponentState[2] && (currentComponentState[2]["value"] === "CPRPP"
        || currentComponentState[2]["value"] === "CPRBC"
        || currentComponentState[2]["value"] === "CPRTC"
        || currentComponentState[2]["value"] === "pivotR1"
        || currentComponentState[2]["value"] === "pivotR2"
        || currentComponentState[2]["value"] === "pivotR3"
        || currentComponentState[2]["value"] === "pivotR4"
        || currentComponentState[2]["value"] === "pivotS1"
        || currentComponentState[2]["value"] === "pivotS2"
        || currentComponentState[2]["value"] === "pivotS3"
        || currentComponentState[2]["value"] === "pivotS4")) {
        return (
            <PivotPointsAndCPR arrayPass={currentComponentState} passto={onchange} />
        );
    }
    else if (currentComponentState[2] && (currentComponentState[2]["value"] === "stochasticRSIK"
        || currentComponentState[2]["value"] === "stochasticRSID")) {
        return (
            <StochasticRSI arrayPass={currentComponentState} passto={onchange} />
        );
    }
    else if (currentComponentState[2] && (currentComponentState[2]["value"] === "atr")) {
        return (
            <ATR arrayPass={currentComponentState} passto={onchange} />
        );
    }
    else if (currentComponentState[2] && (currentComponentState[2]["value"] === "conversionLineIC"
        || currentComponentState[2]["value"] === "baseLineIC"
        || currentComponentState[2]["value"] === "laggingLineIC"
        || currentComponentState[2]["value"] === "leadingSpanAIC"
        || currentComponentState[2]["value"] === "leadingSpanBIC")) {
        return (
            <IchimokuCloud arrayPass={currentComponentState} passto={onchange} />
        );
    }
    else if (currentComponentState[2] && (currentComponentState[2]["value"] === "momentum")) {
        return (
            <Momentum arrayPass={currentComponentState} passto={onchange} />
        );
    }
    else if (currentComponentState[2] && (currentComponentState[2]["value"] === "roc")) {
        return (
            <RateOfChange arrayPass={currentComponentState} passto={onchange} />
        );
    }
    else if (currentComponentState[2] && (currentComponentState[2]["value"] === "cci")) {
        return (
            <CommodityChannelIndex arrayPass={currentComponentState} passto={onchange} />
        );
    }
    else if (currentComponentState[2] && (currentComponentState[2]["value"] === "williamsPercentR")) {
        return (
            <WilliamsPercentR arrayPass={currentComponentState} passto={onchange} />
        );
    }
    else if (currentComponentState[2] && (currentComponentState[2]["value"] === "cmo")) {
        return (
            <ChandeMomentumOscillator arrayPass={currentComponentState} passto={onchange} />
        );
    }
    else if (currentComponentState[2] && (currentComponentState[2]["value"] === "cmf")) {
        return (
            <ChaikinMoneyFlow arrayPass={currentComponentState} passto={onchange} />
        );
    }
    else if (currentComponentState[2] && (currentComponentState[2]["value"] === "donchianUpper"
        || currentComponentState[2]["value"] === "donchianLower"
        || currentComponentState[2]["value"] === "donchianMiddle")) {
        return (
            <DonchianChannels arrayPass={currentComponentState} passto={onchange} />
        );
    }
    else if (currentComponentState[2] && (currentComponentState[2]["value"] === "keltnerBasis"
        || currentComponentState[2]["value"] === "keltnerUpper"
        || currentComponentState[2]["value"] === "keltnerLower")) {
        return (
            <KeltnerChannels arrayPass={currentComponentState} passto={onchange} />
        );
    }
    else if (currentComponentState[0] && (currentComponentState[0]["value"] === "<"
        || currentComponentState[0]["value"] === ">"
        || currentComponentState[0]["value"] === "<="
        || currentComponentState[0]["value"] === ">="
        || currentComponentState[0]["value"] === "=="
        || currentComponentState[0]["value"] === "!="
    )) {
        return <LogicalOperators arrayPass={currentComponentState} />;
    }
    else if (currentComponentState[2] && (currentComponentState[2]["value"] === "high"
        || currentComponentState[2]["value"] === "low"
        || currentComponentState[2]["value"] === "open"
        || currentComponentState[2]["value"] === "close"
        || currentComponentState[2]["value"] === "volume"
    )) {
        return (
            <Ohlc arrayPass={currentComponentState} passto={onchange} />
        )

    }
    else if (currentComponentState[0] && (currentComponentState[0]["value"] === "+"
        || currentComponentState[0]["value"] === "-"
        || currentComponentState[0]["value"] === "*"
        || currentComponentState[0]["value"] === "/"
    )) {
        return (
            <ArithmeticOperators arrayPass={currentComponentState} passto={onchange} />
        )

    }
    else if (currentComponentState[0] && (currentComponentState[0]["value"] === "number")) {
        return (
            <Number arrayPass={currentComponentState} passto={onchange} />
        )

    }
    else if (currentComponentState[0] && (currentComponentState[0]["value"] === "entry")) {
        return (
            <EntryValue arrayPass={currentComponentState} passto={onchange} />
        )

    }
    else if (currentComponentState[0] && (currentComponentState[0]["value"] === "countPrevTrades")) {
        return (
            <PrevTradeCount arrayPass={currentComponentState} passto={onchange} />
        )

    }
    else if (currentComponentState[0] && (currentComponentState[0]["value"] === "time")) {
        return (
            <Time arrayPass={currentComponentState} passto={onchange} />
        )

    }
    else if (currentComponentState[0] && (currentComponentState[0]["value"] === "(" || currentComponentState[0]["value"] === ")")) {
        return (
            <Brackets arrayPass={currentComponentState} passto={onchange} />
        )

    }
    else if (currentComponentState[0] && (currentComponentState[0]["value"] === "ceil")) {

        return (
            <Ceil arrayPass={currentComponentState} passto={onchange} />
        )

    }
    else if (currentComponentState[0] && (currentComponentState[0]["value"] === "floor")) {

        return (
            <Floor arrayPass={currentComponentState} passto={onchange} />
        )

    }
    else if (currentComponentState[0] && (currentComponentState[0]["value"] === "abs")) {

        return (
            <Abs arrayPass={currentComponentState} passto={onchange} />
        )

    }
    else if (currentComponentState[0] && (currentComponentState[0]["value"] === "log10")) {

        return (
            <Log10 arrayPass={currentComponentState} passto={onchange} />
        )

    }
    else if (currentComponentState[0] && (currentComponentState[0]["value"] === "log")) {

        return (
            <Log arrayPass={currentComponentState} passto={onchange} />
        )

    }
    else if (currentComponentState[0] && (currentComponentState[0]["value"] === "max")) {

        return (
            <Max arrayPass={currentComponentState} passto={onchange} />
        )

    }
    else if (currentComponentState[0] && (currentComponentState[0]["value"] === "min")) {

        return (
            <Min arrayPass={currentComponentState} passto={onchange} />
        )

    }
    else {
        return <div>Hello</div>;
    }
}


const IndicatorUI = memo(({ indexProp, valueProp, onChangeProp = () => { }, objectProp = "", removeIndicatorProp = () => { } }) => {
    // console.log("IndicatorUI")
    const [currentComponentState, setCurrentComponentState] = useState(valueProp[objectProp]);

    // const { attributes, listeners, setNodeRef, isDragging, transform, transition } = useSortable({
    //     id: indexProp + 1,
    // });

    // const style = {
    //     // transition,  // {{ edit_1 }}
    //     transform: CSS.Transform.toString(transform),  // {{ edit_2 }}
    // };

    useEffect(() => {
        // console.log("value")
        // console.log(value)
        setCurrentComponentState(valueProp[objectProp])
    }, [valueProp[objectProp]]);

    // const onchange = useCallback((data) => {

    //     let tempObj = {}
    //     tempObj[objectProp] = [...data]
    //     setCurrentComponentState([...data])
    //     onChangeProp({ ...tempObj }, indexProp)

    // }, [objectProp, onChangeProp, indexProp])

    const onchange = useCallback((data) => {
        const tempObj = { [objectProp]: [...data] };
        setCurrentComponentState([...data]);
        onChangeProp(tempObj, indexProp);
    }, [objectProp, onChangeProp, indexProp]);



    const [display, setDisplay] = useState("hidden")

    const handleMouseEnter = () => {
        setDisplay("")

    }
    const handleMouseLeave = () => {
        setDisplay("hidden")

    }

    const { setCopyIndicator } = useContext(CopyIndicatorContext);

    const handleCopy = () => {
        let temp = {}
        temp[objectProp] = JSON.parse(JSON.stringify(currentComponentState))
        setCopyIndicator(temp)
        // console.log("indexProp", temp)
    }

    return (
        <>

            <div className='relative  flex flex-shrink-0 flex-grow-0 justify-center content-center rounded-md'
                // ref={setNodeRef}
                // {...listeners}
                // {...attributes}
                // style={style}
                onMouseEnter={() => handleMouseEnter()}
                onMouseLeave={() => handleMouseLeave()}
            >
                <button className={`rounded-full  absolute -top-2.5 -left-2 ${display}`} variant="outline" onClick={() => { handleCopy() }}><ClipboardCopy /></button>
                <button className={`rounded-full  absolute -top-2.5 -right-0 ${display}`} variant="outline" onClick={() => removeIndicatorProp(indexProp)}> <X /></button>

                {renderComponent(currentComponentState, onchange)}

            </div>



        </>
    )
})
export { renderComponent }
export default IndicatorUI