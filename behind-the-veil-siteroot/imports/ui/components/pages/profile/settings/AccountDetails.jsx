/**
 * File Description: Account Details within the Settings page
 * File version: 1.0
 * Contributors: Kyle
 */
import React, {useState} from "react";
import {Tracker} from "meteor/tracker";
import {Meteor} from "meteor/meteor";
import Input from "../../../input/Input";
import Button from "../../../button/Button.jsx";
import ProfilePhoto from "../../../profilePhoto/ProfilePhoto.jsx"
import {CheckIcon,
        ArrowUpTrayIcon
} from "@heroicons/react/24/outline";

/**
 * This page allows both artists and brides to change their name/alias, email address and profile image
 * The name/alias and email address can be edited using a text input field
 * The profile image can be edited using an image dump
 */

export const AccountDetails = () => {

    // get current user information
    const [userInfo, setUserInfo] = useState(
        {
            "username": null,
            "email": null,
            "alias": null,
            "type": null
        }
    );

    // tracker for the required user data updates
    Tracker.autorun(() => {
        const user = Meteor.user();

        if (user) {
            // user data is returned (sometimes it takes a while)
            const username = user.username;
            const email = user.emails[0].address;
            const userAlias = user.profile.alias;
            const userType = user.profile.type;

            // check if an update to the current user info is required or not (this is needed to prevent inf loop)
            if (
                userInfo.username !== username ||
                userInfo.email !== email ||
                userInfo.alias !== userAlias ||
                userInfo.type !== userType
            ) {
                setUserInfo(
                    {
                        "username": user.username,
                        "email": user.emails[0].address,
                        "alias": user.profile.alias,
                        "type": user.profile.type
                    }
                )
            }
        }
    })

    return (
        <div className="flex flex-col items-start justify-center gap-6 mx-auto pl-[15%]">

            {/*Username*/}
            <div className="flex flex-col items-left gap-y-2">
                <div className="large-text">Username</div>
                <div className="main-text ml-10" style={{ color: "#757575" }}>@{userInfo.alias}</div>
            </div>

            {/*Name/Alias input*/}
            <div className="flex flex-col items-left gap-y-2">
                <div className="large-text">Name/Alias</div>
                <Input
                    type="text"
                    placeholder={userInfo.alias}
                    className="lg:w-[40vw] sm:w-96"
                />
            </div>

            {/*Email input*/}
            <div className="flex flex-col items-left gap-y-2">
                <div className="large-text">Email</div>
                <Input
                    type="text"
                    placeholder={userInfo.email}
                    className="lg:w-[40vw] sm:w-96"
                />
            </div>

            {/*Profile Image input*/}
            <div className="flex flex-col items-left gap-y-2">
                <div className="large-text">Profile Image</div>
                <div className="flex items-center gap-4">
                    <ProfilePhoto/>
                    <Button className="btn-base flex gap-2">
                        <ArrowUpTrayIcon className="icon-base"/>
                        Browse/Upload File
                    </Button>
                </div>
                
            </div>

            {/*Save button*/}
            <Button className="bg-secondary-purple hover:bg-secondary-purple-hover flex gap-2">
            <CheckIcon className="icon-base"/>
            Save
            </Button>

        </div>
    );
};

export default AccountDetails;
