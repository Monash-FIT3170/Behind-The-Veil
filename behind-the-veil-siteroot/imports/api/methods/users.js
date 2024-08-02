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


})

