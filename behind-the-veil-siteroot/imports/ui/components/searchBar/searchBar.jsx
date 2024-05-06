/**
 * File Description: Search Bar React component
 * File version: 1.0
 * Contributors: Lucas
 */

import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import "./searchBar.css";

/**
 * General Search Bar component for all required instances of the searching in the app.
 * Works with enter button on keyboard (Requires a separate button for users who use mouse click)
 * @param className custom classes for the search input field
 * @param placeholderName the placeholder name for the search input field (i.e. what the user will see if the input field is empty)
 * @param value the value of the input field (whatever the customer inputs)
 * @param onChange the function that occurs when the search input field changes
 * @param handleSubmit the function which dictates what happens when a user submits the value in the search input field
 * @param searchBarProps encompasses all other props supplied and applies them to the search input field 
 */
const SearchBar = ({
    className,
    placeholderName,
    value,
    onChange,
    handleSubmit,
    ...searchBarProps
}) => {

    // Function that resets the input value of the search bar
    const handleReset = () => {
        onChange({ target: { value: '' } });
    };

    return (
        // The form which holds the search input field and the reset button
        <form className="flex h-8" onSubmit={handleSubmit}> 
        {/* The search input field (i.e. the search bar) */}
            <input
                {...searchBarProps}
                type="search"
                className={classNames("border-2 border-gray-300 border-r-0 rounded rounded-r-none main-text align-top h-8 w-[60vw] sm:w-[361px] pl-[10px]", className)}
                placeholder={placeholderName}
                value={value}
                onChange={onChange}
            />
        {/* The reset button which resets the value of the search input field to an empty string */}
            <button type="button" className="flex justify-center items-center bg-white main-text border-2 border-gray-300 border-l-0 rounded rounded-l-none h-8 w-[33px] hover:bg-gray-300 active:bg-gray-400" onClick={handleReset}>
                <XMarkIcon className="size-5 stroke-2"></XMarkIcon>
            </button>
        </form>
    );
};

export default SearchBar;
