import React, {useState} from "react";
import SearchBar from "../../../searchBar/searchBar.jsx";
import Button from "../../../button/Button.jsx";
import {
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";



const SearchBarExamples = () => {
    const [inputValue, setInputValue] = useState('');

  const handleButtonClick = () => {
    // Accessing the input field value
    console.log(inputValue);
  };

  const handleInputChange = (e) => {
    // Updating the inputValue state when input changes
    setInputValue(e.target.value);
  };

    return (
        <div className="flex flex-col gap-3">
            <div className="large-text underline">Search Bar:</div>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3">
                <SearchBar 
                    id="Basic"
                    value={inputValue}
                    onChange={handleInputChange}
                    formClassName="flex h-8 " 
                    searchClassName="border-2 border-gray-300 border-r-0 rounded rounded-r-none main-text align-top h-8 w-[60vw] sm:w-[361px] pl-[10px]" 
                    resetClassName="flex justify-center items-center bg-white main-text border-2 border-gray-300 border-l-0 rounded rounded-l-none h-8 w-[33px] hover:bg-gray-300 active:bg-gray-400" 
                    placeholderName="Basic Search Bar">
                </SearchBar>
                <Button className="bg-secondary-purple hover:bg-secondary-purple-hover rounded-full h-8 w-8 px-1.5 py-0" onClick={handleButtonClick}>
                    <MagnifyingGlassIcon className="size-5 stroke-[3]" />
                </Button>
            </div>
            
        </div>
    )
}

export default SearchBarExamples;