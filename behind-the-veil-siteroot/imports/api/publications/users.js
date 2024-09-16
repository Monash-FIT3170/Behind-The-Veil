/**
 * File Description: User database entity
 * File version: 1.1
 * Contributors: Nikki, Ryan
 */

import {Meteor} from 'meteor/meteor'
import {UserCollection} from "../collections/users";

/**
 * Publishes all users.
 */
Meteor.publish('all_users', function() {
    return UserCollection.find();
});

/**
 * Publishes artists.
 */
Meteor.publish('all_artists', function() {
    return UserCollection.find({"profile.type":"artist"});
});

/**
 * Publishes brides.
 */
Meteor.publish('all_brides', function() {
    return UserCollection.find({"profile.type":"bride"});
});

/**
 * Publishes all bookings associated with a specific user to the client.
 *
 * @param {string} username - The username of the user to be published.
 * @returns {Mongo.Cursor} - A cursor representing the result of the user to be published.
 */
Meteor.publish('specific_user', function(username) {
    // Check if the username matches either the user
    return UserCollection.find({username:username});
});