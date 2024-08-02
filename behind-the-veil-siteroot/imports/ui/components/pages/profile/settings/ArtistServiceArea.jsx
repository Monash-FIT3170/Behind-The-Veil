/**
 * File Description: Service Area for artists within the settings page
 * File version: 1.1
 * Contributors: Hirun, Nikki
 */
import React from "react";
import Input from "../../../input/Input";
import Button from "../../../button/Button.jsx";
import {CheckIcon} from "@heroicons/react/24/outline";

/**
 * This page allows the artist to enter a location as well as provide a radius in which they can travel from that location
 * The design is set up that there can only be a single service location
 * The service location can be edited within the input field and when "Save Changes" is pressed the new service location is reflected
 */

export const ArtistServiceArea = () => {

    return (
        <div className="flex flex-col items-left justify-center gap-y-8 pl-[5%] lg:pl-[15%]">
            <div className="flex flex-col items-left justify-center md:flex-row md:items-center md:justify-start gap-6">

                {/*Service Location input*/}
                <Input
                    type="text"
                    label={<label className={"main-text"}>Service Location</label>}
                    placeholder="Please enter a location"
                    className="lg:w-[40vw] sm:w-96"
                />

                {/*Radius input*/}
                <Input
                    type="number"
                    label={<label className={"main-text"}>Radius (km)</label>}
                    min={1}
                    max={99}
                    placeholder="e.g. 12.5"
                    className="w-24"
                />
            </div>

            {/* Save changes button*/}
            <Button className="bg-secondary-purple hover:bg-secondary-purple-hover flex gap-2">
                <CheckIcon className="icon-base"/>
                Save Changes
            </Button>
        </div>
    );
};

export default ArtistServiceArea;
