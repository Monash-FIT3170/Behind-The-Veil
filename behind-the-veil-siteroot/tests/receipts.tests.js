/**
 * File Description: Receipt method testing
 * File version: 1.0
 * Contributors: Katie
 */
const assert = require('assert');
import {resetDatabase} from 'meteor/xolvio:cleaner';
import "../imports/api/methods/receipts";
import ReceiptCollection from "../imports/api/collections/receipts";
/**
 * Test suite for client-side receipt methods.
 */
if (Meteor.isClient) {
    /**
     * Describes test cases for receipt methods.
     */
    describe('Receipt methods', function () {
        beforeEach(function () {
            resetDatabase(); // Clear the collection before each test
        });
        /**
         * Test case to check if a receipt can be added to the database.
         */
        it('can add a new receipt to the database', function () {
            // Wrap the Meteor.call in a Promise
            return new Promise((resolve, reject) => {
                Meteor.call("add_receipt",
                    new Date(), 
                    150, 
                    'Deposit', 
                    'Paid', 
                    'booking456',
                    (error, receiptNumber) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(receiptNumber);
                        }
                    } 
                );
            }).then(receiptNumber => {
                assert.notStrictEqual(receiptNumber, undefined);
                const receipt = ReceiptCollection.findOne(receiptNumber);
                assert.notStrictEqual(receipt, null);
            }).catch(error => {
                assert.fail("Error adding booking. Returned with error:" + error.message);
            });
        });
        /**
         * Test case to check if a receipt can be retrieved by its ID.
         */
        it('can retrieve a receipt by receipt ID', function () {
            return new Promise((resolve, reject) => {
                const receiptId = ReceiptCollection.insert({
                    paymentDatetime: new Date(),
                    paymentAmount: 150,
                    paymentType: 'Deposit',
                    paymentStatus: 'Paid',
                    bookingId: 'booking456'
                }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            }).then(receiptId => {
                return new Promise((resolve, reject) => {
                    Meteor.call('get_receipt', receiptId, (error, retrievedReceipt) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(retrievedReceipt);
                        }
                    });
                });
            }).then(retrievedReceipt => {
                assert.notStrictEqual(retrievedReceipt, null); // Check if a receipt object is returned
                assert.strictEqual(retrievedReceipt.bookingId, 'booking456'); // Check if the correct receipt is retrieved
            }).catch(error => {
                assert.fail("Error retrieving receipt. Returned with error: " + error.message);
            });
        });
        /**
         * Test case to check if a receipt can be retrieved by booking ID.
         */
        it('can retrieve a receipt by booking ID', function () {
            return new Promise((resolve, reject) => {
                const receiptId = ReceiptCollection.insert({
                    paymentDatetime: new Date(),
                    paymentAmount: 100,
                    paymentType: 'Refund',
                    paymentStatus: 'Refunded',
                    bookingId: 'booking789'
                }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            }).then(() => {
                return new Promise((resolve, reject) => {
                    Meteor.call('get_receipt_from_booking', 'booking789', (error, retrievedReceipt) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(retrievedReceipt);
                        }
                    });
                });
            }).then(retrievedReceipt => {
                assert.notStrictEqual(retrievedReceipt, null); // Check if a receipt object is returned
                assert.strictEqual(retrievedReceipt.bookingId, 'booking789'); // Check if the correct receipt is retrieved
            }).catch(error => {
                assert.fail("Error retrieving receipt by booking. Returned with error: " + error.message);
            });
        });


        /**
         * Test case to check if a receipt can be updated from "Deposit" to "Refund".
         */
        it('can update receipt from Deposit to Refund', function () {
            return new Promise((resolve, reject) => {
                dateTime = new Date()
                Meteor.call("add_receipt",
                    dateTime, 
                    150, 
                    'Deposit', 
                    'Paid', 
                    'booking456',
                    (error, receiptNumber) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(receiptNumber);
                        }
                    } 
                );
            }).then((receiptNumber) => {
                return new Promise((resolve, reject) => {
                    Meteor.call('deposit_to_refund', receiptNumber, (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    });
                });
            }).then((result) => {
                assert.strictEqual(result, 1);

            }).catch(error => {
                assert.fail("Error updating receipt to refund. Returned with error: " + error.message);
            });
        });




    })
}