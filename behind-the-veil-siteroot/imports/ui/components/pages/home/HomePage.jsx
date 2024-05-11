/**
 * File Description: Home page
 * File version: 1.0
 * Contributors: Lucas
 */

import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {
    ChevronRightIcon,
    ChevronLeftIcon,
    MagnifyingGlassIcon,
    PaintBrushIcon,
    IdentificationIcon,
    SparklesIcon,
} from "@heroicons/react/24/outline";

import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button.jsx";
import SearchBar from "../../searchBar/searchBar.jsx";

// This is the array of paths to the images need on the home page
const images = [
    "/images/pexels-zvolskiy-1721944.jpg",
    "/images/pexels-kristina-polianskaia-2617447-4241704.jpg",
    "/images/pexels-kseniia-lopyreva-3299160-4959838.jpg",
];

/**
 * Home page which is also the landing page for the app.
 *
 * TODO: functioning search bar functionality
 */
export const HomePage = () => {
    // Starts the index for the image array at 0
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // creates a state of the input value for the search bar
    const [inputValue, setInputValue] = useState("");
    const [searchType, setSearchType] = useState("services");
    let navigate = useNavigate();

    // Shifts the index for the image array down 1, or to the final index (array.length - 1) if the index is at 0
    const goToPreviousImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    // Shifts the index for the image array up 1, or to 0 if the index is at array.length - 1
    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    /**
     * this function is used when the user wants to submit the value in the search bar, either by enter key or a button
     * Alter this function with whatever data manipulation is needed to be done with the input value
     */
    const handleButtonClickOrSubmit = (e) => {
        e.preventDefault(); // This line is important as it prevents the automatic submit for forms which reloads the page
        if (searchType === "services") {
            navigate("/services")
        } else if (searchType === "artists") {
            navigate("/artists")
        }
    };

    // this function updates the state when input changes
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearchTypeChange = (e) => {
        setSearchType(e.target.value);
    };

    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            {/* Container for the images and the left and right buttons for sort through images */}
            <div className="inline-flex items-center justify-center h-[25rem] sm:h-[30rem]">
                <div className="hidden sm:flex sm:items-start sm:justify-center sm:w-1/6">
                    <Button onClick={goToPreviousImage}
                            className="bg-transparent hover:bg-white-hover active:bg-light-grey">
                        <ChevronLeftIcon className="size-10 stroke-[4] text-dark-grey"/>
                    </Button>
                </div>
                <div className="inline-flex justify-center w-full sm:w-4/6 h-full">
                    <div className="hidden lg:flex lg:items-start lg:justify-end lg:h-full">
                        <img
                            src={
                                images[
                                    currentImageIndex === 0
                                        ? images.length - 1
                                        : currentImageIndex - 1
                                    ]
                            }
                            className="object-cover h-96 w-72 rounded-[2rem] brightness-50 -mr-16 shadow-2xl"
                        />
                    </div>
                    <div className="flex sm:items-center h-full">
                        <img
                            src={images[currentImageIndex]}
                            className="object-cover w-full h-96 sm:w-96 rounded-[2rem] z-10 shadow-2xl"
                        />
                    </div>
                    <div className="hidden lg:flex lg:items-start lg:h-full">
                        <img
                            src={
                                images[
                                    currentImageIndex === images.length - 1
                                        ? 0
                                        : currentImageIndex + 1
                                    ]
                            }
                            className="object-cover h-96 w-72 rounded-[2rem] brightness-50 -ml-16 shadow-2xl"
                        />
                    </div>
                </div>
                <div className="hidden sm:flex sm:items-start sm:justify-center sm:w-1/6">
                    <Button onClick={goToNextImage}
                            className="bg-transparent hover:bg-white-hover active:bg-light-grey">
                        <ChevronRightIcon className="size-10 stroke-[4] text-dark-grey"/>
                    </Button>
                </div>
            </div>

            {/* Container for left and right buttons to sort through images when screen is smaller than medium size*/}
            <div className="inline-flex flex-row items-center justify-center sm:hidden">
                <div className="flex items-start justify-center w-[45%]">
                    <Button onClick={goToPreviousImage}
                            className="bg-transparent hover:bg-white-hover active:bg-light-grey">
                        <ChevronLeftIcon className="size-10 stroke-[4] text-dark-grey"/>
                    </Button>
                </div>
                <div className="flex items-end justify-center w-[45%]">
                    <Button onClick={goToNextImage}
                            className="bg-transparent hover:bg-white-hover active:bg-light-grey">
                        <ChevronRightIcon className="size-10 stroke-[4] text-dark-grey"/>
                    </Button>
                </div>
            </div>

            {/* Container for the title text on the home page (positioned absolute) */}
            <div className={"flex flex-row items-center justify-center w-full"}>
                <div
                    className={"absolute z-30 main-text text-white text-xl md:text-2xl lg:text-3xl xl:text-5xl " +
                        "left-[16%] top-[45%] w-[68%] " +
                        "sm:left-[16%] sm:top-[56.5%] sm:w-[68%] " +
                        "md:left-[16%] md:top-[56%] md:w-[68%] " +
                        "lg:left-[16%] lg:top-[52.5%] lg:w-[68%] " +
                        "xl:left-[20%] xl:top-[54%] xl:w-[60%] "
                    }>
                    <p className="text-center"> Make Yourself Perfect</p>
                    <p className="inline-flex items-center justify-center text-center gap-x-5 h-1/2 w-full">
                        <SparklesIcon
                            className="size-6 md:size-8 lg:size-10 xl:size-14 text-anything-yellow fill-anything-yellow"/>
                        Behind The Veil
                        <SparklesIcon
                            className="size-6 md:size-8 lg:size-10 xl:size-14 text-anything-yellow fill-anything-yellow"/>
                    </p>
                </div>
                {/*Background blur*/}
                <div className="absolute rounded-full z-[19] blur-md
                    border-main-blue border-2
                    bg-gradient-to-r from-bg-gradient-end/85 to-bg-gradient-start/85
                    left-[16%] top-[42.5%] w-[68%] h-[12%]
                    sm:top-[54%] sm:h-[12%] sm:blur-md
                    md:top-[52.5%] md:h-[15%] md:blur-lg
                    lg:top-[46.5%] lg:h-[22%] lg:blur-xl
                    xl:top-[47.5%] xl:h-[25%] xl:blur-2xl">
                </div>
            </div>

            {/* Container for the search bar, drop down and search button */}
            <div className="container mx-auto px-20">
                <div className="flex flex-col md:flex-row items-center justify-center gap-3">

                    <SearchBar
                        value={inputValue}
                        onChange={handleInputChange}
                        handleSubmit={handleButtonClickOrSubmit}
                        placeholderName="Name, Description, etc..."
                    ></SearchBar>

                    <div className="flex flex-row items-center justify-center gap-3">
                        <select onChange={handleSearchTypeChange} className="input-base w-28">
                            <option value="artists">Artists</option>
                            <option value="services">Services</option>
                        </select>
                        <Button
                            className="flex justify-center items-center rounded-full h-12 w-12 p-2
                            bg-secondary-purple hover:bg-secondary-purple-hover"
                            onClick={handleButtonClickOrSubmit}>
                            <MagnifyingGlassIcon className="size-6 stroke-2"/>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Container for the Browse services and Browse artists buttons */}
            <div className="container mx-auto pt-8">
                <form className="flex items-center justify-center flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-8">
                    <Link to="/services">
                        <Button className="inline-flex items-center justify-center h-10 w-64 main-text px-0 py-0 gap-x-2">
                            <PaintBrushIcon className="size-6 stroke-2"/>
                            Browse Services
                        </Button>
                    </Link>
                    <Link to="/artists">
                        <Button className="inline-flex items-center justify-center h-10 w-64 main-text px-0 py-0 gap-x-2">
                            <IdentificationIcon className="size-6 stroke-2"/>
                            Browse Artists
                        </Button>
                    </Link>
                </form>
            </div>
        </WhiteBackground>
    );
};

export default HomePage;
