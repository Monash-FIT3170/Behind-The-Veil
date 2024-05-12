/**
 * File Description: User database entity
 * File version: 1.0
 * Contributors: Nikki
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
    return UserCollection.find({"userType":"artist"});
});
