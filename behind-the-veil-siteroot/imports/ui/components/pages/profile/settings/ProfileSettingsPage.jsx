/**
 * File Description: Service Area for artists within the settings page
 * File version: 1.3
 * Contributors: Hirun, Nikki, Ryan
 */
import React from "react";
import WhiteBackground from "../../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../../enums/PageLayout";
import Tabs from "../../../tabs/Tabs.jsx";
import PreviousButton from "../../../button/PreviousButton";
import AccountDetails from "./AccountDetails.jsx";
import ArtistServiceArea from "./ArtistServiceArea";
import {getUserInfo} from "../../../util";
import ChangePasswordTab from "./ChangePasswordTab";

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
                        <AccountDetails key={"account-details"}/>,
                        <ChangePasswordTab key={"change-password"} />,
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
                        <ChangePasswordTab key={"change-password"} />,
                        <ArtistServiceArea key={"service-area"}/>
                    ]}
                />
            </WhiteBackground>
        );
    }
};

export default ProfileSettingsPage;
