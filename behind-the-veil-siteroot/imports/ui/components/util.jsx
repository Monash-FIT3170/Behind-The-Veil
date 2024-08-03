/**
 * File Description: General utility functions
 * File version: 1.1
 * Contributors: Nikki
 */

import {useState} from "react";
import {Tracker} from "meteor/tracker";
import {Meteor} from "meteor/meteor";

/**
 * Retrieves current logged-in user's information
 * This can be extended to include more user related attributes.
 *
 * @returns an object containing the information of the user including username, email, alias, user type.
 */
export function getUserInfo() {
    // get current user information
    const [userInfo, setUserInfo] = useState(
        {
            "id": null,
            "username": null,
            "email": null,
            "emailVerified": null,
            "alias": null,
            "type": null
        }
    );

    // tracker for the required user data updates
    Tracker.autorun(() => {
        const user = Meteor.user();
        const userId = Meteor.userId();

        if (user) {
            // user data is returned (sometimes it takes a while)
            const fetchedUserId = userId;
            const fetchedUsername = user.username;
            const fetchedEmail = user.emails[0] ? user.emails[0].address : null
            const fetchedEmailVerified = user.emails[0] ? user.emails[0].verified : null;
            const fetchedAlias = user.profile.alias;
            const fetchedType = user.profile.type;

            // check if an update to the current user info is required or not (this is needed to prevent inf loop)
            if (
                userInfo.id !== fetchedUserId ||
                userInfo.username !== fetchedUsername ||
                userInfo.email !== fetchedEmail ||
                userInfo.emailVerified !== fetchedEmailVerified ||
                userInfo.alias !== fetchedAlias ||
                userInfo.type !== fetchedType
            ) {
                setUserInfo(
                    {
                        "id": fetchedUserId,
                        "username": fetchedUsername,
                        "email": fetchedEmail,
                        "emailVerified": fetchedEmailVerified,
                        "alias": fetchedAlias,
                        "type": fetchedType
                    }
                )
            }
        }
    })

    console.log("Current logged in user:" + JSON.stringify(userInfo))
    return userInfo;
}