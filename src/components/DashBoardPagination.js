"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Card } from './ui/card';
import { Button } from './ui/button';


import Link from 'next/link';
import DialogForDelete from './DialogForDelete';
import axios from 'axios';
import { backendUrl } from '@/json-data/backendServer';
import { useTheme } from 'next-themes';
import { useToast } from '@/hooks/use-toast';

const DashBoardPagination = ({ items, totalPages, page, token }) => {


    const router = useRouter();
    const { theme } = useTheme();
    const { toast } = useToast()


    const handleDelete = async (id) => {
        console.log("id", id)
        setIsDialogOpen(false)

        try {

            const response = await axios.delete(`${backendUrl}equations/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Recommended way to pass JWT
                }
            });
            if (items.length == 1 & page > 1) {
                router.push(`/dashboard/${page - 1}`)
                router.refresh()
                return (

                    toast({
                        // title: "Title is missing",
                        description: "Deleted Successfully!",

                    })
                )
            }
            else {

                router.push(`/dashboard/${page}`)
                router.refresh()
                toast({
                    // title: "Title is missing",
                    description: "Deleted Successfully!",

                })

            }


        } catch (error) {
            console.error('Error deleting item:', error);
        }

    };

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [deleteID, setDeleteID] = useState(null);


    return (
        <>
            <div className="container mx-auto space-y-6 mt-6 mb-6 px-4 md:px-8">

                {/* Empty State - Show Create Strategy Card */}
                {items.length === 0 && page === 1 ? (
                    <Card className="flex flex-col justify-center items-center h-full py-12 px-6 rounded-xl shadow-md space-y-6 
                                bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                        <h2 className="text-xl font-semibold">Create a New Strategy</h2>
                        <Button
                            onClick={() => router.push(`/create-2`)}
                            className="px-6 py-2 text-lg"
                        >Create</Button>
                    </Card>
                ) : null}

                {/* List of Strategies */}
                <div className="space-y-4">
                    {items.map((e) => (
                        <Card key={e._id} className="p-6 rounded-xl shadow-md border 
                                                 bg-white dark:bg-gray-900 
                                                 text-gray-700 dark:text-gray-300">
                            <div className="flex flex-col space-y-3">

                                <Button
                                    variant="link"
                                    className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                                    onClick={() => router.push(`/create-2/${e.link}`)}
                                    draggable
                                    onDragStart={(event) => event.dataTransfer.setData('text/plain', `${window.location.origin}/create-2/${e.link}`)}
                                >
                                    {e.title}
                                </Button>


                                <div className="text-gray-600 dark:text-gray-400 text-sm">
                                    <p><strong>Updated:</strong> {new Date(e.updated_at).toLocaleString()}</p>
                                    <p><strong>Created:</strong> {new Date(e.created).toLocaleString()}</p>
                                </div>

                                {/* Delete Button */}
                                <div className="flex justify-end">
                                    <Button
                                        variant="destructive"
                                        className="px-4 py-2"
                                        onClick={() => {
                                            setIsDialogOpen(true);
                                            setDeleteID(e._id);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>


                <Pagination page={page} totalPages={totalPages} className="mt-6" />

            </div>

            {isDialogOpen &&
                <DialogForDelete
                    open={isDialogOpen}
                    setOpen={setIsDialogOpen}
                    valueID={deleteID}
                    handleDeleteProp={handleDelete}
                />
            }
        </>
    );



    // return (
    //     <>

    //         <div className='container mx-auto space-y-3 mt-3 mb-3'>

    //             {(items.length == 0 && page == 1) ? (
    //                 <Card className='flex flex-col justify-center items-center h-full py-8 space-y-5'>
    //                     <div>Create a new Strategy</div> 
    //                     <Button onClick={() => router.push(`/create-2`)}>Create</Button>
    //                 </Card>
    //             ) : <div></div>}
    //             {items && items.map((e) => {
    //                 return (
    //                     <Card key={e._id} className=' my-2'>
    //                         <Button variant="link" onClick={() => router.push(`/create-2/${e.link}`)}>{e.title}</Button>
    //                         <div>{new Date(e.updated_at).toLocaleString()}</div>
    //                         <div>{new Date(e.created).toLocaleString()}</div>
    //                         <Button variant="destructive" onClick={() => {

    //                             setIsDialogOpen(true)
    //                             setDeleteID(e._id)
    //                         }}>Delete</Button>
    //                     </Card>
    //                 );
    //             })}

    //             <Pagination page={page} totalPages={totalPages}  ></Pagination>

    //         </div>

    //         {isDialogOpen && <DialogForDelete open={isDialogOpen} setOpen={setIsDialogOpen} valueID={deleteID} handleDeleteProp={handleDelete}></DialogForDelete>}
    //     </>
    // )
}

export default DashBoardPagination


const Pagination = ({ page, totalPages }) => {

    const router = useRouter();

    function returnRangeArray(arr, value, frameRange) {


        const index = arr.indexOf(parseInt(value));
        if (index === -1) {
            return []; // Return an empty array if the value is not found
        }

        const halfRange = Math.floor(frameRange / 2);

        // Calculate start and end of the range
        let start = Math.max(0, index - halfRange);
        let end = start + frameRange;

        // Ensure the range fits within the array
        if (end > arr.length) {
            end = arr.length;
            start = Math.max(0, end - frameRange);
        }

        return arr.slice(start, end);
    }



    const range = 5   // 5 pages
    let arr = []

    for (let i = 1; i <= totalPages; i++) {
        arr.push(i)
    }
    if (arr.length > range + 1) {
        arr = returnRangeArray(arr, page, range)
    }






    return (
        <>
            <div className='flex justify-center'>


                <Button variant="ghost" className={`${(page == 1) ? "hidden" : ""}`} onClick={() => { router.push(`/dashboard/${page - 1}`) }}>Previous</Button>
                {
                    (arr.length > 1) && arr.map((e, id) => {
                        return (

                            <Button key={id} variant="ghost" onClick={() => { router.push(`/dashboard/${e}`) }}>{e}</Button>

                        )
                    })
                }
                <Button variant="ghost" className={`${(page >= totalPages) ? "hidden" : ""}`} onClick={() => { router.push(`/dashboard/${page + 1}`) }}>Next</Button>


            </div>


        </>
    )
}