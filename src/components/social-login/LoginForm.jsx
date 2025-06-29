'use client'

import React from 'react';
import { doSocialLogin } from '@/app/actions'; // absolute import for clarity
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const LoginForm = () => {
    return (
        <form
            action={doSocialLogin}
            className="flex justify-center mt-10"
        >
            <Card className="w-full max-w-md p-6 space-y-4 shadow-xl border border-muted">
                <CardContent className="flex flex-col space-y-4">
                    <h2 className="text-xl font-semibold text-center">Hey, Sign In</h2>

                    <Button
                        variant="outline"
                        type="submit"
                        name="action"
                        value="google"
                        className="w-full flex items-center justify-center gap-2"
                    >
                        <img
                            src="https://developers.google.com/identity/images/g-logo.png"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        Login with Google
                    </Button>

                    <Button
                        type="submit"
                        name="action"
                        value="github"
                        className="w-full"
                    >
                        Login with GitHub
                    </Button>
                </CardContent>
            </Card>
        </form>
    );
};

export default LoginForm;
