"use client"

import React, { useContext, useState } from 'react';
import { User, LogOut, Settings, HelpCircle } from 'lucide-react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { TokenContext } from '@/app/context/TokenContext';

const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const { token, removeToken } = useContext(TokenContext);
    const handleSignOut = () => {
        // Remove JWT token from cookies
        // Cookies.remove('jwt_token');
        removeToken()

        // Redirect to sign-in page
        router.push('/signin');
        router.refresh()
    };

    const menuItems = [
        {
            icon: <User className="mr-2 h-4 w-4" />,
            label: 'Profile',
            onClick: () => router.push('/profile')
        },
        {
            icon: <Settings className="mr-2 h-4 w-4" />,
            label: 'Settings',
            onClick: () => router.push('/settings')
        },
        {
            icon: <HelpCircle className="mr-2 h-4 w-4" />,
            label: 'About',
            onClick: () => router.push('/about')
        },
        {
            icon: <LogOut className="mr-2 h-4 w-4" />,
            label: 'Sign Out',
            onClick: handleSignOut
        }
    ];

    return (
        <div className="relative">
            {/* Profile Icon */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 focus:outline-none"
            >
                <User className="h-6 w-6 text-gray-600" />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    item.onClick();
                                    setIsOpen(false);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                            >
                                {item.icon}
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Overlay to close dropdown when clicked outside */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default ProfileDropdown;