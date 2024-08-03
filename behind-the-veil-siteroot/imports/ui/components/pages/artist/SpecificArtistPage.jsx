/**
 * File Description: Specific Artist page
 * File version: 1.1
 * Contributors: Nikki
 */

import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {PaperAirplaneIcon} from "@heroicons/react/24/outline";

import WhiteBackground from "../../whiteBackground/WhiteBackground";
import PageLayout from "../../../enums/PageLayout";
import Button from "../../button/Button";
import ProfileDisplay from "../../profilePhoto/ProfileDisplay";
import Loader from "../../loader/Loader";
import Tabs from "../../tabs/Tabs";
import ServiceAreaTab from "./artistTabs/ServiceAreaTab";
import PreviousButton from "../../button/PreviousButton";
import ArtistServicesTab from "../profile/artistTabs/ArtistServicesTab";
import UrlBasePath from "../../../enums/UrlBasePath";
import {getSpecificUser} from "../../DatabaseHelper";

/**
 * Displays a page for a specific artist (similar to profile but external view)
 */
const SpecificArtistPage = () => {

    const navigate = useNavigate();

    // get url parameter of the artist username
    const {artistUsername} = useParams();

    // get database entry for artist information
    const [isLoading, artistData, artistImageData] = getSpecificUser(artistUsername);

    if (isLoading) {
        // is loading, display loader
        return (
            <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
                <Loader
                    loadingText={"loading . . ."}
                    isLoading={isLoading}
                    size={100}
                    speed={1.5}
                />
            </WhiteBackground>
        );
    } else {
        // data has loaded, display page
        return (
            <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>

                {/*Settings and Previous buttons*/}
                <div className="flex items-center justify-between w-full">
                    <PreviousButton/>
                    <Button
                        className="hidden sm:flex flex-row justify-center items-center gap-x-1.5 bg-secondary-purple hover:bg-secondary-purple-hover"
                        onClick={() => {
                            navigate('/' + UrlBasePath.MESSAGES +'#' + artistUsername);
                        }}>
                        <PaperAirplaneIcon className="icon-base"/>
                        Message
                    </Button>
                </div>

                {/*Top div where user's info*/}
                <ProfileDisplay imageData={artistImageData ? artistImageData.imageData : null}
                                userAlias={artistData.profile.alias}
                                userUsername={artistData.username}
                />

                {/* if the page is too small, the message button moves under the artist's name/image */}
                <Button
                    className="mx-auto flex sm:hidden flex-row justify-center items-center gap-x-1.5 bg-secondary-purple hover:bg-secondary-purple-hover"
                    onClick={() => {
                        navigate('/' + UrlBasePath.MESSAGES +'#' + artistUsername);
                    }}>
                    <PaperAirplaneIcon className="icon-base"/>
                    Message
                </Button>

                {/*bottom half where all the tabs are at */}
                {
                    <Tabs
                        tabs={[
                            <span key={1}>Services</span>,
                            <span key={2}>Service Area</span>,
                            <span key={3}>Gallery</span>,
                            <span key={4}>Reviews</span>,
                        ]}
                        tabPanels={[
                            <ArtistServicesTab external={true} key={"services"} username={artistUsername}/>,
                            <ServiceAreaTab key={"service-area"}
                                            serviceLocation={artistData.profile.artistServiceLocation}
                                            serviceRadius={artistData.profile.artistServiceRadius} />,
                            <span key={3}>Gallery - link to normal Gallery tab AFTER it is done (do not create a new one)</span>,
                            <span key={4}>Reviews</span>,
                        ]}
                        tabsClassName="lg:flex lg:justify-between lg:px-[15%] xl:px-[20%] 2xl:px-[25%]"
                    />
                }
            </WhiteBackground>
        );
    }
}

export default SpecificArtistPage;