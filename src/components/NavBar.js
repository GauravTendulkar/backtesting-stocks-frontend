import NavBarClient from "./NavbarClient";
import { cookies } from 'next/headers'
import axios from 'axios'
import { backendUrl } from "@/json-data/backendServer";

const NavBar = async () => {

    const cookieStore = cookies()
    const token = cookieStore.get('jwt_token')?.value
    let response
    let isTokenValid
    if (!token) {
        isTokenValid = false
    }

    // console.log("token", token)

    try {
        response = await axios.get(`${backendUrl}oauth/users/me`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        // console.log(response)
        isTokenValid = true
        // console.log("isTokenValid", isTokenValid)
    } catch (error) {
        isTokenValid = false
        // console.log("isTokenValid", isTokenValid, error)
    }


    return (
        <>
            <nav>

                <NavBarClient isTokenValid={isTokenValid}></NavBarClient>
            </nav>
        </>
    );


}


export default NavBar