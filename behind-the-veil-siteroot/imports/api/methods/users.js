/**
 * File Description: User database entity
 * File version: 1.4
 * Contributors: Nikki, Ryan, Vicky, Josh
 */

import { Meteor } from 'meteor/meteor'
import { UserCollection } from "/imports/api/collections/users";
import { Accounts } from "meteor/accounts-base";

Meteor.methods({
    /**
     * Function to remove all users - for testing purposes
     */
    "remove_all_users": function () {
        UserCollection.remove({});
    },
    /**
     * Finds a user by their _id and emails a verification email
     * @param {string} id - id of the user (mongo DB attribute)
     */
    "verify_email": function (id) {
        Accounts.sendVerificationEmail(id);
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
        UserCollection.update(userId, { $set: { "profile.alias": newAlias } });
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
    'update_service_area': function (userId, text, radius) {
        UserCollection.update(
            { _id: userId },
            {
                $set: {
                    'profile.artistServiceLocation': text.trim(),
                    'profile.artistServiceRadius': radius
                }
            },
        );
    },

    'update_profile_image': function (userId, image) {
        UserCollection.UserCollection.update(
            {_id: userId},
            {$set: {'profile.profileImage': image}}
        )
    },

    /**
     * Retrieves the alias of a user based on their username.
     * @param {string} username - The username of the user to retrieve.
     * @returns {string|null} - The user alias if found, otherwise null.
     */
    "get_alias": function (username) {
        const user = UserCollection.findOne(
            { username: username },
        );
        return user ? user.profile.alias : null;
    },

    /**
     * Retrieves the user based on their username.
     * @param {string} username - The username of the user to retrieve.
     * @returns {object|null} - The user if found, otherwise null.
     */
    "get_user": function (username) {
        return UserCollection.findOne(
            { username: username },
        );
    },

    /**
     * Updates the user's availability.
     * @param {string} username - The username of the user to update.
     * @param {object} availability - The availability object to update the user with. Keys = date (YYYY-mm-dd), Values = array of integers that correspond to hours of the day that the user is available to work
     */
    "update_availability": function (username, availability) {
        return UserCollection.update(
            { username: username },
            { $set: { "availability": availability } }
        )
    }
})

