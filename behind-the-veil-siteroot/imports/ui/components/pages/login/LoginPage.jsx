/**
 * File Description: Login page
 * File version: 1.0
 * Contributors:
 */

import React from 'react';
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";

/**
 * Page where user can sign in to their account
 */
export const LoginPage = () => {
    return (
        // if window size is SMALLER than a large screen (default variable for large in tailwind lg:1024px),
        // then use center aligned and no visuals on the left so the inputs aren't all squished
        <WhiteBackground pageLayout={window.innerWidth <= 1024 ? PageLayout.SMALL_CENTER : PageLayout.SMALL_RIGHT}>
            {/*you MUST keep this div and put everything on the left side (e.g. the visual) of it*/}
            <div className="translate-x-1/2 translate-y-[80vh]">
                <span>Sign In Page Visual here!!</span>
            </div>
            {/*you MUST keep this div and put everything on the right side inside of it*/}
            <div>
                <span>Sign In Page to be done!!</span>
            </div>
        </WhiteBackground>
    );
};

export default LoginPage;