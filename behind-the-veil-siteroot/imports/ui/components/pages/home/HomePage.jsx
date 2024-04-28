/**
 * File Description: Home page
 * File version: 1.0
 * Contributors:
 */

import React, { useState } from "react";
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button.jsx";
import "./homePage.css";

const images = [
    "/images/pexels-zvolskiy-1721944.jpg",
    "/images/pexels-kristina-polianskaia-2617447-4241704.jpg",
    "/images/pexels-kseniia-lopyreva-3299160-4959838.jpg",
];

/**
 * Home page which is also the landing page
 */
export const HomePage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const goToPreviousImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            <div className="inline-flex items-center justify-center h-xl">
                <div className="flex items-start justify-center w-1/6">
                    <Button onClick={goToPreviousImage}>Prev</Button>
                </div>
                <div className="inline-flex justify-center w-4/6 h-full">
                    <div className="flex items-start justify-end h-full">
                        <img
                            src={
                                images[
                                    currentImageIndex === 0
                                        ? images.length - 1
                                        : currentImageIndex - 1
                                ]
                            }
                            className="object-cover h-96 w-72 rounded-4xl opacity-50 -mr-16 "
                        />
                    </div>
                    <div className="flex items-center h-full">
                        <img
                            src={images[currentImageIndex]}
                            className="object-cover h-96 w-96 rounded-4xl z-10"
                        />
                    </div>
                    <div className="flex items-start h-full">
                        <img
                            src={
                                images[
                                    currentImageIndex === images.length - 1
                                        ? 0
                                        : currentImageIndex + 1
                                ]
                            }
                            className="object-cover h-96 w-72 rounded-4xl opacity-50 -ml-16"
                        />
                    </div>
                </div>
                <div className="flex items-start justify-center w-1/6">
                    <Button onClick={goToNextImage}>Next</Button>
                </div>
            </div>
            <div className="absolute top-4/10 left-1/4 w-1/2 z-20 main-text text-white text-5xl rounded-4xl bg-gradient-to-r from-purple-400/40 to-indigo-400/40"><p className="text-center">Make Yourself Perfect</p><p className="text-center pt-4">Behind The Veil</p></div>
            <div className="container mx-auto px-20">
                <form className="flex items-center justify-center space-x-3">
                    <input
                        className="border-2 border-gray-300 rounded h-8 w-2/5 main-text"
                        type="search"
                        name="home-search"
                        id="home-search"
                        placeholder="Name, Description, etc ..."
                    ></input>
                    <select className="border-2 border-gray-300 rounded h-8 w-1/6 main-text">
                        <option className="main-text" value="all" selected>
                            All
                        </option>
                        <option className="main-text" value="hair">
                            Hair
                        </option>
                        <option className="main-text" value="makeup">
                            Makeup
                        </option>
                    </select>
                    <Button className="bg-secondary-purple hover:bg-secondary-purple-hover rounded-full h-8 w-8"></Button>
                </form>
            </div>
            <div className="container mx-auto pt-8">
                <form className="flex items-center justify-center space-x-8">
                    <Button className="h-10 w-64 main-text px-0 py-0">
                        Browse Services
                    </Button>
                    <Button className="h-10 w-64 main-text px-0 py-0">
                        Browse Artists
                    </Button>
                </form>
            </div>
        </WhiteBackground>
    );
};

export default HomePage;
