"use server"

import { signIn, signOut, auth } from "@/auth"
import jwt from "jsonwebtoken";



// const JWT_SECRET = process.env.AUTH_SECRET;
// const EXPIRY = "5m"; // 5 minutes

// export async function createTokenSecureBackendAccess(payload) {
//   try {
//     const token = jwt.sign(payload, JWT_SECRET, {
//       expiresIn: EXPIRY,
//     });

//     return { token };
//   } catch (err) {
//     return {
//       error: "Token creation failed",
//       detail: err.message,
//     };
//   }
// }

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