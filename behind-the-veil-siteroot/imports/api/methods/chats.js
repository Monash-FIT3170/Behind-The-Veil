// NOTE: for the bookings details page, when they click 'send message' button
// we have to check if the chat exists - if yes, return the id, if no - create a new chat object

/**
 * File Description: Chat database entity
 * File version: 1.0
 * Contributors: Vicky, Katie
 */
import { ChatCollection } from "../collections/chats";
import { check } from 'meteor/check';

Meteor.methods({
    /**
     * Adds a new chat to the database. Keep in mind this is an async met
     * @param {string} brideUsername - The username of the bride associated with the chat.
     * @param {string} artistUsername - The username of the artist associated with the chat.
     * @param {Date} chatUpdatedDate - The date and time for when the most recent message was set.
     * @param {string} chatLastMessage - The last message sent in the chat.
     * @param {boolean} readByBride - The bride's read status of the chat.
     * @param {boolean} readByArtist - The artist's read status of the chat.
     * @returns {string} The unique ID of the newly created chat.
     */
    "create_chat": function (brideUsername, artistUsername, chatUpdatedDate, chatLastMessage, readByBride, readByArtist) {
        check(brideUsername, String)
        check(artistUsername, String)
        check(chatUpdatedDate, Date)
        check(chatLastMessage, Boolean)
        check(readByBride, Boolean)
        check(readByArtist, String)
        
        return ChatCollection.insert({
            brideUsername: brideUsername,
            artistUsername: artistUsername,
            chatUpdatedDate: chatUpdatedDate,
            chatLastMessage: chatLastMessage,
            readByBride: readByBride,
            readByArtist: readByArtist
        });
    },

    /**
     * Updates the chatUpdatedDate and chatLastMessage fields for a chat instance in the database.
     * @param {string} chatId - The ID of the chat to update.
     * @param {Date} chatUpdatedDate - The date and time to update as the chat's latest update date
     * @param {string} chatLastMessage - The message to update as the latest message sent.
     */
    "update_chat": function (chatId, chatUpdatedDate, chatLastMessage) {
        check(chatId, String)
        check(chatUpdatedDate, Date)
        check(chatLastMessage, String)

        ChatCollection.update(
            { _id: chatId },
            { $set: {
                chatUpdatedDate: chatUpdatedDate,
                chatLastMessage: chatLastMessage,
            } },
        );
    },

    /**
     * Updates either the readByBride or readByArtist fields for a chat instance depending on if 
     * the input username is the artist or bride username
     * @param {string} chatId - The ID of the chat to update.
     * @param {string} username - The username of the user who has read the chat
     * @param {boolean} read - The user's read status of the chat
     */
    "update_chat_read": function (chatId, username, read) {
        check(chatId, String)
        check(username, String)
        check(read, Boolean)

        // find the chat
        const chat = ChatCollection.findOne({ _id: chatId });
        
        // determine if the username is the artist or bride's username and select the
        // attribute to update accordingly
        const updateField = chat.brideUsername === username ? 'readByBride' : (chat.artistUsername === username ? 'readByArtist' : null);

        // update the relevant field
        ChatCollection.update(
            { _id: chatId },
            { $set: { [updateField]: read } }
        );
    },
})