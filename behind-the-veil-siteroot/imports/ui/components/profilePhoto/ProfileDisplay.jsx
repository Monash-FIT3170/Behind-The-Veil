/**
 * File Description: A round profile photo component
 * File version: 1.0
 * Contributors: Nikki
 */

import React from 'react';
import classNames from "classnames";
import ProfilePhoto from './ProfilePhoto';


/**
 * Round profile picture for any user, if data is not available outputs default grey profile icon
 *
 * @param className {string} additional classes to be applied on top of the base style
 * @param profileData artist profile photo's data from database
 */
export const ProfileDisplay = ({className, profileData}) => {
    // todo change depending on actual photo data format from database
    const classes = classNames(className, "");
    if (profileData){
        return (
            // make up how it would be coded with the data
            <div className={classes}>
                <span ><ProfilePhoto ></ProfilePhoto></span>
                <span className='text-sm'>Brides Name</span>
                <span>@ tag</span>
            </div>
        );
    }
    else {
        return (
            <div className={classes}>
                <span><ProfilePhoto className="max-h-50 w-50"></ProfilePhoto></span>
                <span>Brides Name</span>
                <span>@ tag</span>
            </div>
        );
    } 
}

export default ProfileDisplay;