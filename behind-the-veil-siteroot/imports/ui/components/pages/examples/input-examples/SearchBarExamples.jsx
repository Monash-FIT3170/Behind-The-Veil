/**
 * File Description: Search Bar React component examples
 * File version: 1.0
 * Contributors: Lucas
 */

import React, {useState} from "react";
import SearchBar from "../../../searchBar/searchBar.jsx";
import Button from "../../../button/Button.jsx";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";

const SearchBarExamples = () => {
    // creates a state of the input value for the search bar
    const [inputValue, setInputValue] = useState("");

    /**
     * this function is used when the user wants to submit the value in the search bar, either by enter key or a button
     * Alter this function  with whatever data manipulation is needed to be done with the input value
     */

    const handleButtonClickOrSubmit = (event) => {
        event.preventDefault(); // This line is important as it prevents the automatic submit for forms which reloads the page
        console.log(inputValue);
    };

    // this function updates the inputValue state when input changes
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3">
            <SearchBar
                value={inputValue}
                onChange={handleInputChange}
                handleSubmit={handleButtonClickOrSubmit}
                placeholderName="Basic Search Bar"
            ></SearchBar>
            <Button
                className="flex justify-center items-center rounded-full h-12 w-12 p-2
                            bg-secondary-purple hover:bg-secondary-purple-hover"
                onClick={handleButtonClickOrSubmit}>
                <MagnifyingGlassIcon className="icon-base"/>
            </Button>
        </div>
    );
};

export default SearchBarExamples;
