// NOTE: for the bookings details page, when they click 'send message' button
// we have to check if the chat exists - if yes, return the id, if no - create a new chat object

/**
 * File Description: Chat database entity
 * File version: 1.0
 * Contributors: Vicky
 */
import { ChatCollection } from "../collections/chats";

Meteor.methods({
    "create_chat": function (brideUsername, artistUsername, chatUpdatedDate, chatLastMessage) {
        /**
         * Adds a new booking to the database. Keep in mind this is an async met
         * @param {string} brideUsername - The username of the bride associated with the chat.
         * @param {string} artistUsername - The username of the artist associated with the chat.
         * @param {Date} chatUpdatedDate - The date and time for when the most recent message was set.
         * @param {string} chatLastMessage - The last message sent in the chat.
         * @returns {string} The unique ID of the newly created chat.
         */
        return ChatCollection.insert({
            brideUsername: brideUsername,
            artistUsername: artistUsername,
            chatUpdatedDate: chatUpdatedDate,
            chatLastMessage: chatLastMessage
        });
    },

    /**
     * Updates the chatUpdatedDate and chatLastMessage fields for a chat instance in the database.
     * @param {string} chatId - The ID of the chat to update.
     * @param {Date} chatUpdatedDate - The date and time to update as the chat's latest update date
     * @param {string} chatLastMessage - The message to update as the latest message sent.
     */
    "update_chat": function (chatId, chatUpdatedDate, chatLastMessage) {
        ChatCollection.update(
            { _id: chatId },
            { $set: {
                chatUpdatedDate: chatUpdatedDate,
                chatLastMessage: chatLastMessage,
            } },
        );
    }
})