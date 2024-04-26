/**
 * File Description: Home page
 * File version: 1.0
 * Contributors:
 */

import React from 'react';
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";

/**
 * Home page which is also the landing page
 */
export const HomePage = () => {
    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            <div className="search-bar"><input type="search" name="home-search" id="home-search" className='search-input' onChange={(e) => setSearchQuery(e.target.value)} placeholder="Name, Description, etc ..."></input></div>
        </WhiteBackground>
    );
};

export default HomePage;