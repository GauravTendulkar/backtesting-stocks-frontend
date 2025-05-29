"use client";

import React, { forwardRef } from 'react';
import { useState, useRef, useEffect } from 'react';
// Import FontAwesomeIcon and the search icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { Button } from './ui/button';
import { Input } from './ui/input';

const SearchDropdown = forwardRef(({ className, children, size , ...props }, ref) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    // Ref for the search input field and the dropdown container
    const searchInputRef = useRef(null);
    const dropdownRef = useRef(null); // Reference for the dropdown

    const [options, setOptions] = useState(props.arrayPass);

    useEffect(() => {
        setOptions(props.arrayPass);
    }, [props.arrayPass]);

    // Add a click listener to close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        // Add the event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup listener on unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    // Filter options based on the search term
    const o = (obj) => {
        if (obj && obj.search) {
            return obj.search.some((item) =>
                item.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return false;
    };

    const filteredOptions = Array.isArray(options) ? options.filter(o) : [];

    // Handle dropdown toggle
    const toggleDropdown = () => {

        setIsOpen(!isOpen);
        setSearchTerm('');

        updateDocHeight();

        window.addEventListener("resize", updateDocHeight);

        // Add event listener for scroll (if needed)
        window.addEventListener("scroll", updateDocHeight);
        window.addEventListener("click", updateDocHeight);
        // updateDocHeight();
        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener("resize", updateDocHeight);
            window.removeEventListener("click", updateDocHeight);
            window.removeEventListener("scroll", updateDocHeight);
        };
    };

    // Focus on the search input when the dropdown is opened
    useEffect(() => {

        if (isOpen && searchInputRef.current) {
            searchInputRef.current.focus();

        }

        if (isOpen) {
            updateDocHeight();
        }
    }, [isOpen]);

    // Handle option selection
    const handleOptionClick = (option) => {
        props.onChange(option);
        setSearchTerm('');
        setIsOpen(false);
    };


    // for dropdown to shift when out of screen-----------------------------------------------------------------

    const popoverRef = useRef(null);
    const triggerRef = useRef(null);
    const [isOutOfViewport, setIsOutOfViewport] = useState(false);



    const updateDocHeight = () => {
        if (popoverRef.current && triggerRef.current) {
            const refValue = popoverRef.current.getBoundingClientRect();
            const refValueTrigger = triggerRef.current.getBoundingClientRect();
            // Check if the dropdown is out of the viewport
            //   console.log("render")
            //   console.log( refValueTrigger.bottom)
            //   console.log(refValue.bottom - refValue.top)

            const isOut = (document.documentElement.clientHeight - refValueTrigger.bottom) < (refValue.bottom - refValue.top);
            setIsOutOfViewport(isOut);
        }
    };


    useEffect(() => {
        // Set initial value
        updateDocHeight();

        window.addEventListener("resize", updateDocHeight);

        // Add event listener for scroll (if needed)
        window.addEventListener("scroll", updateDocHeight);
        window.addEventListener("click", updateDocHeight);



        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener("resize", updateDocHeight);
            window.removeEventListener("click", updateDocHeight);
            window.removeEventListener("scroll", updateDocHeight);
        };
    }, []);










    return (
        <div className="relative " ref={dropdownRef}>
            {/* Select input */}
            {/* <button
                ref={triggerRef}
                value={selectedOption}
                onClick={toggleDropdown}
                className="py-2 px-3 text-text-color bg-primary-color hover:bg-primary-color-1 rounded-md focus:outline-none focus:ring-2 focus:accent"
            >
                {'Select an Option'}
            </button> */}

            {/* <div className="relative  group my-2 mx-1">
                <button placeholder={"Add"} ref={triggerRef} onClick={toggleDropdown} className="px-4 py-2  items-center justify-center rounded-lg border text-text-color bg-primary-color hover:bg-primary-color-1">
                <Plus />
                </button>

                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Add
                </div>
            </div> */}



            {/* <Button placeholder={"Add"} ref={triggerRef} onClick={toggleDropdown} className="">
                {children}
            </Button> */}

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button ref={triggerRef} onClick={toggleDropdown} className="" size={size}>
                            {children}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{props.textForTooltip}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            {/* Dropdown menu */}
            {isOpen && (
                <div ref={popoverRef} className={`absolute z-50 mt-1 border bg-card text-card-foreground shadow min-w-max ${isOutOfViewport ? 'bottom-full' : 'top-full'}`}>
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
                                onClick={() => handleOptionClick(JSON.parse(option.value))}
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
