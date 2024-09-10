/**
 * File Description: Messages database entity
 * File version: 1.0
 * Contributors: Vicky, Katie
 */
import { MessageCollection } from "../collections/messages";
import { check } from 'meteor/check';


Meteor.methods({
    /**
     * Adds a new message to the database. Keep in mind this is an async method
     * and needs to be put in a promise if you want the value right away.
     * @param {Date} messageSentTime - The date and time for when the message was sent.
     * @param {string} messageContent - The text sent in the message.
     * @param {boolean} messageRead - The status of the message, representing if the other user has read the message or not.
     * @param {string} photoId - The ID of the profile photo of the user who has sent the message.
     * @param {string} userUsername - The username of the user who has sent the message.
     * @param {string} chatId - The ID of the chat that the message is associated with.
     * @returns {string} The unique ID of the newly created message.
     */
    "add_message": function (messageSentTime, messageContent, messageRead, photoId, userUsername, chatId) {
        check(messageSentTime, Date)
        check(messageContent, String)
        check(messageRead, Boolean)
        check(photoId, String)
        check(userUsername, String)
        check(chatId, String)

        return MessageCollection.insert({
            messageSentTime: messageSentTime,
            messageContent: messageContent,
            messageRead: messageRead,
            photoId: photoId,
            userUsername: userUsername,
            chatId: chatId,
        });
    },
})