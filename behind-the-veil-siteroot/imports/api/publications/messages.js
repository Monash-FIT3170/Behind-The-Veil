/**
 * File Description: Messages database entity
 * File version: 1.0
 * Contributors: Vicky
 */
import {Meteor} from 'meteor/meteor'
import MessageCollection from "../collections/messages";

/**
 * Publishes all messages associated with a specific chat to the client.
 * This publication filters messages based on the provided chatId,
 * retrieving messages where the given chatId matches the chatId fields.
 * @param {string} chatId - The ID of the chat whose messages are to be published.
 * @returns {Mongo.Cursor} - A cursor representing the result set of messages to be published.
 */
Meteor.publish('all_chat_messages', function(chatId) {
    // Check if the chatId matches the chatId field of the message
    return MessageCollection.find({"chatId": chatId,});
});
