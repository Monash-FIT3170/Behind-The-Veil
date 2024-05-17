/**
 * File Description: Message database entity
 * File version: 1.0
 * Contributors: Vicky
 */
import {Meteor} from 'meteor/meteor'
import MessageCollection from "../collections/message";

/**
 * Publishes all messages associated with a specific chat to the client.
 * This publication filters messages based on the provided chatId,
 * retrieving messages in the chat where the chatId of the message matches the
 * chatId provided.
 * @param {string} specificChatId - The chatId of the chat whose messages are to be published.
 * @returns {Mongo.Cursor} - A cursor representing the result set of messages to be published.
 */
Meteor.publish('all_chat_messages', function(specificChatId) {
    // Check if the userid matches either the brideUsername or artistUsername
    return ChatCollection.find({chatId: specificChatId});
});