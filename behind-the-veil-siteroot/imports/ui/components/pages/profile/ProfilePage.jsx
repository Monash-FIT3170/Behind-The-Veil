/**
 * File Description: Profile page
 * File version: 1.0
 * Contributors: Nikki
 */

import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Tracker} from "meteor/tracker";
import {Meteor} from "meteor/meteor";
import WhiteBackground from "../../whiteBackground/WhiteBackground";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button";
import {Cog8ToothIcon} from "@heroicons/react/24/outline";
import ProfileDisplay from "../../profilePhoto/ProfileDisplay";
import BrideProfileTabs from "./BrideProfileTabs";
import ArtistProfileTabs from "./ArtistProfileTabs";

export const ProfilePage = () => {

    const navigate = useNavigate();

    // get current user information
    const [userInfo, setUserInfo] = useState(
        {"alias": null, "username": null, "type": null}
    );

    // tracker for the required user data updates
    Tracker.autorun(() => {
        const user = Meteor.user();

        if (user) {
            // user data is returned (sometimes it takes a while)
            const username = user.username;
            const userAlias = user.profile.alias;
            const userType = user.profile.type;

            // check if an update to the current user info is required or not (this is needed to prevent inf loop)
            if (userInfo.username !== username || userInfo.alias !== userAlias || userInfo.type !== userType) {
                setUserInfo(
                    {
                        "alias": user.profile.alias,
                        "type": user.profile.type,
                        "username": user.username
                    }
                )
            }
        }
    })

    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            {/*Settings buttons*/}
            <div className="flex items-center justify-end w-full ">
                {/*todo: route button to settings page*/}
                <Button
                    className="flex flex-row justify-center items-center gap-x-1.5 sm:w-36"
                    onClick={() => {
                        navigate('/profile/settings')
                    }}>
                    <Cog8ToothIcon className="icon-base"/>
                    <span className={"hidden sm:flex"}>
                        Settings
                    </span>
                </Button>
            </div>

            {/*Top div where user's info*/}
            <ProfileDisplay imageData={""} userAlias={userInfo.alias} userUsername={userInfo.username}/>

            {/*bottom half where all the tabs are at - depends on the user type */}
            {
                (userInfo.type === "bride") ?
                    <BrideProfileTabs userInfo={userInfo}/> :
                    (userInfo.type === "artist") ?
                        <ArtistProfileTabs userInfo={userInfo}/> :
                        null
            }
        </WhiteBackground>
    );

};

export default ProfilePage;
