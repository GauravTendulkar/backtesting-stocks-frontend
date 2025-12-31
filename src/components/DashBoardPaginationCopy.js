"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Card } from './ui/card';
import { Button } from './ui/button';

import { ThumbsUp, ThumbsDown } from "lucide-react";
import Link from 'next/link';
import DialogForDelete from './DialogForDelete';
import axios from 'axios';
import { backendUrl } from '@/json-data/backendServer';
import { useTheme } from 'next-themes';
import { useToast } from '@/hooks/use-toast';
import { getTokenForClientSessionData, getTokenForSessionData } from '@/utils/security';

const DashBoardPagination = ({ items, totalPages, page, session = null }) => {

    if (!session) {
        redirect("/sign-in")
    }

    const router = useRouter();
    const { theme } = useTheme();
    const { toast } = useToast()


    const handleDelete = async (id) => {
        console.log("id", id)
        setIsDialogOpen(false)

        try {

            const response = await axios.post(`${backendUrl}equations/delete/${id}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${await getTokenForClientSessionData()}`,
                    }
                }
            );
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
            <div className="container mx-auto mt-6 mb-6 px-4 md:px-8 space-y-6">
                {/* Empty State */}
                {items.length === 0 && page === 1 && (
                    <Card className="flex flex-col items-center justify-center py-12 px-6 rounded-2xl shadow bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                        <h2 className="text-xl font-semibold mb-4">Create a New Strategy</h2>
                        <Button
                            onClick={() => router.push(`/strategy-builder`)}
                            className="px-6 py-2 text-lg"
                        >
                            Create
                        </Button>
                    </Card>
                )}

                {/* Strategy Cards */}
                <div className="space-y-4">
                    {items.map((e) => (
                        <Card
                            key={e._id}
                            className="p-6 rounded-2xl shadow-md border bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                        >
                            <div className="flex flex-col gap-3">
                                {/* Title */}
                                <Button
                                    variant="link"
                                    className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline w-fit"
                                    onClick={() => router.push(`/strategy-builder/${e.link}`)}
                                    draggable
                                    onDragStart={(event) =>
                                        event.dataTransfer.setData('text/plain', `${window.location.origin}/strategy-builder/${e.link}`)
                                    }
                                >
                                    {e.title}
                                </Button>

                                {/* Timestamps */}
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    <p><strong>Updated:</strong> {new Date(e.updated_at).toLocaleString()}</p>
                                    <p><strong>Created:</strong> {new Date(e.created).toLocaleString()}</p>
                                </div>

                                {/* Likes/Dislikes */}
                                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <ThumbsUp size={18} className="text-green-600" />
                                        <span>{e.likes ?? 0}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <ThumbsDown size={18} className="text-red-600" />
                                        <span>{e.dislikes ?? 0}</span>
                                    </div>
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

                {/* Pagination */}
                <Pagination page={page} totalPages={totalPages} className="mt-6" />
            </div>

            {/* Delete Confirmation Dialog */}
            {isDialogOpen && (
                <DialogForDelete
                    open={isDialogOpen}
                    setOpen={setIsDialogOpen}
                    valueID={deleteID}
                    handleDeleteProp={handleDelete}
                />
            )}
        </>
    );



    // return (
    //     <>

    //         <div className='container mx-auto space-y-3 mt-3 mb-3'>

    //             {(items.length == 0 && page == 1) ? (
    //                 <Card className='flex flex-col justify-center items-center h-full py-8 space-y-5'>
    //                     <div>Create a new Strategy</div> 
    //                     <Button onClick={() => router.push(`/strategy-builder`)}>Create</Button>
    //                 </Card>
    //             ) : <div></div>}
    //             {items && items.map((e) => {
    //                 return (
    //                     <Card key={e._id} className=' my-2'>
    //                         <Button variant="link" onClick={() => router.push(`/strategy-builder/${e.link}`)}>{e.title}</Button>
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