/**
 * File Description: Message database entity
 * File version: 1.0
 * Contributors: Vicky
 */
import { Meteor } from 'meteor/meteor';
import {MessageCollection} from "../collections/message";

Meteor.methods({
    "add_message": function (messageId, messageSentTime, messageContent, messageRead, photoid, userUsername, chatId) {
        /**
         * Adds a new message to the database. Keep in mind this is an async method
         * and needs to be put in a promise if you want the value right away.
         * @param {string} messageId - The ID of the message.
         * @param {Date} messageSentTime - The time the message was sent.
         * @param {string} messageContent - The text in the message sent
         * @param {Boolean} messageRead - If the message was read by the other user or not.
         * @param {string} photoid - The ID of the photo sent.
         * @param {string} userUsername - The username of the user who sent the message.
         * @param {string} chatId - The ID of the chat that the message belongs to.
         * @returns {string} The unique ID of the newly created message.
         */
        return MessageCollection.insert({
            "messageId": messageId,
            "messageSentTime": messageSentTime,
            "messageContent": messageContent,
            "messageRead": messageRead,
            "photoid": photoid,
            "userUsername": userUsername,
            "chatId": chatId
        });
    },
    /**
     * Retrieves a single message instance from the database based on the message ID.
     * @param {string} messageId - The ID of the chat to retrieve.
     * @returns {object|null} - The chat object if found, otherwise null.
     */
    "get_message": function (messageId) {
        return MessageCollection.findOne(
            {_id: messageId},
        )
    },
})