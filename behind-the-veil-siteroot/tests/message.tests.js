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
                    true,
                    'bride123',
                    'chat123',
                    (error, messageId) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(messageId);
                        }
                    } 
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