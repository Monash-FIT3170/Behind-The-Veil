/**
 * File Description: Chat database entity
 * File version: 1.0
 * Contributors: Vicky
 */
import {Meteor} from 'meteor/meteor'
import ChatCollection from "../collections/chat";

/**
 * Publishes all chats associated with a specific user to the client.
 * This publication filters chats based on the provided username,
 * retrieving chats where the username matches either the
 * brideUsername or artistUsername fields.
 * @param {string} username - The username of the user whose chats are to be published.
 * @returns {Mongo.Cursor} - A cursor representing the result set of chats to be published.
 */
Meteor.publish('all_user_chats', function(username) {
    // Check if the userid matches either the brideUsername or artistUsername
    return ChatCollection.find({
        $or: [
            { brideUsername: username },
            { artistUsername: username }
        ]
    });
});