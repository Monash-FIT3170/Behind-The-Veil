/**
 * File Description: Artist card component based on the generic "Card" component
 * File version: 1.0
 * Contributors: Nikki
 */

import React from 'react';
import classNames from "classnames";
import {useNavigate} from "react-router-dom";
import {Squares2X2Icon} from "@heroicons/react/24/outline"

import Card from "./Card";
import Button from "../button/Button";
import ProfilePhoto from "../profilePhoto/ProfilePhoto";

/**
 * Component that displays brief artist details on the Services page
 *
 * @param className {string} - additional classes to be applied on top of the base style
 * @param artistUsername {string} - username of artist
 * @param artistAlias
 * @param artistProfileImageData
 */
export const ArtistCard = ({className, artistUsername, artistAlias, artistProfileImageData}) => {
    // variables to handle routing
    const navigateTo = useNavigate();

    const classes = classNames(className, "");

    return (
        <Card className={"cursor-default flex flex-col justify-center items-center w-56 min-h-56 gap-y-2"}>

            <ProfilePhoto artistPhotoData={artistProfileImageData} hoverEffect={false}/>

            <div className={"my-2"}>
                <div className="large-text text-our-black max-w-full break-all line-clamp-1 text-center">
                    {artistAlias}</div>
                <div className="small-text text-dark-grey max-h-[5.5rem] max-w-full line-clamp-1 text-center">
                    @{artistUsername}</div>
            </div>


            <Button className={"flex flex-row gap-x-2 justify-center items-center w-full " +
                "bg-secondary-purple hover:bg-secondary-purple-hover"}
                    onClick={() => navigateTo('/artists/' + artistUsername)}>
                <Squares2X2Icon className="icon-base"/>
                View Services
            </Button>


        </Card>
    );
};

export default ArtistCard;