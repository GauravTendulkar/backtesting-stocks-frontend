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

    useEffect(() => {
        setOptions(valueArray);
    }, [valueArray]);

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

                setIsOutOfViewport(
                    spaceBelow < dropdownRect.height && spaceAbove > dropdownRect.height
                );
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('resize', updateDocHeight);
        window.addEventListener('scroll', updateDocHeight);

        updateDocHeight();

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('resize', updateDocHeight);
            window.removeEventListener('scroll', updateDocHeight);
        };
    }, [isOpen]);

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
        <div className="relative" ref={dropdownRef}>
            <Button
                ref={triggerRef}
                onClick={toggleDropdown}
                className={`${className} rounded-md px-3 py-2`}
                size={size}
            >
                {children}
            </Button>

            {isOpen && (
                <div
                    ref={popoverRef}
                    className={`absolute z-50 w-64 mt-2 rounded-md border bg-card text-card-foreground shadow-lg ${isOutOfViewport ? 'bottom-full mb-2' : ''}`}
                >
                    {/* Search bar */}
                    <div className="flex items-center px-3 py-2 border-b">
                        <FontAwesomeIcon icon={faSearch} className="text-muted-foreground mr-2" />
                        <Input
                            type="text"
                            ref={searchInputRef}
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="h-8 px-2 py-1 text-sm"
                        />
                    </div>

                    {/* Options list */}
                    <ul className="max-h-60 overflow-y-auto">
                        {filteredOptions.map((option, index) => (
                            <li
                                key={index}
                                onClick={() => handleOptionClick(option.value)}
                                className="cursor-pointer px-4 py-2 text-sm hover:bg-muted hover:text-foreground transition-colors"
                            >
                                {option.label}
                            </li>
                        ))}
                        {filteredOptions.length === 0 && (
                            <li className="px-4 py-2 text-muted-foreground text-sm italic">No results found</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
});

export default SearchDropdown;
