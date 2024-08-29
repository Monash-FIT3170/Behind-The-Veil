/**
 * File Description: Dashboard Filter Search Bar React component
 * File version: 1.0
 * Contributors: Phillip
 * Credit: Lucas, Nikki
 */

import React, { useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import Input from "../input/Input";
import Button from "../button/Button";

const FilterLocationSearchBar = ({
  suggestionsDown = true,
  defaultYear = "all_years",
  servedLocationList,
  servedYearList,
}) => {
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchYear, setSearchYear] = useState(null);
  const [filteredLocations, setFilteredLocations] = useState([]);

  const handleSearchYearChange = (event) => {
    setSearchYear(event.target.value);

    // on change search type, also clear current suggestions
    setFilteredSuggestions([]);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      const results = servedLocationList.filter((location) =>
        location.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredLocations(results);
    } else {
      setFilteredLocations([]);
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilteredLocations([]);
  };

  const onClickInput = () => {
    if (searchTerm !== "") {
      const results = servedLocationList.filter((location) =>
        location.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredLocations(results);
    } else {
      setFilteredLocations([]);
    }
  };

  // when a suggestion is selected, use the value of the suggestion as the input, to trigger the use effect that trigger
  // on input change above
  const handleSuggestionSelect = (location) => {
    setSearchTerm(location);
    setFilteredLocations([]);
  };

  let ulClassnames = "w-[200px] sm:w-[35vw] z-[29] absolute flex";
  let liClassnames =
    "bg-white w-full h-10 border-light-grey border-2 p-2 main-text text-dark-grey line-clamp-1 break-words hover:bg-white-hover transition duration-300 ease-in-out cursor-pointer";

  if (suggestionsDown) {
    ulClassnames = classNames(ulClassnames, "top-12 flex-col");
    liClassnames = classNames(liClassnames, "border-t-0");
  } else {
    ulClassnames = classNames(
      ulClassnames,
      "bottom-[calc(100%+12px)] flex-col-reverse"
    );
    liClassnames = classNames(liClassnames, "border-b-0");
  }

  // handler for when user clicks OFF the search bar input (hide the suggestions)
  const onBlurInput = (event) => {
    // get the element that user has clicked on
    const clickTarget = event.relatedTarget;

    // check if it is a suggestion (if it is a suggestion do NOT clear the list because then the suggestion
    // will disappear before click can be registered
    if (
      clickTarget &&
      clickTarget.getAttribute("name") === "suggestion-list-item"
    ) {
      return;
    }
    // in all other cases, empty/hide suggestions
    setTimeout(() => {
      setFilteredLocations([]);
    }, 100);
  };

  const handleButtonClickOrSubmit = () => {};

  return (
    <>
      <div
        className={"flex flex-col items-center justify-center"}
        onBlur={onBlurInput}
      >
        <form className="flex h-12">
          {/* The search input field */}
          <Input
            type="search"
            id={"search-input"}
            className="rounded-r-none border-r-0 w-[200px] sm:w-[35vw]"
            value={searchTerm}
            onChange={handleInputChange}
            onClick={onClickInput}
          />

          {/* The reset button */}
          <button
            type="button"
            className="input-base flex justify-center items-center w-12 border-l-0 rounded-l-none"
            onClick={handleReset}
          >
            <XMarkIcon className="size-7 stroke-2 rounded-full p-1 hover:bg-white-hover active:bg-light-grey-hover transition duration-200 ease-in-out" />
          </button>
        </form>

        {/* Suggestions dropdown */}
        {filteredLocations.length > 0 && (
          <ul className={ulClassnames}>
            {filteredLocations.map((location, index) => (
              <li
                key={index}
                className={liClassnames}
                name={"suggestion-list-item"}
                onClick={() => handleSuggestionSelect(location)}
              >
                {location}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* search button + search type */}
      <div className="flex flex-row items-center justify-center gap-3">
        <select
          defaultValue={defaultYear}
          onChange={handleSearchYearChange}
          className="input-base w-28"
        >
          {servedYearList.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
          <option value="all_years">All Years</option>
        </select>
        <Button
          className="flex justify-center items-center rounded-full h-12 w-12 p-2
                            bg-secondary-purple hover:bg-secondary-purple-hover"
          onClick={handleButtonClickOrSubmit}
        >
          <MagnifyingGlassIcon className="icon-base" />
        </Button>
      </div>
    </>
  );
};

export default FilterLocationSearchBar;
