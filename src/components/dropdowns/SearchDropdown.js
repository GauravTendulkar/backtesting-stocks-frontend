"use client";

import React, { forwardRef } from 'react';
import { useState, useRef, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Input } from '../ui/input';
import { Button } from '../ui/button';


const SearchDropdown = forwardRef(({ className = "", size = "", children, valueArray, onChange = () => { } }, ref) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isOutOfViewport, setIsOutOfViewport] = useState(false);

    const searchInputRef = useRef(null);
    const dropdownRef = useRef(null);
    const popoverRef = useRef(null);
    const triggerRef = useRef(null);

    const [options, setOptions] = useState(valueArray);

    // Update options when props change
    useEffect(() => {
        setOptions(valueArray);
    }, [valueArray]);

    // Handle clicks outside and viewport updates
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        const updateDocHeight = () => {
            if (popoverRef.current && triggerRef.current && isOpen) {
                const dropdownRect = popoverRef.current.getBoundingClientRect();
                const triggerRect = triggerRef.current.getBoundingClientRect();
                const viewportHeight = document.documentElement.clientHeight;

                const spaceBelow = viewportHeight - triggerRect.bottom;
                const spaceAbove = triggerRect.top;

                // Determine if dropdown should be displayed above or below
                // console.log("setIsOutOfViewport", spaceBelow < dropdownRect.height && spaceAbove > dropdownRect.height)
                setIsOutOfViewport(
                    spaceBelow < dropdownRect.height && spaceAbove > dropdownRect.height
                );
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('resize', updateDocHeight);
        window.addEventListener('scroll', updateDocHeight);

        // Initial check
        updateDocHeight();

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('resize', updateDocHeight);
            window.removeEventListener('scroll', updateDocHeight);
        };
    }, [isOpen]);

    // Improved options filter
    const filteredOptions = Array.isArray(options)
        ? options.filter(option =>
            option?.search?.some(item =>
                item.toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        : [];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        setSearchTerm('');
    };

    // Focus search input when dropdown opens
    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isOpen]);

    const handleOptionClick = (option) => {
        onChange(option);
        setSearchTerm('');
        setIsOpen(false);
    };

    return (
        <div className="relative overflow-visible" ref={dropdownRef}>

            <Button ref={triggerRef} onClick={toggleDropdown} className={`${className} `} size={size} >
                {children}
            </Button>


            {/* Dropdown menu */}
            {isOpen && (
                <div ref={popoverRef} className={`absolute z-50 mt-1 border bg-card text-card-foreground shadow min-w-max ${isOutOfViewport ? 'bottom-full' : ''}`}>
                    {/* Search bar inside dropdown */}
                    <div className="px-3 py-2 flex items-center">
                        <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
                        <Input
                            type="text"
                            ref={searchInputRef}
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className=""
                        />
                    </div>

                    {/* Options list */}
                    <ul className="max-h-60 overflow-y-auto">
                        {filteredOptions.map((option, index) => (
                            <li
                                key={index}
                                onClick={() => handleOptionClick(option.value)}
                                className="cursor-pointer px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>


    );
}
);

export default SearchDropdown;
