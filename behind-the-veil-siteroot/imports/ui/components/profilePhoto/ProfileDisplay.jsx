/**
 * File Description: A profile display with profile image, name and username
 * File version: 1.1
 * Contributors: Katie, Nikki
 */

import React from 'react';
import classNames from "classnames";
import ProfilePhoto from './ProfilePhoto';

/**
 * Uses ProfilePhoto, adds the username and alias together. Used for Profile pages.
 *
 * @param className {string} - additional classes to be applied on top of the base style
 * @param imageData - image data for the profile
 * @param userAlias {string} - user's alias/name
 * @param userUsername {string} - user's username
 */
export const ProfileDisplay = ({className, imageData, userAlias, userUsername}) => {
    // todo change depending on actual photo data format from database
    const classes = classNames(className, "flex flex-col items-center justify-center");
    return (
        // make up how it would be coded with the data
        <div className={classes}>
            <ProfilePhoto className="flex container mx-auto" artistPhotoData={imageData}/>
            <div className="text-center large-text">{userAlias ? userAlias : "User Alias"}</div>
            <div className="text-center medium-text text-dark-grey">{userUsername ? "@" + userUsername : "@username"}</div>
        </div>
    )
}

export default ProfileDisplay;