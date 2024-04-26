/**
 * File Description: Home page
 * File version: 1.0
 * Contributors:
 */

import React from 'react';
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button.jsx";
import './homePage.css';

/**
 * Home page which is also the landing page
 */
export const HomePage = () => {
    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            <div class="container mx-auto px-20">
                <p class="h-96">image</p>
            </div>
            <div class="container mx-auto px-20">
                <form class="flex items-center justify-center space-x-3">
                    <input class="border-2 border-gray-300 rounded h-8 w-2/5 main-text" type="search" name="home-search" id="home-search" placeholder="Name, Description, etc ..."></input>
                    <select class="border-2 border-gray-300 rounded h-8 w-1/6 main-text">
                        <option class="main-text" value="all" selected>All</option>
                        <option class="main-text" value="hair">Hair</option>
                        <option class="main-text" value="makeup">Makeup</option>
                    </select>
                    <Button className="bg-secondary-purple hover:bg-secondary-purple-hover rounded-full h-8 w-8">
                    </Button>
                </form>
            </div>
            <div class="container mx-auto px-20">
                <form class="flex items-center justify-center space-x-8">
                    <Button className="h-8 w-80 main-text">
                        Browse Services
                    </Button>
                    <Button className="h-8 w-80 main-text">
                        Browse Artists
                    </Button>
                </form>
            </div>
        </WhiteBackground>
    );
};

export default HomePage;