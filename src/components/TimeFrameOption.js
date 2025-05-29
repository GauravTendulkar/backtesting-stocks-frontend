import { useContext, useEffect, useState } from "react";
import { EquationContext } from "@/app/context/EquationContext";
import DialogPopUp from "./DialogPopUp";




export default function TimeFrameOption(props) {

    const [timeFrameOptionUpdate, setTimeFrameOptionUpdate] = useState(props.variablePass.slice(0, 2))
    const { previousTimeframes, setPreviousTimeframes, previousTimeframesMinutes, setPreviousTimeframesMinutes, timeframe } = useContext(EquationContext);
    const [nType, setNType] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        setTimeFrameOptionUpdate(props.variablePass.slice(0, 2))

    }, [props.variablePass]);

    const handleValueChangeFor0 = (e) => {

        let temp = [...timeFrameOptionUpdate];
        // for Daily
        if (timeFrameOptionUpdate[1]["value"] == "Daily" || timeFrameOptionUpdate[1]["value"] == "Weekly" || timeFrameOptionUpdate[1]["value"] == "Monthly") {
            if (e == "-n") {

                setNType(e)
                setOpenDialog(true)
            }
            else {
                temp[0] = previousTimeframes[previousTimeframes.findIndex((item) => item.value === e)]
                setTimeFrameOptionUpdate(temp)
                props.passto(temp)
            }
        }
        // for minutes
        else {


            if (e == "-n") {

                setNType(e)
                setOpenDialog(true)

            }
            else if (e == "=n") {

                setNType(e)
                setOpenDialog(true)

            }
            else if (e == "=-n") {

                setNType(e)
                setOpenDialog(true)

            }
            else {
                temp[0] = previousTimeframesMinutes[previousTimeframesMinutes.findIndex((item) => item.value === e)]
                setTimeFrameOptionUpdate(temp)
                props.passto(temp)

            }

        }

    }

    const handleValueChangeFor1 = (e) => {
        let temp = [...timeFrameOptionUpdate];

        if (e == "Daily" || e == "Weekly" || e == "Monthly") {
            temp[1] = timeframe[timeframe.findIndex((item) => item.value == e)]
            temp[0] = { "value": "0", "label": "current candle" }
        }
        else {
            temp[1] = timeframe[timeframe.findIndex((item) => item.value == e)]
        }

        setTimeFrameOptionUpdate(temp)

        props.passto(temp)
    }



    const updateDialog = (valueFromDialog) => {



        if (nType === '-n' && ((previousTimeframes.findIndex((item) => item.value === `-${valueFromDialog}`)) == -1) && (timeFrameOptionUpdate[1]["value"] == "Daily" || timeFrameOptionUpdate[1]["value"] == "Weekly" || timeFrameOptionUpdate[1]["value"] == "Monthly")) {

            previousTimeframes.splice(previousTimeframes.findIndex((item) => item.value === "-n"), 0, { "value": `-${valueFromDialog}`, "label": `${valueFromDialog} candles ago` });

            let temp = [...timeFrameOptionUpdate]
            temp[0] = { "value": `-${valueFromDialog}`, "label": `${valueFromDialog} candles ago` }
            setTimeFrameOptionUpdate(temp);
            props.passto(temp);
        }
        else if (nType === '-n' && ((previousTimeframesMinutes.findIndex((item) => item.value === `-${valueFromDialog}`)) == -1)) {
            previousTimeframesMinutes.splice(previousTimeframesMinutes.findIndex((item) => item.value === "-n"), 0, { "value": `-${valueFromDialog}`, "label": `${valueFromDialog} candles ago` });

            let temp = [...timeFrameOptionUpdate]
            temp[0] = { "value": `-${valueFromDialog}`, "label": `-${valueFromDialog}` }
            setTimeFrameOptionUpdate(temp);
            props.passto(temp);
        }
        else if (nType === '=-n' && ((previousTimeframesMinutes.findIndex((item) => item.value === `=-${valueFromDialog}`)) == -1)) {
            previousTimeframesMinutes.splice(previousTimeframesMinutes.findIndex((item) => item.value === "=-n"), 0, { "value": `=-${valueFromDialog}`, "label": `=-${valueFromDialog}` });

            let temp = [...timeFrameOptionUpdate]
            temp[0] = { "value": `=-${valueFromDialog}`, "label": `=-${valueFromDialog}` }
            setTimeFrameOptionUpdate(temp);
            props.passto(temp);
        }
        else if (nType === '=n' && ((previousTimeframesMinutes.findIndex((item) => item.value === `=${valueFromDialog}`)) == -1)) {
            previousTimeframesMinutes.splice(previousTimeframesMinutes.findIndex((item) => item.value === "=n"), 0, { "value": `=${valueFromDialog}`, "label": `=${valueFromDialog}` });

            let temp = [...timeFrameOptionUpdate]
            temp[0] = { "value": `=${valueFromDialog}`, "label": `=${valueFromDialog}` }
            setTimeFrameOptionUpdate(temp);
            props.passto(temp);
        }




        setOpenDialog(false);

    }

    // ________________________________________________________________________________

    const valueDefine = () => {

        if (((previousTimeframes.findIndex((item) => item.value === props.variablePass[0]["value"])) == -1) && (props.variablePass[1]["value"] == "Daily" || props.variablePass[1]["value"] == "Weekly" || props.variablePass[1]["value"] == "Monthly")) {


            if (props.variablePass[0]["value"].slice(0, 1) === "-") {
                console.log(props.variablePass[0])
                console.log(previousTimeframes.findIndex((item) => item.value === "-n"))
                previousTimeframes.splice(previousTimeframes.findIndex((item) => item.value === "-n"), 0, props.variablePass[0]);
                setPreviousTimeframes([...previousTimeframes])


            }
        } else if ((previousTimeframesMinutes.findIndex((item) => item.value === props.variablePass[0]["value"])) == -1) {


            if (props.variablePass[0]["value"].slice(0, 1) === "-") {

                previousTimeframesMinutes.splice(previousTimeframesMinutes.findIndex((item) => item.value === "-n"), 0, props.variablePass[0]);
                setPreviousTimeframesMinutes([...previousTimeframesMinutes])


            }
            else if (props.variablePass[0]["value"].slice(0, 2) === "=-") {

                previousTimeframesMinutes.splice(previousTimeframesMinutes.findIndex((item) => item.value === "=-n"), 0, props.variablePass[0]);
                setPreviousTimeframesMinutes([...previousTimeframesMinutes])


            }
            else if (props.variablePass[0]["value"].slice(0, 1) === "=") {

                previousTimeframesMinutes.splice(previousTimeframesMinutes.findIndex((item) => item.value === "=n"), 0, props.variablePass[0]);
                setPreviousTimeframesMinutes([...previousTimeframesMinutes])
            }
        }
    }

    useEffect(() => {
        if(props.isOnClickTrue){
            valueDefine();
            props.setIsOnClickTrue(false)
        }
    }, [props.isOnClickTrue]);

    return (
        <>
            <div className="flex flex-col">

                {(timeFrameOptionUpdate[1]["value"] == "Daily" || timeFrameOptionUpdate[1]["value"] == "Weekly" || timeFrameOptionUpdate[1]["value"] == "Monthly")
                    ?
                    <select value={timeFrameOptionUpdate[0]["value"]} onChange={(e) => handleValueChangeFor0(e.target.value)} className='border-2 border-black mr-auto  overflow-y-scroll'>

                        {previousTimeframes.map((e, id) => {
                            return (
                                <option key={id} value={e.value}>{e.label}</option>
                            );
                        })}


                    </select>
                    : <select value={timeFrameOptionUpdate[0]["value"]} onChange={(e) => handleValueChangeFor0(e.target.value)} className='border-2 border-black mr-auto  overflow-y-scroll'>

                        {previousTimeframesMinutes.map((e, id) => {
                            return (
                                <option key={id} value={e.value}>{e.label}</option>
                            );
                        })}


                    </select>
                }

                <select value={timeFrameOptionUpdate[1]["value"]} onChange={(e) => handleValueChangeFor1(e.target.value)} className='border-2 border-black mr-auto  overflow-y-scroll'>
                    {timeframe.map((e, id) => {
                        return (
                            <option key={id} value={e.value}>{e.label}</option>
                        );
                    })}


                </select>

            </div>
            <DialogPopUp open={openDialog} setOpen={setOpenDialog} updateDialog={updateDialog}></DialogPopUp>
        </>
    );

}