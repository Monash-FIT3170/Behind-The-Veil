/**
 * File Description: Artist Profile
 * File version: 1.3
 * Contributors: Kefei (Phillip) Li, Laura, Nikki, Lucas
 */

import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Cog8ToothIcon, StarIcon as OutlineStarIcon,} from "@heroicons/react/24/outline";
import {StarIcon as FilledStarIcon} from "@heroicons/react/24/solid";

import Button from "../../../button/Button.jsx";
import PageLayout from "../../../../enums/PageLayout.tsx";
import WhiteBackground from "../../../whiteBackground/WhiteBackground.jsx";
import Tabs from "../../../tabs/Tabs.jsx";
import ProfilePhoto from "../../../profilePhoto/ProfilePhoto.jsx";
import ArtistDashboardTab from "./ArtistDashboardTab";
import ArtistGalleryTab from "./ArtistGalleryTab";
import ArtistBookingsTab from "./ArtistBookingsTab";
import {Tracker} from "meteor/tracker";
import {Meteor} from "meteor/meteor";
import ArtistServicesTab from "./ArtistServicesTab";
import ProfileDisplay from "../../../profilePhoto/ProfileDisplay";

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
    const outlineStarIcon = <OutlineStarIcon className="size-20 stroke-1"/>;
    const solidStarIcon = <FilledStarIcon className="size-20 stroke-1"/>;
    const smallSolidStarIcon = <FilledStarIcon className="size-10 stroke-1"/>;

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
            <ProfileDisplay imageData={""} userAlias={userInfo.alias} userUsername={userInfo.username}/>

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
                    // pass in the username so that it doesn't have to be queried again
                    <ArtistDashboardTab key={"dashboard"} username={userInfo.username}/>,
                    <ArtistBookingsTab key={"bookings"} username={userInfo.username}/>,
                    <ArtistServicesTab key={"my-services"} username={userInfo.username}/>,
                    <ArtistGalleryTab key={"gallery"} username={userInfo.username}/>,
                    <span key={"reviews"}>review tab</span>
                ]}
                tabsClassName="lg:flex lg:justify-between"
            />
        </WhiteBackground>
    );
};

export default ArtistProfilePage;
