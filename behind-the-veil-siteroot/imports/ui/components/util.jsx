/**
 * File Description: General utility functions
 * File version: 1.1
 * Contributors: Nikki
 */

import {useState} from "react";
import {Tracker} from "meteor/tracker";
import {Meteor} from "meteor/meteor";
import {removeStopwords} from "stopword";

/**
 * Retrieves current logged-in user's information
 * This can be extended to include more user related attributes.
 *
 * @returns an object containing the information of the user including username, email, alias, user type.
 */
export function useUserInfo() {
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

/**
 * Gets a list of objects containing all the suggestions for the search bar
 *
 * @param type - either services or artists (which category to get suggestions for)
 * @param usersData - all relevant user data to get suggestions for
 * @param servicesData - all relevant services data to get suggestions for
 * @returns {*[]} an array of objects. each object has a main and a sub attribute, both used as suggestions.
 */
export function getSearchSuggestions(type, usersData, servicesData) {

    // data is loaded, get auto suggestion completion words
    let allKeyWords = []
    if (type === 'artists') {

        for (let i=0; i<usersData.length; i++) {
            // add in keywords from username and alias
            let userObject = {}
            userObject.main = usersData[i].username
            userObject.sub = usersData[i].profile.alias
            allKeyWords.push(userObject)
        }

    } else if (type === 'services') {

        for (let i=0; i<servicesData.length; i++) {
            // add in keywords from username and alias
            let userObject = {}
            //  allKeyWords.concat(artistsData[i].profile.alias.)
            userObject.main = servicesData[i].serviceName;
            userObject.sub = removeStopwords(servicesData[i].serviceDesc.split(' ')).join(" ");
            allKeyWords.push(userObject)
        }

    }
    return allKeyWords
}