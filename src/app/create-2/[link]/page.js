
import CollectionOfAllComponents from '@/components/logicUI2/CollectionOfAllComponents'
import { backendUrl } from '@/json-data/backendServer';
import axios from 'axios';
import { notFound } from 'next/navigation';
import React from 'react'
import { cookies } from 'next/headers';


export let metadata = {
    title: "",
    description: "",
};

const page = async ({ params }) => {

    const cookieStore = cookies();
    const tokenCookie = cookieStore.get('jwt_token');

    const token = tokenCookie?.value;

    let temp

    try {
        const response = await axios.get(`${backendUrl}equations/${params.link}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        temp = response.data;
        temp["equation"] = JSON.parse(temp["equation"])
        console.log(temp); // Handle the response data as needed
        metadata.title = temp.title
    } catch (error) {
        console.error("Error fetching data:", error);
        // return <div>Page not Found</div>;
        notFound()
    }




    return (
        <>
            <CollectionOfAllComponents valueProp={temp} />
        </>
    );
}

export default page;