/**
 * File Description: User database entity
 * File version: 1.1
 * Contributors: Nikki, Ryan
 */

import {Meteor} from 'meteor/meteor'
import {UserCollection} from "/imports/api/collections/users";
import {Accounts} from "meteor/accounts-base";

Meteor.methods({
    /**
     * Function to remove all users - for testing purposes
     */
    "remove_all_users": function () {
        UserCollection.remove({});
    },
    /**
     * Finds a user by username and emails a verification email
     * @param {string} username - username of the user
     */
    "verify_email": function (username) {
        const user = Accounts.findUserByUsername(username);
        Accounts.sendVerificationEmail(user._id);
    },
    /**
     * Changes the email address associated with a user.
     * @param userId - ID of the user to be updated
     * @param oldEmail - old email of user to remove
     * @param newEmail - new email to be added
     */
    "update_email": function (userId, oldEmail, newEmail) {
        // remove old email and add the new one in
        Accounts.removeEmail(userId, oldEmail)
        Accounts.addEmail(userId, newEmail);
   },
    /**
     * Changes the alias associated with a user.
     * @param userId - ID of the user to be updated
     * @param newAlias - new alias/name to update to
     */
    "update_alias": function (userId, newAlias) {
        UserCollection.update(userId, {$set: {"profile.alias": newAlias}});
    },

    /**
     * Updates the service area for the current user.
     * This method sets the service location and radius for the artistuser's profile.
     * The method requires the user to be logged in.
     * 
     * @param {string} userId - The ID of the user for whom to update the service area.
     * @param {string} text - The new service location as a text string.
     * @param {number} radius - The new service radius in the desired unit
     */
    'update_service_area': function (userId ,text, radius) {
        UserCollection.update(
            { _id: userId },
            {
                $set: {
                    'profile.artistServiceLocation': text.trim(),
                    'profile.artistServiceRadius': radius
                }
            },
        );
    }

})

