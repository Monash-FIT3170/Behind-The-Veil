import React from "react";
import SearchBar from "../../../searchBar/searchBar.jsx";
import Button from "../../../button/Button.jsx";
import {
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const SearchBarExamples = () => {
    return (
        <div className="flex flex-col gap-3">
            <div className="large-text underline">Search Bar:</div>
            <form className="flex space-x-3">
                <SearchBar 
                    formClassName="container h-8 w-[395px]" 
                    searchClassName="border-2 border-gray-300 border-r-0 rounded rounded-r-none main-text align-top h-8 w-[361px] pl-[10px]" 
                    resetClassName="bg-white main-text border-2 border-gray-300 border-l-0 rounded rounded-l-none h-8 w-[33px] hover:bg-gray-300 active:bg-gray-400 px-0 pb-[1px]" 
                    placeholderName="Basic Search Bar">
                </SearchBar>
                <Button className="bg-secondary-purple hover:bg-secondary-purple-hover rounded-full h-8 w-8 px-1.5 py-0">
                    <MagnifyingGlassIcon className="size-5 stroke-[3]" />
                </Button>
            </form>
            
        </div>
    )
}

export default SearchBarExamples;