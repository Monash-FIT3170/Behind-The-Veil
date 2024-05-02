/**
 * File Description: Search Bar React component
 * File version: 1.0
 * Contributors: Lucas
 */

import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import "./searchBar.css";

/**
 * General Search Bar component for all required instances of the searching in the app.
 * Works with enter button on keyboard (Requires a separate button for users who use mouse click)
 * @param formClassName custom classes for the form 
 * @param searchClassName custom classes for the search input field
 * @param resetClassName custom classes for the reset button
 * @param placeholderName the placeholder name for the search input field (i.e. what the user will see if the input field is empty)
 * @param value the value of the input field (whatever the customer inputs)
 * @param onChange the function that occurs when the search input field changes
 * @param searchBarProps encompasses all other props supplied and applies them to the search input field 
 * 
 */
const SearchBar = ({
    formClassName,
    searchClassName,
    resetClassName,
    placeholderName,
    value,
    onChange,
    ...searchBarProps
}) => {

    // Function that resets the input value of the search bar
    const handleReset = () => {
        onChange({ target: { value: '' } });
    };

    // Function that logs the value in the search bar to the console
    const handleSubmit = (e) => {
        e.preventDefault(); // prevents the automatic form submit which reloads the page
        console.log(value);
    }

    return (
        // The form which holds the search input field and the reset button
        <form className={formClassName} onSubmit={handleSubmit}> 
        {/* The search input field (i.e. the search bar) */}
            <input
                {...searchBarProps}
                type="search"
                className={searchClassName}
                placeholder={placeholderName}
                value={value}
                onChange={onChange}
            />
        {/* The reset button which resets the value of the search input field to an empty string */}
            <button type="button" className={resetClassName} onClick={handleReset}>
                <XMarkIcon className="size-5 stroke-2"></XMarkIcon>
            </button>
        </form>
    );
};

export default SearchBar;
