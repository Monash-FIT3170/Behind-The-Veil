/**
 * File Description: User database entity
 * File version: 1.1
 * Contributors: Nikki, Ryan
 */

import {Meteor} from 'meteor/meteor'
import {UserCollection} from "/imports/api/collections/users";
import {Accounts} from "meteor/accounts-base";
import { check } from 'meteor/check';

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

    'update_service_area': function (text, radius) {
        // check(text, String);
        // check(radius, Number);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        UserCollection.update(
            { _id: this.userId }, // Query to find the document for the current user
            {
                $set: {
                    'profile.serviceLocation': text.trim(),
                    'profile.serviceRadius': radius
                }
            },
            { upsert: true } // Create the document if it doesn't exist
        );
    }
})

