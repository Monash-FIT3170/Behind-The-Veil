/**
 * File Description: Login page
 * File version: 1.0
 * Contributors:
 */

import React from 'react';
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button.jsx";
import {Cog8ToothIcon} from "@heroicons/react/24/outline"
import ProfilePhoto from '../../profilePhoto/ProfilePhoto.jsx';
import ProfileDisplay from '../../profilePhoto/ProfileDisplay.jsx';

/**
 * Page of a list of Artist cards for users to see
 */
export const BridePage = () => {
    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}> 
            <div className="profile">
                {/* <!-- profile picture --> */}
                <div className="profile-photo">
                    <ProfileDisplay className="h-full w-1/2"></ProfileDisplay>
                </div>
                {/* <!-- settings --> */}
                <div className="corner-button">
                        <Button className="word-icon-button">
                            <span>Settings</span>
                            <span><Cog8ToothIcon className="min-h-4 w-4 cursor-pointer"/></span>
                            </Button>
                </div>
            </div>
        
            <div>
                div for nav bar with four tabs
            </div>


        </WhiteBackground>
    );
};

export default BridePage;