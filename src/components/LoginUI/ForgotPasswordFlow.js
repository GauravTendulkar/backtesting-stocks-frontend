"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { backendUrl } from "@/json-data/backendServer";
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';


const ForgotPasswordFlow = () => {
    // step: "email", "otp", or "change"
    const [step, setStep] = useState("email");

    // form fields
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [countdown, setCountdown] = useState(120); // countdown in seconds (2 minutes)

    const router = useRouter();
    const { toast } = useToast()


    useEffect(() => {
        // Reset the countdown when the OTP step is entered
        // setCountdown(120);
        // const timerId = setInterval(() => {
        //     setCountdown((prev) => {
        //         if (prev <= 1) {
        //             clearInterval(timerId);
        //             return 0;
        //         }
        //         return prev - 1;
        //     });
        // }, 1000);
        // return () => clearInterval(timerId);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (confirmPassword && confirmPassword !== newPassword) {
                setError("Your password and confirmation password do not match");
            } else {
                setError("");
            }
        }, 500); // 500ms delay before checking

        return () => clearTimeout(timeout);
    }, [confirmPassword, newPassword]);

    const startCountdown = () => {
        setCountdown(120);
        const timerId = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timerId);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timerId);
    }

    // Format countdown as MM:SS
    const formatCountdown = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();

        // TODO: Trigger API call to send OTP email
        try {
            const response = await axios.post(`${backendUrl}oauth/sendOTP`, email)
            console.log("Email submitted:", email, response);
            if (response?.status == 200) {
                setOtp("")
                setStep("otp");
                startCountdown();
                setError("")
                return (

                    toast({
                        title: response?.data?.message,

                    })

                )

            }
        }
        catch (error) {
            if (error?.response?.status === 400) {
                console.error('Error***********:', error?.response?.data?.detail);
                setError(error?.response?.data?.detail)

            }
        }

    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        console.log("OTP submitted:", otp);
        // TODO: Verify OTP via API call
        try {
            const response = await axios.post(`${backendUrl}oauth/verifyOTP`, { "email": email, "otp": otp })

            console.log("Email submitted:", email, response);
            if (response?.status == 200 && response?.data?.message == "OTP has been verified") {

                setStep("change");

                setError("")
                setNewPassword("")
                setConfirmPassword("")
                return (

                    toast({
                        title: response?.data?.message,

                    })

                )

            }
        }
        catch (error) {
            if (error?.response?.status === 400) {
                console.error('Error***********:', error?.response?.data?.detail);
                setError(error?.response?.data?.detail)

            }
        }

    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        console.log("Password changed:", newPassword);
        // TODO: Trigger API call to change the password
        // Optionally reset the flow or navigate elsewhere



        try {

            if (error === "") {

                const response = await axios.post(`${backendUrl}oauth/changePassword`, { "email": email, "otp": otp, "password": confirmPassword })
                console.log("Email submitted:", email, response);
                if (response?.status == 200 && response?.data?.message == "Your Password has been changed") {

                    setStep("email");

                    setError("")
                    router.push(`/signin`)
                    router.refresh()
                    return (

                        toast({
                            title: response?.data?.message,

                        })

                    )

                }
            }

        }
        catch (error) {
            if (error?.response?.status === 400) {
                console.error('Error***********:', error?.response?.data?.detail);
                setError(error?.response?.data?.detail)

            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="p-6 w-full max-w-md shadow-lg">
                {step === "email" && (
                    <form onSubmit={handleEmailSubmit}>
                        <CardHeader>
                            <CardTitle className="text-center text-2xl font-semibold">
                                Enter Your Email ID
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <Label htmlFor="email" className="block text-sm font-medium">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-2"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Enter
                            </Button>
                            <div className={"p-1 text-red-500"}>{error}</div>
                        </CardContent>
                    </form>
                )}

                {step === "otp" && (
                    <form onSubmit={handleOtpSubmit}>
                        <CardHeader>
                            <CardTitle className="text-center text-2xl font-semibold">
                                Enter OTP
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <Label htmlFor="otp" className="block text-sm font-medium">
                                    OTP
                                </Label>
                                <Input
                                    id="otp"
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="mt-2"
                                    required
                                />
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setStep("email")
                                        setError("")
                                    }}
                                    className="flex-1 mr-2"
                                    disabled={countdown > 0}
                                >
                                    Back {countdown > 0 && `(${formatCountdown(countdown)})`}
                                </Button>
                                <Button type="submit" className="flex-1">
                                    Verify OTP
                                </Button>
                            </div>
                            <div className={"p-1 text-red-500"}>{error}</div>
                        </CardContent>
                    </form>
                )}

                {step === "change" && (
                    <form onSubmit={handleChangePassword}>
                        <CardHeader>
                            <CardTitle className="text-center text-2xl font-semibold">
                                Change Password
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <Label htmlFor="newPassword" className="block text-sm font-medium">
                                    New Password
                                </Label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="mt-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="confirmPassword" className="block text-sm font-medium">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value)
                                    }}
                                    className="mt-2"
                                    required
                                />
                            </div>
                            <div className="flex justify-between mt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setStep("otp")
                                        setError("")
                                    }}
                                    className="flex-1 mr-2"
                                >
                                    Back
                                </Button>
                                <Button type="submit" className="flex-1">
                                    Change Password
                                </Button>
                            </div>
                            <div className={"p-1 text-red-500"}>{error}</div>
                        </CardContent>
                    </form>
                )}
            </Card>
        </div>
    );
};

export default ForgotPasswordFlow;
