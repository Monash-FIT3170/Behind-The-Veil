/**
 * File Description: Home page
 * File version: 1.0
 * Contributors:
 */

import React from 'react';
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button.jsx";
import image1 from "/images/image1.jpg";
import './homePage.css';

/**
 * Home page which is also the landing page
 */
export const HomePage = () => {
    // console.log(image1);
    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            <div className="container mx-auto px-20 h-96">
                <img src={image1} />
                {/* <img src={process.env.PUBLIC_URL} className="object-scale-down h-48 w-full"/> */}
            </div>
            <div className="container mx-auto px-20">
                <form className="flex items-center justify-center space-x-3">
                    <input className="border-2 border-gray-300 rounded h-8 w-2/5 main-text" type="search" name="home-search" id="home-search" placeholder="Name, Description, etc ..."></input>
                    <select className="border-2 border-gray-300 rounded h-8 w-1/6 main-text">
                        <option className="main-text" value="all" selected>All</option>
                        <option className="main-text" value="hair">Hair</option>
                        <option className="main-text" value="makeup">Makeup</option>
                    </select>
                    <Button className="bg-secondary-purple hover:bg-secondary-purple-hover rounded-full h-8 w-8">
                    </Button>
                </form>
            </div>
            <div className="container mx-auto px-20">
                <form className="flex items-center justify-center space-x-8">
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