"use client"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React, { useContext, useState } from "react"
import axios from "axios"
import { useRouter } from 'next/navigation';

import { backendUrl } from "@/json-data/backendServer"
import { StockListContext } from "@/app/context/StockListContext"
import { TokenContext } from "@/app/context/TokenContext"




function print(data) {
    console.log(data)
}

const SignIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({})
    const router = useRouter();

    // const { changeToken } = useContext(TokenContext)

    const { getStockData } = useContext(StockListContext);

    // Real-time validation for email
    const handleEmailChange = (e) => {
        const value = e.target.value
        setEmail(value)
        if (!value.trim()) {
            setErrors((prev) => ({ ...prev, email: "Email is required." }))
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            setErrors((prev) => ({ ...prev, email: "Please enter a valid email address." }))
        } else {
            setErrors((prev) => ({ ...prev, email: null }))
        }
    }

    // Real-time validation for password
    const handlePasswordChange = (e) => {
        const value = e.target.value
        setPassword(value)
        if (!value.trim()) {
            setErrors((prev) => ({ ...prev, password: "Password is required." }))
        } else if (value.length < 6) {
            setErrors((prev) => ({ ...prev, password: "Password must be at least 6 characters." }))
        } else {
            setErrors((prev) => ({ ...prev, password: null }))
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        // Final validation check
        if (!email.trim() || errors.email) {
            setErrors((prev) => ({ ...prev, email: "Please provide a valid email address." }))
        }
        if (!password.trim() || errors.password) {
            setErrors((prev) => ({ ...prev, password: "Please provide a valid password." }))
        }

        // Prevent submission if there are errors
        if (errors.email || errors.password) return

        const data = {
            "email": email,
            "password": password,
        }

        try {
            const response = await axios.post(`${backendUrl}oauth/signin`, data)
            print(response)

            // Store JWT token in cookie
            const token = response.data.access_token
            // changeToken(token)
            // Cookies.set('jwt_token', token, {
            //     expires: 7, // Expires in 7 days
            //     secure: process.env.NODE_ENV === 'production', // Use secure in production
            //     sameSite: 'strict'
            // });

            // alert("Sign in successful!")

            router.push(`/dashboard/1`) // Redirect to dashboard or home page
            router.refresh()
            // setTimeout(() => {
            //     getStockData()
            // }, 1000); // 500ms delay before checking

            // clearTimeout(timeout);

        } catch (error) {
            print(error)
            alert(error.response?.data?.detail || "Sign in failed")
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="p-6 w-full max-w-md shadow-lg">
                <h1 className="text-2xl font-semibold text-center mb-6">Sign In to Your Account</h1>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <Label htmlFor="email" className="block text-sm font-medium">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="mt-2"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>
                    <div className="mb-3 ">
                        <Label htmlFor="password" className="block text-sm font-medium">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            className="mt-2"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                        <div className="flex justify-end mt-2">
                            <Button type="button" variant="link" onClick={() => {
                                router.push(`/forgot-password`)
                                router.refresh()
                            }}>
                                Forgot Password?
                            </Button>
                        </div>
                    </div>

                    <Button type="submit" className="w-full ">
                        Sign In
                    </Button>
                </form>
                <div className="text-center mt-4">
                    <p className="text-sm">
                        Don't have an account? {' '}
                        <a href="/signup" className="text-blue-600 hover:underline">
                            Sign Up
                        </a>
                    </p>
                </div>

            </Card>
        </div>
    )
}

export default SignIn