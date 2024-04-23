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
            <span>Home Page to be done!!</span>
        </WhiteBackground>
    );
};

export default HomePage;