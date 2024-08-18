/**
 * File Description: Chat database testing
 * File version: 1.0
 * Contributors: Vicky
 */
const assert = require('assert');
import {resetDatabase} from 'meteor/xolvio:cleaner';
import "../imports/api/methods/chats";
import ChatCollection from "../imports/api/collections/chats";

/**
 * Test suite for client-side booking methods.
 */
if (Meteor.isClient) {
    /**
     * Describes test cases for booking methods.
     */
    describe('Chat methods', function () {
        beforeEach(function () {
            resetDatabase(); // Clear the collection before each test
        });
        /**
         * Test case to check if a chat can be added successfully.
         */
        it('can add a chat', function () {
            // Wrap the Meteor.call in a Promise
            return new Promise((resolve, reject) => {
                Meteor.call("create_chat",
                    'bride123',
                    'artist456',
                    new Date(),
                    'last chat message',
                    true,
                    true,
                    // up to here it knows these are its args - it (somehow) also knows that you get back
                    // either an error or a value that is stuffed into chatId (this can be any name).
                    (error, chatId) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(chatId);
                        }
                    } // this something that comes with promises. If reject and resolve are
                    // not present the promise doesn't understand its finished and will keep powering
                    // thru the method until it finds an end (there is none)
                );
            }).then(chatId => {
                assert.notStrictEqual(chatId, undefined);
                const chat = ChatCollection.findOne(chatId);
                assert.notStrictEqual(chat, null);
            }).catch(error => {
                assert.fail("Error adding chat. Returned with error:" + error.message);
            });
        });
        /**
         * Test case to check if a chat can be updated successfully.
         */
        it('can update chat details', function () {
            const chatId = ChatCollection.insert({
                brideUsername:  'bride123',
                artistUsername: 'artist456',
                chatUpdatedDate: new Date(),
                chatLastMessage: 'last chat message',
                readByBride: true,
                readByArtist: true,
            });
            const newDate = new Date();
            Meteor.call('update_chat', chatId, newDate, 'new last chat message');
            const updatedChat = ChatCollection.findOne(chatId);
            assert.strictEqual(updatedChat.chatUpdatedDate.getTime(), newDate.getTime());
            assert.strictEqual(updatedChat.chatLastMessage, 'new last chat message');
            assert.strictEqual(updatedChat.readByBride, true);
            assert.strictEqual(updatedChat.readByArtist, true);
        });
        /**
         * Test case to check if a chat's read status can be updated successfully.
         */
        it('can update chat read status', function () {
            const chatId = ChatCollection.insert({
                brideUsername:  'bride123',
                artistUsername: 'artist456',
                chatUpdatedDate: new Date(),
                chatLastMessage: 'last chat message',
                readByBride: false,
                readByArtist: false,
            });
            Meteor.call('update_chat_read', chatId, 'bride123', true);
            const updatedChat = ChatCollection.findOne(chatId);
            assert.strictEqual(updatedChat.readByBride, true);
            assert.strictEqual(updatedChat.readByArtist, false);
        });
    });
}