/**
 * File Description: Service Area for artists within the settings page
 * File version: 1.1
 * Contributors: Hirun, Nikki
 */
import React, { useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { mapboxKey } from "./../../../../components/map/mapUtils.js";
import { AddressAutofill } from "@mapbox/search-js-react";

import Input from "../../../input/Input";
import Button from "../../../button/Button.jsx";

import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import "/imports/api/methods/users";
import {useNavigate} from "react-router-dom";
import {useUserInfo} from "../../../util";
import UrlBasePath from "../../../../enums/UrlBasePath";

/**
 * This page allows the artist to enter a location as well as provide a radius in which they can travel from that location
 * The design is set up that there can only be a single service location
 * The service location can be edited within the input field and when "Save Changes" is pressed the new service location is reflected
 */

export const ArtistServiceArea = () => {
    const navigateTo = useNavigate();

    if (useUserInfo().type === "bride") {
        navigateTo(`/${UrlBasePath.HOME}`);
    }
    const user = useTracker(() => Meteor.user());

    const [location, setLocation] = useState('');
    const [radius, setRadius] = useState('');

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    const handleSaveChanges = (event) => {
        event.preventDefault();
        setSuccessMessage('');
        setErrorMessage('')

        if (!radius && location.trim() === '') {
            setErrorMessage('No value updated');
            return;
        }

        const updatedRadius = radius ? radius : user.profile.artistServiceRadius
        const updatedLocation = location.trim() ? location.trim() : user.profile.artistServiceLocation

        if (!updatedRadius) {
            setErrorMessage('Please fill in the radius');
            return;
        }

        if (!updatedLocation) {
            setErrorMessage('Please fill in the location');
            return;
        }

        return new Promise((resolve, reject) => {
            Meteor.call('update_service_area', user._id, updatedLocation, updatedRadius,
                (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        setLocation('');
                        setRadius('');
                        setSuccessMessage('Service Area changed successfully!');
                        resolve(user._id);
                    }
                }
            );
        })

    };

    const [fullAddress, setFullAddress] = useState('')

    // to overwrite the location state with the full address when an autocomplete suggestion is selected
    useEffect(() => {
        setLocation(fullAddress)
    }, [fullAddress])

    return (
        <form className="flex flex-col items-left justify-center gap-y-6 pl-[5%] lg:pl-[15%]" onSubmit={handleSaveChanges}>
            <div className="flex flex-col items-left justify-center md:flex-row md:items-center md:justify-start gap-6">
                {/*Service Location input*/}
                <AddressAutofill accessToken={mapboxKey} onRetrieve={(e) => {
                    setFullAddress(e.features[0].properties.full_address)
                }}>
                    <Input
                        type="text"
                        label={<label className={"main-text"}>Service Location</label>}
                        placeholder={user.profile.artistServiceLocation}
                        className="lg:w-[40vw] sm:w-96"
                        value={location}
                        onChange={(e) => {
                            setLocation(e.target.value)
                        }}
                    />
                </AddressAutofill>
                {/*Radius input*/}
                <Input
                    type="number"
                    label={<label className={"main-text"}>Radius (km)</label>}
                    min={1}
                    max={99}
                    placeholder={user.profile.artistServiceRadius}
                    className="w-24"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                />
            </div>
            {/* show error and successMessage */}
            {errorMessage && <span className="text-cancelled-colour -mt-2">{errorMessage}</span>}
            {successMessage && <div className="text-confirmed-colour -mt-2">{successMessage}</div>}
            {/* Save changes button*/}
            <Button className="bg-secondary-purple hover:bg-secondary-purple-hover flex gap-2" type="submit">
                <CheckIcon className="icon-base" />
                Save Changes
            </Button>
        </form>
    );
};

export default ArtistServiceArea;
