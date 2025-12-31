import NavBarClient from "./NavbarClient";

import { backendUrl, serverSideBackendUrl } from "@/json-data/backendServer";
import { auth } from "@/auth";
import axios from "axios";
import { getTokenForSessionData } from "@/utils/security";

const NavBar = async () => {



    const session = await auth();
    let roles = []
    try {
        roles = await axios.post(`${serverSideBackendUrl}api/admin-dashboard/get-roles`, {},
            {
                headers: {
                    Authorization: `Bearer ${await getTokenForSessionData(session)}`,
                }
            });


    }
    catch (error) {
        console.error(error)
    }

    return (
        <>
            <nav>

                <NavBarClient session={session} roles={roles?.data || []}></NavBarClient>
            </nav>
        </>
    );


}


export default NavBar