/**
 * File Description: Post database entity
 * File version: 1.0
 * Contributors: Vicky, Phillip
 */
import {Meteor} from 'meteor/meteor'
import { PostCollection } from "../collections/posts";

/**
 * Publishes all posts associated with a specific user to the client.
 * This publication filters bookings based on the provided username,
 * retrieving posts where the username matches either the artistUsername field.
 * @param {string} username - The username of the user whose posts are to be published.
 * @returns {Mongo.Cursor} - A cursor representing the result set of posts to be published.
 */
Meteor.publish('specific_artist_posts', function(username) {
    // Check if the userid matches the artistUsername
    return PostCollection.find({artistUsername: username});
});
