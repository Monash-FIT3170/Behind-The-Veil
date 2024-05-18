/**
 * File Description: Service Area for artists within the settings page
 * File version: 1.1
 * Contributors: Hirun, Nikki
 */
import React from "react";
import WhiteBackground from "../../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../../enums/PageLayout";
import Tabs from "../../../tabs/Tabs.jsx";
import Input from "../../../input/Input";
import Button from "../../../button/Button.jsx";
import BackButton from "../../../button/BackButton.jsx";
import {CheckIcon} from "@heroicons/react/24/outline";

/**
 * This page allows the artist to enter a location as well as provide a radius in which they can travel from that location
 * The design is set up that there can only be a single service location
 * The service location can be edited within the input field and when "Save Changes" is pressed the new service location is reflected
 */

export const ArtistServiceArea = () => {

    const ServiceAreaPanel = (
        <div className="flex flex-col items-left justify-center gap-y-8">
            <div className="flex flex-col items-left justify-center md:flex-row md:items-center md:justify-start gap-6">

                {/*Service Location input*/}
                <div className="flex flex-col items-left gap-y-2">
                    <div className="large-text">Service Location</div>
                    <Input
                        type="text"
                        placeholder="Please enter a location"
                        className="lg:w-[40vw] sm:w-96"
                    />
                </div>

                {/*Radius input*/}
                <div className="flex flex-col items-left gap-y-2">
                    <div className="large-text">Radius (km)</div>
                    <Input
                        type="number"
                        min={1}
                        max={99}
                        placeholder="e.g. 12.5"
                        className="w-24"
                    />
                </div>
            </div>

            {/* Save changes button*/}
            <Button className="bg-secondary-purple hover:bg-secondary-purple-hover flex gap-2">
                <CheckIcon className="icon-base"/>
                Save Changes
            </Button>
        </div>
    );

    return (
        <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
            <BackButton/>
            <div className="flex flex-row flex-nowrap items-center">
                <div className="title-text text-center sm:-mt-10 mb-5 grow">Settings</div>
            </div>
            <Tabs
                tabs={["Payment Details", "Change Password", "Service Area"]}
                tabPanels={["Tab Panel 1", "Tab Panel 2", ServiceAreaPanel]}
            />
        </WhiteBackground>
    );
};

export default ArtistServiceArea;
