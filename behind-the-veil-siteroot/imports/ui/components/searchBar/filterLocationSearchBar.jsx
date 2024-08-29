/**
 * File Description: Search Bar React component
 * File version: 1.0
 * Contributors: Phillip
 * Credit/Inspiration: Lucas, Nikki
 */

import React, { useMemo, useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import Input from "../input/Input";
import Button from "../button/Button";
import UrlBasePath from "../../enums/UrlBasePath";
import { useNavigate } from "react-router-dom";
import { useServices, useUsers } from "../DatabaseHelper";
import { getSearchSuggestions } from "../util";
import "./searchBar.css";

/**
 * General Search Bar component for all required instances of the searching in the app.
 * Works with enter button on keyboard (Requires a separate button for users who use mouse click)
 * @param className - custom classes for the search input field
 * @param defaultType - the default search type; either 'services' or 'artist'
 * @param placeholder - placeholder text for search bar
 * @param startingValue - initial value/search input inside search bar
 * @param suggestionsDown - true if suggestions propagates downwards, false if upwards (upwards ONLY configured for home page)
 * @param searchBarProps encompasses all other props supplied and applies them to the search input field
 */
const FilterSearchBar = ({
  classnames,
  defaultType = "services",
  placeholder,
  startingValue,
  suggestionsDown,
  ...searchBarProps
}) => {
  let navigate = useNavigate();

  // if type is not a valid value, default to services
  if (defaultType !== "services" && defaultType !== "artists") {
    defaultType = "services";
  }

  // creates a state of the input value for the search bar
  const [inputValue, setInputValue] = useState(startingValue);
  const [searchType, setSearchType] = useState(defaultType);

  // load data
  const userFilter = { "profile.type": "artist" };
  const { isLoading: isLoadingArtists, usersData } = useUsers(
    "all_artists",
    [],
    userFilter
  );

  const serviceFilter = { serviceActive: true };
  const { isLoading: isLoadingServices, servicesData } = useServices(
    "active_services",
    [],
    serviceFilter,
    true
  );

  // variables set up for suggestions
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const maxSuggestion = 10;
  const fullSuggestions = useMemo(() => {
    return getSearchSuggestions(searchType, usersData, servicesData);
  }, [searchType, isLoadingArtists, isLoadingServices]);

  /**
   * this function is used when the user wants to submit the value in the search bar, either by enter key or a button
   * Alter this function with whatever data manipulation is needed to be done with the input value
   *
   * If not provided with a new Value, the function looks for the state of inputValue (which may not be updated yet)
   */
  const handleButtonClickOrSubmit = (event, newValue) => {
    event ? event.preventDefault() : null; // This line is important as it prevents the automatic submit for forms which reloads the page

    if (searchType === "services") {
      navigate(
        "/" +
          UrlBasePath.SERVICES +
          "/?search=" +
          (newValue ? newValue : inputValue)
      );
    } else if (searchType === "artists") {
      navigate(
        "/" +
          UrlBasePath.ARTISTS +
          "/?search=" +
          (newValue ? newValue : inputValue)
      );
    }
    setFilteredSuggestions([]);
  };

  const onClickInput = () => {
    // if it has any input, display suggestions
    if (inputValue !== "") {
      // Filter suggestions based on input value
      const filteredSuggestions = fullSuggestions.filter((suggestion) => {
        // filter suggestions based on main or sub
        const matchMain = suggestion.main
          .toLowerCase()
          .includes(inputValue.toLowerCase());
        const matchSub = suggestion.sub
          ? suggestion.sub.toLowerCase().includes(inputValue.toLowerCase())
          : false;
        return matchMain || matchSub;
      });
      setFilteredSuggestions(filteredSuggestions);
    } else {
      setFilteredSuggestions([]);
    }
  };

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
    setFilteredSuggestions([]);
  };

  // this function updates the state when input changes
  const handleInputChange = (event) => {
    const newInput = event.target.value;
    setInputValue(newInput);

    // update suggestions based on input value
    if (newInput !== "") {
      const filteredSuggestions = fullSuggestions.filter((suggestion) => {
        // filter suggestions based on if it matches either main or sub criteria
        const matchMain = suggestion.main
          .toLowerCase()
          .includes(newInput.toLowerCase());
        const matchSub = suggestion.sub
          ? suggestion.sub.toLowerCase().includes(newInput.toLowerCase())
          : false;
        return matchMain || matchSub;
      });
      setFilteredSuggestions(filteredSuggestions);
    } else {
      setFilteredSuggestions([]);
    }
  };

  // search type input handler
  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);

    // on change search type, also clear current suggestions
    setFilteredSuggestions([]);
  };

  // Function that resets the input value of the search bar
  const handleReset = () => {
    setInputValue("");
    setFilteredSuggestions([]);
  };

  // when a suggestion is selected, use the value of the suggestion as the input, to trigger the use effect that trigger
  // on input change above
  const handleSuggestionSelect = (value) => {
    setInputValue(value.main);
    setFilteredSuggestions([]);
    handleButtonClickOrSubmit(null, value.main);
  };

  // when finished loading data
  if (!isLoadingServices && !isLoadingArtists) {
    // load the css of the suggestions depending on if it goes UP or down
    let ulClassnames = "w-[248px] sm:w-[calc(35vw+48px)] z-[29] absolute flex";
    let liClassnames =
      "bg-white w-full h-10 border-light-grey border-2 p-2 main-text text-dark-grey " +
      "line-clamp-1 break-words hover:bg-white-hover transition duration-300 ease-in-out cursor-pointer";

    if (suggestionsDown) {
      ulClassnames = classNames(ulClassnames, "top-48 flex-col");
      liClassnames = classNames(liClassnames, "border-t-0");
    } else {
      //
      ulClassnames = classNames(
        ulClassnames,
        "bottom-[390px] sm:bottom-[334px] md:bottom-[274px] flex-col-reverse"
      );
      liClassnames = classNames(liClassnames, "border-b-0");
    }
    sample_years = ["2012", "2014"];

    return (
      <div className="flex flex-col items-center justify-start md:flex-row md:items-start md:justify-center gap-3">
        {/* input + suggestion div */}
        <div
          className={"flex flex-col items-center justify-center"}
          onBlur={onBlurInput}
        >
          <form className="flex h-12" onSubmit={handleButtonClickOrSubmit}>
            {/* The search input field (i.e. the search bar) */}
            <Input
              {...searchBarProps}
              type="search"
              id={"search-input"}
              className={classNames(
                "rounded-r-none border-r-0 w-[200px] sm:w-[35vw]",
                classnames
              )}
              placeholder={placeholder}
              value={inputValue}
              onChange={handleInputChange}
              onClick={onClickInput}
            />

            {/* The reset button which resets the value of the search input field to an empty string */}
            <button
              type="button"
              className={
                "input-base flex justify-center items-center w-12 border-l-0 rounded-l-none"
              }
              onClick={handleReset}
            >
              <XMarkIcon
                className="size-7 stroke-2 rounded-full p-1
                        hover:bg-white-hover active:bg-light-grey-hover transition duration-200 ease-in-out"
              ></XMarkIcon>
            </button>
          </form>

          {/* suggestion component */}
          <ul className={ulClassnames}>
            {filteredSuggestions
              ? filteredSuggestions.map((suggestion, index) =>
                  index <= maxSuggestion ? (
                    <li
                      tabIndex={0}
                      key={suggestion.main}
                      name={"suggestion-list-item"}
                      className={liClassnames}
                      onClick={() => handleSuggestionSelect(suggestion)}
                    >
                      {searchType === "artists"
                        ? `${suggestion.sub} (@${suggestion.main})`
                        : suggestion.main}
                    </li>
                  ) : null
                )
              : null}
          </ul>
        </div>

        {/* search button + search type */}
        <div className="flex flex-row items-center justify-center gap-3">
          <select
            defaultValue={defaultType}
            onChange={handleSearchTypeChange}
            className="input-base w-28"
            placeholder="Year"
          >
            {sample_years.map((year, index) => (
              <option value={year}>{year}</option>
            ))}
            <option value="artists">All Years</option>
          </select>
          <Button
            className="flex justify-center items-center rounded-full h-12 w-12 p-2
                            bg-secondary-purple hover:bg-secondary-purple-hover"
            onClick={handleButtonClickOrSubmit}
          >
            <MagnifyingGlassIcon className="icon-base" />
          </Button>
        </div>
      </div>
    );
  }
};

export default FilterSearchBar;
