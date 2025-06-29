import { backendUrl } from '@/json-data/backendServer';
import axios from 'axios';
import { useEffect, useState } from 'react';

const useGetRoles = (session) => {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                if (!session?.user?.email) return;
                const response = await axios.post(`${backendUrl}api/admin-dashboard/get`, {
                    user_email: session.user.email,
                });
                setRoles(response.data);
                console.log("Fetched roles:", response.data);
            } catch (error) {
                console.error("Error fetching roles", error);
            }
        };

        fetchRoles();
    }, [session]); // Only run when session changes

    return { roles };
};

export default useGetRoles;
