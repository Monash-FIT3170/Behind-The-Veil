/**
 * File Description: A round profile photo component
 * File version: 1.0
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
 */
export const ProfilePhoto = ({className, artistPhotoData}) => {
    // todo change depending on actual photo data format from database
    const classes = classNames(className, "relative h-[10vh] w-[10vh]");

    if (artistPhotoData) {
        // if the profile image data is available
        return (
            <div className={classes}>
                <img className={"w-full h-full object-cover absolute rounded-full border-2 border-light-grey" +
                    " filter hover:brightness-75 transition duration-500 ease-in-out"} src={artistPhotoData}
                     alt={"Artist profile photo"}/>
            </div>
        );
    } else {
        // if the profile image data is not available
        return (
            <div className={classes}>
                <UserCircleIcon
                    className={"text-light-grey hover:text-light-grey-hover transition duration-500 ease-in-out"}></UserCircleIcon>
            </div>
        )
    }
}

export default ProfilePhoto;
