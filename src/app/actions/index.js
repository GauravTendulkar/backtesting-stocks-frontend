"use server"

import { signIn, signOut, auth } from "@/auth"

export async function doSocialLogin(formData) {

    const action = formData.get("action")
    // console.log(action)
    await signIn(action, { redirectTo: "/" });

}

export async function doLogout() {
    await signOut({ redirectTo: "/" })
}



// export async function callAuth() {

//     const session = await auth();
//     return session
// }