/**
 * File Description: Message database testing
 * File version: 1.0
 * Contributors: Neth
 */
const assert = require('assert');
import {resetDatabase} from 'meteor/xolvio:cleaner';
import "../imports/api/methods/messages";
import MessageCollection from "../imports/api/collections/messages";

/**
 * Test suite for client-side message methods.
 */
if (Meteor.isClient) {
    /**
     * Describes test cases for message methods.
     */
    describe('Message methods', function () {
        beforeEach(function () {
            resetDatabase(); // Clear the collection before each test
        });
        /**
         * Test case to check if a message can be added successfully.
         */
        it('can add a message', function () {
            // Wrap the Meteor.call in a Promise
            return new Promise((resolve, reject) => {
                Meteor.call("add_message",
                    new Date(),
                    'Message content',
                    'photo123',
                    'bride123',
                    'chat123',
                    // up to here it knows these are its args - it (somehow) also knows that you get back
                    // either an error or a value that is stuffed into messageID (this can be any name).
                    (error, messageId) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(messageId);
                        }
                    } // this something that comes with promises. If reject and resolve are
                    // not present the promise doesn't understand its finished and will keep powering
                    // thru the method until it finds an end (there is none)
                );
            }).then(messageId => {
                assert.notStrictEqual(messageId, undefined);
                const message = MessageCollection.findOne(messageId);
                assert.notStrictEqual(message, null);
            }).catch(error => {
                assert.fail("Error adding message. Returned with error:" + error.message);
            });
        });
    });
}
