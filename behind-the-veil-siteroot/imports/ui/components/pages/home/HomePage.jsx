/**
 * File Description: Home page
 * File version: 1.0
 * Contributors: Lucas
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
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
 * TODO: update navigation bar when routing to different pages
 */
export const HomePage = () => {
    // Starts the index for the image array at 0
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // creates a state of the input value for the search bar
    const [inputValue, setInputValue] = useState("");

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
     * Alter this function  with whatever data manipulation is needed to be done with the input value
     */

    const handleButtonClickOrSubmit = (e) => {
        e.preventDefault(); // This line is important as it prevents the automatic submit for forms which reloads the page
        console.log(inputValue);
    };

    // this function updates the inputValue state when input changes
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            {/* Container for the images and the left and right buttons for sort through images */}
            <div className="inline-flex items-center justify-center h-[25rem] md:h-[30rem]">
                <div className="hidden md:flex md:items-start md:justify-center md:w-1/6">
                    <Button onClick={goToPreviousImage} className="bg-white">
                        <ChevronLeftIcon className="size-10 stroke-[4]" />
                    </Button>
                </div>
                <div className="inline-flex justify-center w-full md:w-4/6 h-full">
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
                    <div className="flex md:items-center h-full">
                        <img
                            src={images[currentImageIndex]}
                            className="object-cover w-full h-96 md:w-96 rounded-[2rem] z-10 shadow-2xl"
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
                <div className="hidden md:flex md:items-start md:justify-center md:w-1/6">
                    <Button onClick={goToNextImage} className="bg-white">
                        <ChevronRightIcon className="size-10 stroke-[4]" />
                    </Button>
                </div>
            </div>
            {/* Container for left and right buttons to sort through images when screen is smaller than medium size*/}
            <div className="inline-flex flex-row items-center justify-center md:hidden">
                <div className="flex items-start justify-center w-[45%]">
                    <Button onClick={goToPreviousImage} className="bg-white">
                        <ChevronLeftIcon className="size-10 stroke-[4]" />
                    </Button>
                </div>
                <div className="flex items-end justify-center w-[45%]">
                    <Button onClick={goToNextImage} className="bg-white">
                        <ChevronRightIcon className="size-10 stroke-[4]" />
                    </Button>
                </div>
            </div>
            {/* Container for the title text on the home page (positioned absolute) */}
            <div
                className="absolute rounded-[2rem] bg-gradient-to-r from-purple-400/40 to-indigo-400/40 backdrop-filter backdrop-blur-md z-20 main-text text-white top-[45%] text-xl  w-[95%] left-[2.5%]
            sm:top-[50%] sm:left-[20%] sm:w-[60%] 
            md:top-[55%] md:text-2xl
            lg:h-[15%] lg:text-3xl lg:top-[50%]
            xl:left-[25%] xl:w-[50%] xl:h-[20%] xl:text-5xl"
            >
                <p className="text-center h-1/2 pt-2 lg:pt-4">
                    Make Yourself Perfect
                </p>
                <p className="inline-flex items-center justify-center text-center gap-x-5 h-1/2 w-full bottom-0 pb-2 lg:pb-4">
                    <SparklesIcon
                        className="size-6 md:size-8 lg:size-10 xl:size-14"
                        fill="white"
                    />
                    Behind The Veil
                    <SparklesIcon
                        className="size-6 md:size-8 lg:size-10 xl:size-14"
                        fill="white"
                    />
                </p>
            </div>
            {/* Container for the search bar, drop down and search button */}
            <div className="container mx-auto px-20">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <SearchBar
                        value={inputValue}
                        onChange={handleInputChange}
                        handleSubmit={handleButtonClickOrSubmit}
                        placeholderName="Name, Description, etc..."
                    ></SearchBar>
                    <select className="border-2 border-gray-300 rounded h-8 w-[40vw] sm:w-[200px] main-text">
                        <option value="artists">Artists</option>
                        <option value="services">Services</option>
                    </select>
                    <Button
                        className="bg-secondary-purple hover:bg-secondary-purple-hover rounded-full h-8 w-8 px-1.5 py-0"
                        onClick={handleButtonClickOrSubmit}
                    >
                        <MagnifyingGlassIcon className="size-5" />
                    </Button>
                </div>
            </div>
            {/* Container for the Browse services and Browse artists buttons */}
            <div className="container mx-auto pt-8">
                <form className="flex items-center justify-center flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-8">
                    <Link to="/services">
                        <Button
                            className="inline-flex items-center justify-center h-10 w-64 main-text px-0 py-0 gap-x-2"
                            onClick={() => {
                                autoCloseMenu();
                                setActiveTab("services");
                            }}
                        >
                            <PaintBrushIcon className="size-5" />
                            Browse Services
                        </Button>
                    </Link>

                    <Link to="/artists">
                        <Button
                            className="inline-flex items-center justify-center h-10 w-64 main-text px-0 py-0 gap-x-2"
                            onClick={() => {
                                autoCloseMenu();
                                setActiveTab("artists");
                            }}
                        >
                            <IdentificationIcon className="size-5" />
                            Browse Artists
                        </Button>
                    </Link>
                </form>
            </div>
        </WhiteBackground>
    );
};

export default HomePage;
