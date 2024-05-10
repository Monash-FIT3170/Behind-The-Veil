/**
 * File Description: Search Bar React component
 * File version: 1.1
 * Contributors: Lucas, Nikki
 */

import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import "./searchBar.css";
import Input from "../input/Input";

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
        <form className="flex h-12" onSubmit={handleSubmit}>
        {/* The search input field (i.e. the search bar) */}
            <Input
                {...searchBarProps}
                type="search"
                className={classNames("rounded-r-none border-r-0 w-[250px] sm:w-[35vw] ", className)}
                placeholder={placeholderName}
                value={value}
                onChange={onChange}
            />
        {/* The reset button which resets the value of the search input field to an empty string */}
            <button type="button"
                    className={"input-base flex justify-center items-center w-12 border-l-0 rounded-l-none"}
                    onClick={handleReset}>
                <XMarkIcon className="size-7 stroke-2 rounded-full p-1
                hover:bg-white-hover active:bg-light-grey-hover transition duration-200 ease-in-out"></XMarkIcon>
            </button>
        </form>
    );
};

export default SearchBar;
