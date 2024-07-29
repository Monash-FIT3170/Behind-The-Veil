/**
 * File Description: Service Area for artists within the settings page
 * File version: 1.1
 * Contributors: Hirun, Nikki
 */
import React, { useState } from "react";
import Input from "../../../input/Input";
import Button from "../../../button/Button.jsx";
import { CheckIcon } from "@heroicons/react/24/outline";
import Card from '../../../card/Card';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import "/imports/api/methods/users";
/**
 * This page allows the artist to enter a location as well as provide a radius in which they can travel from that location
 * The design is set up that there can only be a single service location
 * The service location can be edited within the input field and when "Save Changes" is pressed the new service location is reflected
 */

export const ArtistServiceArea = () => {
    const user = useTracker(() => Meteor.user());
    const [text, setText] = useState('');
    const [radius, setRadius] = useState('');

    const [overlayVisible, setOverlayVisible] = useState(false);
    const handleSaveChangesOverlay = () => {
        setOverlayVisible(true);
    };

    const handleSaveChanges = () => {
        if (radius < 0) {
            alert('Radius can\'t be negative');
            return;
        } 
        if (!text || !radius) {
            alert('Please enter a valid location and radius');
            return;
        }  else {
            Meteor.call('update_service_area', text, radius);
            confirm('Service area updated!');
        }
        setOverlayVisible(false)
    };

    const handleCloseOverlay = () => {
        setOverlayVisible(false);
    };

    return (
        <div className="flex flex-col items-left justify-center gap-y-8">
            <div className="flex flex-col items-left justify-center md:flex-row md:items-center md:justify-start gap-6">

                {/*Service Location input*/}
                <div className="flex flex-col items-left gap-y-2">
                    <div className="large-text">Service Location</div>
                    <Input
                        type="text"
                        placeholder="Please enter a location"
                        className="lg:w-[40vw] sm:w-96"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
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
                        value={radius}
                        onChange={(e) => setRadius(e.target.value)}
                    />
                </div>
            </div>

            {/* Save changes button*/}
            <Button className="bg-secondary-purple hover:bg-secondary-purple-hover flex gap-2" onClick={handleSaveChangesOverlay}>
                <CheckIcon className="icon-base" />
                Save Changes
            </Button>
            {overlayVisible && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">

                    <Card className="bg-white p-20 rounded-md">
                        {/* Content of the card */}
                        <div className='text-center'>
                            <p className='title-text'>Save Changes?</p>
                            <p className='medium-text my-4 '>Press cancel to keep editing</p>
                        </div>
                        <div className='flex justify-between'>
                            <Button onClick={handleSaveChanges} className="flex bg-secondary-purple px-8 hover:bg-secondary-purple-hover">
                                <CheckIcon className='icon-base mr-1'></CheckIcon>
                                Yes
                            </Button>
                            <Button onClick={handleCloseOverlay}
                                className="flex px-8 hover:bg-secondary-purple-hover">
                                Cancel
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default ArtistServiceArea;
