import React from "react";
import SearchBar from "../../../searchBar/searchBar.jsx";

const SearchBarExamples = () => {
    return (
        <div className="flex flex-col gap-3">
            <div className="large-text underline">Search Bar:</div>
            <SearchBar placeholderName="Basic Search Bar"></SearchBar>
        </div>
    )
}

export default SearchBarExamples;