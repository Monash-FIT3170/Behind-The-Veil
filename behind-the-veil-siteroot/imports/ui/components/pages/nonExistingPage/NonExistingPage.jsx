/**
 * File Description: Not routed page
 * File version: 1.0
 * Contributors: Nikki
 */

import React from 'react';
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";

/**
 * Page for user to see that they've gone to a non-existing page of the web app
 */
export const NonExistingPage = () => {
    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            This page does not exist! (yet)
        </WhiteBackground>
    );
};

export default NonExistingPage;