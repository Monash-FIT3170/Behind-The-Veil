/**
 * File Description: Home page
 * File version: 1.2
 * Contributors: Lucas, Nikki
 */

import React, {useState} from "react";
import {Link} from "react-router-dom";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    IdentificationIcon,
    PaintBrushIcon,
    SparklesIcon,
} from "@heroicons/react/24/outline";

import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button.jsx";
import SearchBar from "../../searchBar/searchBar.jsx";
import UrlBasePath from "../../../enums/UrlBasePath";

// This is the array of paths to the images need on the home page
const images = [
    "/images/pexels-zvolskiy-1721944.jpg",
    "/images/pexels-kristina-polianskaia-2617447-4241704.jpg",
    "/images/pexels-kseniia-lopyreva-3299160-4959838.jpg",
];

/**
 * Home page which is also the landing page for the app.
 */
export const HomePage = () => {
    // Starts the index for the image array at 0
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
                            alt={"cover image of a bride"}
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
                            alt={"cover image of a bride"}/>
                    </div>
                    <div className="hidden lg:flex lg:items-start lg:h-full">
                        <img
                            alt={"cover image of a bride"}
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
            <div className={"flex flex-row items-center justify-center w-full cursor-default"}>
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
            <div className="flex items-center justify-center z-50 container mx-auto sm:px-20 xl:mt-20">
                <SearchBar placeholder={"Search SERVICES or ARTISTS"}
                           defaultType={"services" }
                           startingValue={""}
                           suggestionsDown={false}
                />
            </div>

            {/* Container for the Browse services and Browse artists buttons */}
            <div className="container mx-auto pt-8">
                <form
                    className="flex items-center justify-center flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-8">
                    <Link to={"/" + UrlBasePath.SERVICES}>
                        <Button
                            className="inline-flex items-center justify-center h-10 w-64 main-text px-0 py-0 gap-x-2">
                            <PaintBrushIcon className="icon-base"/>
                            Browse Services
                        </Button>
                    </Link>
                    <Link to={"/" + UrlBasePath.ARTISTS}>
                        <Button
                            className="inline-flex items-center justify-center h-10 w-64 main-text px-0 py-0 gap-x-2">
                            <IdentificationIcon className="icon-base"/>
                            Browse Artists
                        </Button>
                    </Link>
                </form>
            </div>

            {/* this is required for the search bar to not move weirdly */}
            <div className={"h-[50px]"} />
        </WhiteBackground>
    );
};

export default HomePage;
