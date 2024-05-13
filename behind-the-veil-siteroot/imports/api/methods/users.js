/**
 * File Description: User database entity
 * File version: 1.0
 * Contributors: Nikki
 */

import {Meteor} from 'meteor/meteor'
import {UserCollection} from "/imports/api/collections/users";

Meteor.methods({
    /**
     * Function to create a new artist user
     *
     * @param {string} username - id of the artist, must be unique
     * @param {string} alias - their name/alias of what they go by, does not have to be unique
     * @param {string} email - their email address
     * @param {string} serviceLocation - the center location where they service
     * @param {number} serviceRadius - the radius from the center service location where they service
     */
    "add_artist": function (username, alias, email, serviceLocation, serviceRadius) {
        UserCollection.insert(
            {
                "userUsername": username,
                "userType": "artist",
                "userAlias": alias,
                "userEmail": email,
                "artistServiceLocation": serviceLocation,
                "artistServiceRadius": serviceRadius
            }
        )
    },
    /**
     * Function to create a new Bride user
     * @param {string} username - id of the artist, must be unique
     * @param {string} alias - their name/alias of what they go by, does not have to be unique
     * @param {string} email - their email address
     */
    "add_bride": function (username, alias, email) {
        UserCollection.insert(
            {
                "userUsername": username,
                "userType": "bride",
                "userAlias": alias,
                "userEmail": email
            }
        )
    },
    /**
     * Function to remove all users - for testing purposes
     */
    "remove_all_users": function () {
        UserCollection.remove({});
    }
})

