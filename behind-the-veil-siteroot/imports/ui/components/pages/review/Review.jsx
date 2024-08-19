// TODO: page for adding and viewing reviews
// refer to add/edit gallery post for routing and how to implement it for 
// showing addition or view or review

/**
 * File Description: Review component
 * File version: 1.0
 * Contributors: Vicky
 */

import React from 'react';

import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";

/**
 * Component for reviews
 */
export const Review = () => {
    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            <div>Yay we're in the review page</div>
        </WhiteBackground>
    )
}

export default Review;