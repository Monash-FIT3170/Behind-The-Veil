/**
 * File Description: Chat database entity
 * File version: 1.0
 * Contributors: Vicky
 */
import { Meteor } from 'meteor/meteor';
import {ChatCollection} from "../collections/chat";

Meteor.methods({
    "add_chat": function (brideUser, artistUser, chatId) {
        /**
         * Adds a new chat to the database. Keep in mind this is an async method
         * and needs to be put in a promise if you want the value right away.
         * @param {string} brideUser - The bride's username.
         * @param {string} artistUser - The artist's username.
         * @param {string} chatId - The ID of the chat.
         * @returns {string} The unique ID of the newly created chat.
         */
        return ChatCollection.insert({
            brideUsername: brideUser,
            artistUsername: artistUser,
            chatId: chatId
        });
    },
    /**
     * Retrieves a single chat instance from the database based on the chat ID.
     * @param {string} chatId - The ID of the chat to retrieve.
     * @returns {object|null} - The chat object if found, otherwise null.
     */
    "get_chat": function (chatId) {
        return ChatCollection.findOne(
            {_id: chatId},
        )
    },
})