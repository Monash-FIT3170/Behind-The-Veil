/**
 * File Description: choose account type page
 * File version: 1.0
 * Contributors: Ryan
 */

import React from 'react';
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";

/**
 * Page where user can sign in to their account
 */
export const ChooseAccountTypePage = () => {
    return (
        // if window size is SMALLER than a large screen (default variable for large in tailwind lg:1024px),
        // then use center aligned and no visuals on the left so the inputs aren't all squished
        <WhiteBackground pageLayout={window.innerWidth <= 1024 ? PageLayout.SMALL_CENTER : PageLayout.SMALL_RIGHT}>
            {/*you MUST keep this div and put everything on the left side (e.g. the visual) of it*/}
            <div className="hidden lg:flex translate-x-1/2 translate-y-[80vh]">
                {/*You might have to alter the above translation values or something to make sure that the visual
                doesn't move when changing screen size*/}
                <span>Registration Page Visual here!!</span>
            </div>
            {/*you MUST keep this div and put everything on the right side inside of it*/}
            {/* Account type selection (right side) */}
            <div style={{ textAlign: "center", paddingTop: "50px" }}>
                {/* Title */}
                <div className="title-text" style={{ marginBottom: "20px" }}>Choose Account Type</div>

                {/* Buttons and labels */}
                <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                    {/* Artist Button */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Button
                            type="button"
                            className="bg-secondary-purple hover:bg-secondary-purple-hover outline outline-2 outline-secondary-purple"
                            style={{ width: "120px", height: "120px", borderRadius: "50%", marginBottom: "10px" }}
                        >
                            Artist
                        </Button>
                        <label htmlFor="artist" className="main-text">I want to provide my services</label>
                    </div>

                    {/* Bride Button */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Button
                            type="button"
                            className="bg-secondary-purple hover:bg-secondary-purple-hover outline outline-2 outline-secondary-purple"
                            style={{ width: "120px", height: "120px", borderRadius: "50%", marginBottom: "10px" }}
                        >
                            Bride
                        </Button>
                        <label htmlFor="bride" className="main-text">I want to make bookings for services</label>
                    </div>
                </div>
            </div>
        </WhiteBackground>
    );
};

export default ChooseAccountTypePage;