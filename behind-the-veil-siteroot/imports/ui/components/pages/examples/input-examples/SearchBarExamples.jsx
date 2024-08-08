/**
 * File Description: Search Bar React component examples
 * File version: 2.0
 * Contributors: Lucas, Nikki
 */

import React from "react";
import SearchBar from "../../../searchBar/searchBar.jsx";

const SearchBarExamples = () => {

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3">
            <SearchBar placeholder={"Any placeholder text here"}/>
        </div>
    );
};

export default SearchBarExamples;
