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
    }
})

