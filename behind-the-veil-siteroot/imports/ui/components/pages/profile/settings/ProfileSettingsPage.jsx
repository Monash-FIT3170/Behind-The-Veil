/**
 * File Description: Service Area for artists within the settings page
 * File version: 1.4
 * Contributors: Hirun, Nikki, Ryan, Cameron
 */
import React from "react";
import WhiteBackground from "../../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../../enums/PageLayout";
import Tabs from "../../../tabs/Tabs.jsx";
import AccountDetails from "./AccountDetails.jsx";
import ArtistServiceArea from "./ArtistServiceArea";
import {useUserInfo} from "../../../util";
import ChangePasswordTab from "./ChangePasswordTab";
import BackButton from "../../../button/BackButton";
import ArtistPayment from "./ArtistPayment.jsx";


/**
 * Settings page for all users
 */
export const ProfileSettingsPage = () => {

    // get current user information
    const userInfo = useUserInfo();

    // display tabs depending on user account type (brides don't have service area settings tab)
    if (userInfo.type === "bride") {
        return (
            <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
                <BackButton/>
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
                    tabsClassName="lg:flex lg:justify-between lg:px-[25%] xl:px-[30%] 2xl:px-[35%]"
                />
            </WhiteBackground>
        );
    } else {
        // artist
        return (
            <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
                <BackButton/>
                <div className="flex flex-row flex-nowrap items-center">
                    <div className="title-text text-center sm:-mt-10 mb-5 grow">Settings</div>
                </div>
                <Tabs
                    tabs={[
                        <span key={1}>Account Details</span>,
                        <span key={2}>Change Password</span>,
                        <span key={3}>Service Area</span>,
                        <span key={4}>Payment Detail</span>,

                    ]}
                    tabPanels={[
                        <AccountDetails key={"account-details"}/>,
                        <ChangePasswordTab key={"change-password"} />,
                        <ArtistServiceArea key={"service-area"}/>,
                        <ArtistPayment key={"artist-payment"}/>
                    ]}
                    tabsClassName="lg:flex lg:justify-between xl:px-[12%] 2xl:px-[20%]"
                />
            </WhiteBackground>
        );
    }
};

export default ProfileSettingsPage;
