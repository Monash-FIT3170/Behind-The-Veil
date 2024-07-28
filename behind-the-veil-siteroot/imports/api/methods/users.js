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
     * @param {string} email - new email to be associated with the user.
     */
    "update_email": function (email) {
        var user = Meteor.user();
        var oldEmail = user.emails;
        if(oldEmail != null){
            Accounts.removeEmail(user._id, user.emails[0].address)
        }
        Accounts.addEmail(user._id, email);
   },
})

