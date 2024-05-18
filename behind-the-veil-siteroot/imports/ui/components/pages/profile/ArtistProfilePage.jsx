/**
 * File Description: Artist Profile
 * File version: 1.1
 * Contributors: Kefei (Phillip) Li, Laura, Nikki
 */

import React, {useState} from "react";
import {Cog8ToothIcon, StarIcon as OutStarIcon,} from "@heroicons/react/24/outline";
import {StarIcon as SolStarIcon} from "@heroicons/react/24/solid";

import Button from "../../button/Button.jsx";
import PageLayout from "../../../enums/PageLayout.tsx";
import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import Tabs from "../../tabs/Tabs.jsx";
import ProfilePhoto from "../../profilePhoto/ProfilePhoto.jsx";
import ArtistDashboardTab from "./ArtistDashboardTab";
import ArtistGalleryTab from "./ArtistGalleryTab";
import ArtistBookingsTab from "./ArtistBookingsTab";
import {Tracker} from "meteor/tracker";
import {Meteor} from "meteor/meteor";
import {useNavigate} from "react-router-dom";

/**
 * Page for artist profile
 */
export const ArtistProfilePage = () => {

    const navigate = useNavigate();

    // get current user information
    const [userInfo, setUserInfo] = useState(
        {"alias": null, "username": null}
    );

    // tracker for the required user data updates
    Tracker.autorun(() => {
        const user = Meteor.user();

        if (user) {
            // user data is returned (sometimes it takes a while)
            const userAlias = user.profile.alias;
            const username = user.username;

            // check if an update to the current user info is required or not (this is needed to prevent inf loop)
            if (userInfo.alias !== userAlias || userInfo.username !== username) {
                setUserInfo(
                    {
                        "alias": user.profile.alias,
                        "username": user.username
                    }
                )
            }
        }
    })

    //import gearIcon from heroicons for "settings" button.
    const gearIcon = <Cog8ToothIcon className="icon-base"/>;

    const outlineStarIcon = <OutStarIcon className="size-20 stroke-1"/>;
    const solidStarIcon = <SolStarIcon className="size-20 stroke-1"/>;
    const smallSolidStarIcon = <SolStarIcon className="size-10 stroke-1"/>;

    //Utilise Tab components to create page schematics.
    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            {/*Settings buttons*/}
            <div className="flex items-center justify-end w-full ">
                <Button onClick={() => {navigate('/artist-profile/'+ userInfo.username +'/service-area')}}
                    className="flex flex-row justify-center items-center gap-x-1.5 sm:w-36">
                    {gearIcon}
                    <span className={"hidden sm:flex"}>
                        Settings
                    </span>
                </Button>
            </div>

            {/*Top div where artist info*/}
            <div className={"flex flex-col items-center justify-center"}>
                <ProfilePhoto className="flex container mx-auto"/>
                <div className="text-center large-text">{userInfo.alias}</div>
                <div className="text-center medium-text text-dark-grey">@{userInfo.username}</div>
            </div>

            {/*bottom half where all the tabs are at*/}
            <Tabs
                tabs={[
                    <span key={1}>Dashboard</span>,
                    <span key={2}>Bookings</span>,
                    <span key={3}>My Services</span>,
                    <span key={4}>Gallery</span>,
                    <span key={5}>Reviews</span>,
                ]}
                tabPanels={[
                    <ArtistDashboardTab key={"dashboard"}/>,
                    <ArtistBookingsTab key={"bookings"}/>,
                    <ArtistServicesTab />,
                    <ArtistGalleryTab key={"gallery"}/>,
                    <span key={"my-services"}>review tab</span>
                ]}
                tabsClassName="md:flex md:justify-between"
            />
        </WhiteBackground>
    );
};

export default ArtistProfilePage;
