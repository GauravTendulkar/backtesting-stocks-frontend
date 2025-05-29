
import SignUp from "@/components/LoginUI/SignUp"
import Head from "next/head"
import React from "react"

export const metadata = {
    title: "Sign Up",
    description: "",
};

const SignUpPage = () => {
    return (
        <>
            {/* <Head>
                <title>Sign Up</title>
                <meta name="description" content="Learn more about our company and values." />
                <meta name="keywords" content="about, company, values" />
            </Head> */}
            <SignUp />
        </>

    )

}

export default SignUpPage
