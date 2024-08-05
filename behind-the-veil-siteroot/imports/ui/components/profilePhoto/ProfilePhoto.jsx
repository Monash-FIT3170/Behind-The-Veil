/**
 * File Description: A round profile photo component
 * File version: 1.1
 * Contributors: Nikki
 */

import React from 'react';
import classNames from "classnames";
import {UserCircleIcon} from "@heroicons/react/20/solid"

/**
 * Round profile picture for any user, if data is not available outputs default grey profile icon
 *
 * @param className {string} additional classes to be applied on top of the base style
 * @param artistPhotoData artist profile photo's data from database
 * @param hoverEffect {boolean} false to disable hover effects, defaults to true
 */
export const ProfilePhoto = ({className, artistPhotoData, hoverEffect=true}) => {
    // todo change depending on actual photo data format from database
    const classes = classNames(className, "relative h-[10vh] w-[10vh]");

    // if the profile image data is available
    if (artistPhotoData) {

        // check if there is hover effect
        const baseImageClass = "w-full h-full object-cover absolute rounded-full border-2 border-light-grey";
        const imageHoverClass = "filter hover:brightness-75 transition duration-500 ease-in-out";

        return (
            <div className={classes}>
                <img className={classNames(baseImageClass, hoverEffect ? imageHoverClass : "")}
                     src={artistPhotoData}
                     alt={"Artist profile photo"}
                     onError={({currentTarget }) => {
                         currentTarget.onError=null; // prevent infinite loop
                         currentTarget.src='/imageNotFound.png';
                     }}
                />
            </div>
        );
    } else {
        // if the profile image data is not available
        const iconHoverClass = "hover:text-light-grey-hover transition duration-500 ease-in-out";

        return (
            <div className={classes}>
                <UserCircleIcon
                    className={classNames("text-light-grey", hoverEffect ? iconHoverClass : "")}></UserCircleIcon>
            </div>
        )
    }
}

export default ProfilePhoto;
