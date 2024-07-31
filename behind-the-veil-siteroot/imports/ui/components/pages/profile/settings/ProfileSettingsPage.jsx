/**
 * File Description: Service Area for artists within the settings page
 * File version: 1.2
 * Contributors: Hirun, Nikki
 */
import React from "react";
import WhiteBackground from "../../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../../enums/PageLayout";
import Tabs from "../../../tabs/Tabs.jsx";
import PreviousButton from "../../../button/PreviousButton";
import ArtistServiceArea from "./ArtistServiceArea";
import {getUserInfo} from "../../../util";

/**
 * Settings page for all users
 */
export const ProfileSettingsPage = () => {

    // get current user information
    const userInfo = getUserInfo();

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
                        <span key={"account-details"}>Account details tab</span>,
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
                        <span key={"account-details"}>Account details tab</span>,
                        <span key={"change-password"}>Change password tab</span>,
                        <ArtistServiceArea key={"service-area"}/>
                    ]}
                />
            </WhiteBackground>
        );
    }
};

export default ProfileSettingsPage;