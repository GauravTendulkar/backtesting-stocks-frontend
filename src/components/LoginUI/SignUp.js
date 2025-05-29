"use client"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import axios from "axios"
import { useRouter } from 'next/navigation';
import { backendUrl } from "@/json-data/backendServer"

function print(data) {
    console.log(data)
}

const SignUp = () => {
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({})
    const router = useRouter();

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
        if (!fullname.trim()) {
            setErrors((prev) => ({ ...prev, fullname: "Full Name is required." }))
        }
        if (!email.trim() || errors.email) {
            setErrors((prev) => ({ ...prev, email: "Please provide a valid email address." }))
        }
        if (!password.trim() || errors.password) {
            setErrors((prev) => ({ ...prev, password: "Please provide a valid password." }))
        }

        // Prevent submission if there are errors
        if (errors.fullname || errors.email || errors.password) return

        const data = {
            "full_name": fullname,
            "email": email,
            "hashed_password": password,
        }
        console.log("data", data)

        try {
            const response = await axios.post(`${backendUrl}oauth/signup`, data)
            // print(response)

            alert(response.data.data)
            router.push(`/signin`)
        } catch (error) {
            print(error)
            alert(error.response.data.detail)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="p-6 w-full max-w-md shadow-lg">
                <h1 className="text-2xl font-semibold text-center mb-6">Create a new Account</h1>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <Label htmlFor="fullName" className="block text-sm font-medium">
                            Full Name
                        </Label>
                        <Input
                            id="fullName"
                            type="text"
                            placeholder="Enter your full name"
                            className="mt-2"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                        />
                        {errors.fullname && (
                            <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>
                        )}
                    </div>
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
                    <div className="mb-4">
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
                    </div>
                    <Button type="submit" className="w-full mt-4">
                        Sign Up
                    </Button>
                </form>
            </Card>
        </div>
    )
}

export default SignUp