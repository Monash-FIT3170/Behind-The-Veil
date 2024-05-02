const assert = require('node:assert').strict;
import {resetDatabase} from 'meteor/xolvio:cleaner';
import "../imports/api/methods/booking";
import BookingCollection from "../imports/api/collections/booking";

/**
 * Test suite for client-side booking methods.
 */
if (Meteor.isClient) {
    /**
     * Describes test cases for booking methods.
     */
    describe('Booking methods', function () {
        beforeEach(function () {
            resetDatabase(); // Clear the collection before each test
        });
        /**
         * Test case to check if a booking can be added successfully.
         */
        it('can add a booking', function () {
            // Wrap the Meteor.call in a Promise
            return new Promise((resolve, reject) => {
                Meteor.call("add_booking",
                    new Date(),
                    new Date(),
                    'Location',
                    100,
                    'Pending',
                    'bride123',
                    'artist456',
                    'service789',
                    (error, bookingId) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(bookingId);
                        }
                    }
                );
            }).then(bookingId => {
                assert.notEqual(bookingId, undefined);
                const booking = BookingCollection.findOne(bookingId);
                assert.notEqual(booking, undefined);
            }).catch(error => {
                assert.fail("Error adding booking. Returned with error:" + error.message);
            });
        });
        /**
         * Test case to check if a booking can be retrieved successfully.
         */
        it('can retrieve a booking', function () {
            return new Promise((resolve, reject) => {
                const bookingId = BookingCollection.insert({
                    bookingStartDateTime: new Date(),
                    bookingEndDateTime: new Date(),
                    bookingLocation: 'Location',
                    bookingPrice: 100,
                    bookingStatus: 'Pending',
                    brideUsername: 'bride123',
                    artistUsername: 'artist456',
                    serviceId: 'service789'
                }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            }).then(bookingId => {
                return new Promise((resolve, reject) => {
                    Meteor.call('get_booking', bookingId, (error, retrievedBooking) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(retrievedBooking);
                        }
                    });
                });
            }).then(retrievedBooking => {
                assert.notEqual(retrievedBooking, null); // Check if a booking object is returned
            }).catch(error => {
                assert.fail("Error adding booking. Returned with error:" + error.message);
            });
        });
        /**
         * Test case to check if a booking can be updated successfully.
         */
        it('can update booking details', function () {
            const bookingId = BookingCollection.insert({
                bookingStartDateTime: new Date(),
                bookingEndDateTime: new Date(),
                bookingLocation: 'Location',
                bookingPrice: 100,
                bookingStatus: 'Pending',
                brideUsername: 'bride123',
                artistUsername: 'artist456',
                serviceId: 'service789'
            });
            Meteor.call('update_booking_details', bookingId, ['bookingStatus'], ['Confirmed']);
            const updatedBooking = BookingCollection.findOne(bookingId);
            assert.equal(updatedBooking.bookingStatus, 'Confirmed');
        });
    });
}
