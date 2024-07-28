/**
 * File Description: Service Area for artists within the settings page
 * File version: 1.1
 * Contributors: Hirun, Nikki
 */
import React, {useState} from "react";
import {Tracker} from "meteor/tracker";
import {Meteor} from "meteor/meteor";
import WhiteBackground from "../../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../../enums/PageLayout";
import Tabs from "../../../tabs/Tabs.jsx";
import PreviousButton from "../../../button/PreviousButton";
import AccountDetails from "./AccountDetails.jsx";
import ArtistServiceArea from "./ArtistServiceArea";

/**
 * Settings page for all users
 */
export const ProfileSettingsPage = () => {

    // get current user information
    const [userInfo, setUserInfo] = useState(
        {
            "username": null,
            "email": null,
            "alias": null,
            "type": null
        }
    );

    // tracker for the required user data updates
    Tracker.autorun(() => {
        const user = Meteor.user();

        if (user) {
            // user data is returned (sometimes it takes a while)
            const username = user.username;
            const email = user.emails[0].address;
            const userAlias = user.profile.alias;
            const userType = user.profile.type;

            // check if an update to the current user info is required or not (this is needed to prevent inf loop)
            if (
                userInfo.username !== username ||
                userInfo.email !== email ||
                userInfo.alias !== userAlias ||
                userInfo.type !== userType
            ) {
                setUserInfo(
                    {
                        "username": user.username,
                        "email": user.emails[0].address,
                        "alias": user.profile.alias,
                        "type": user.profile.type
                    }
                )
            }
        }
    })

    // display tabs depending on user account type (brides don't have service area settings tab)
    if (userInfo.type === "bride") {
        return (
            <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
                <PreviousButton/>
                <div className="flex flex-row flex-nowrap items-center">
                    <div className="title-text text-center sm:-mt-10 mb-5 grow">Settings</div>
                </div>
                <Tabs
                    tabs={[
                        <span key={1}>Account Details</span>,
                        <span key={2}>Change Password</span>,
                    ]}
                    tabPanels={[
                        <AccountDetails key={"account-details"}/>,
                        <span key={"change-password"}>Change password tab</span>,
                    ]}
                />
            </WhiteBackground>
        );
    } else {
        // artist
        return (
            <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
                <PreviousButton/>
                <div className="flex flex-row flex-nowrap items-center">
                    <div className="title-text text-center sm:-mt-10 mb-5 grow">Settings</div>
                </div>
                <Tabs
                    tabs={[
                        <span key={1}>Account Details</span>,
                        <span key={2}>Change Password</span>,
                        <span key={3}>Service Area</span>,
                    ]}
                    tabPanels={[
                        <AccountDetails key={"account-details"}/>,
                        <span key={"change-password"}>Change password tab</span>,
                        <ArtistServiceArea key={"service-area"}/>
                    ]}
                />
            </WhiteBackground>
        );
    }
};

export default ProfileSettingsPage;
