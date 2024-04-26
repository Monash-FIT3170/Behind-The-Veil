/**
 * File Description: Login page
 * File version: 1.0
 * Contributors:
 */

import React from 'react';
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button.jsx";

/**
 * Page where user can sign in to their account
 */
export const LoginPage = () => {
    return (
        // if window size is SMALLER than a large screen (default variable for large in tailwind lg:1024px),
        // then use center aligned and no visuals on the left so the inputs aren't all squished
        <WhiteBackground pageLayout={window.innerWidth <= 1024 ? PageLayout.SMALL_CENTER : PageLayout.SMALL_RIGHT}>

            <div className="hidden lg:flex translate-x-1/2 translate-y-[80vh]">
                
                {/*You might have to alter the above translation values or something to make sure that the visual
                doesn't move when changing screen size*/}
                <div className="title-text">Bridal Makeup & Services</div>

            </div>

            <div>

                <div className="title-text">Sign In</div>
                <input type="text" placeholder="Username"></input>
                <input type="text" placeholder="Password"></input>
                <div className="link-text underline">Forgot password?</div>
                <Button className="bg-secondary-purple hover:bg-secondary-purple-hover">Sign in</Button>
                <Button>Register</Button>

            </div>
        </WhiteBackground>
    );
};

export default LoginPage;