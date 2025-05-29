import { useEffect, useState } from 'react'

const useDragAndDrop = (initialValue = [], onChange = () => { }) => {


    const [data, setData] = useState(initialValue);

    useEffect(() => {

        setData(initialValue)
    }, [initialValue])

    const [dragID, setDragID] = useState(null);
    const [isDragging, setIsDragging] = useState(false);


    
    const handleOnDragStart = (id) => {
        // console.log("OnDragStart", id)
        setDragID(id)
        setIsDragging(true)

    }

    const handleDragOver = (event, id) => {
        // console.log("DragOver", id)
        event.preventDefault();

        if (dragID === null || dragID === id) {
            return;
        }
        const targetDrageItem = event.currentTarget.getBoundingClientRect();

        const mouseX = event.clientX;

        const targetDrageItemCenter = targetDrageItem.left + (targetDrageItem.width / 2);
        // console.log("targetDrageItemCenter", targetDrageItemCenter)
        // console.log("mouseX", mouseX)
        if ((mouseX < targetDrageItemCenter && id < dragID) ||
            (mouseX >= targetDrageItemCenter && id > dragID)) {
            
            let temp = [...data]
            const removedData = temp[dragID]
            temp.splice(dragID, 1)
            temp.splice(id, 0, removedData)
            // console.log(temp)
            if (isDragging) {
                setData([...temp])
                onChange([...temp])
                setIsDragging(true)
                setDragID(id)
            }
        }


    }



    const handleOnDrop = () => {

        setIsDragging(false);
        setDragID(null);
    }

    const handleOnDragEnd = () => {
        setIsDragging(false);
        setDragID(null);
    }


    return {

        isDragging,
        dragID,
        handleOnDragStart,
        handleDragOver,
        handleOnDrop,
        handleOnDragEnd
    }
}

export default useDragAndDrop