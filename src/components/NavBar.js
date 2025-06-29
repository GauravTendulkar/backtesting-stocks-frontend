import NavBarClient from "./NavbarClient";

import { backendUrl, serverSideBackendUrl } from "@/json-data/backendServer";
import { auth } from "@/auth";
import axios from "axios";

const NavBar = async () => {



    const session = await auth();
    let roles = []
    try {
        roles = await axios.post(`${serverSideBackendUrl}api/admin-dashboard/get-roles`, {
            user_email: session?.user?.email
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