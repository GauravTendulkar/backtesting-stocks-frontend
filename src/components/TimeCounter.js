import React, { useEffect, useState, useRef } from "react";

// Helper function to format time in HH:MM:SS
const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const TimeCounter = ({ command, timer = () => { } }) => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const startTimeRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        const cmd = command.trim().toLowerCase();

        if (cmd === "start") {
            if (!intervalRef.current) {
                startTimeRef.current = Date.now() - elapsedTime * 1000; // Maintain correct elapsed time
                intervalRef.current = setInterval(() => {
                    const currentTime = Date.now();
                    const newElapsedTime = Math.floor((currentTime - startTimeRef.current) / 1000);
                    setElapsedTime(newElapsedTime);
                    timer(newElapsedTime);
                }, 1000);
            }
        } else if (cmd === "stop") {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        } else if (cmd === "reset") {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            startTimeRef.current = null;
            setElapsedTime(0);
            timer(0);
        }

        

        // Cleanup on unmount
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [command]);

    return (
        <h2 className="px-4 py-2 rounded border transition-colors duration-300">
            {formatTime(elapsedTime)}
        </h2>
    );
};

export default TimeCounter;
