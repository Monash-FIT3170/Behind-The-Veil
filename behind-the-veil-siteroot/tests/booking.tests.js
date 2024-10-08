/**
 * File Description: Booking database testing
 * File version: 1.0
 * Contributors: Neth
 */
const assert = require('assert');
import {resetDatabase} from 'meteor/xolvio:cleaner';
import "../imports/api/methods/bookings";
import BookingCollection from "../imports/api/collections/bookings";

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
                    // up to here it knows these are its args - it (somehow) also knows that you get back
                    // either an error or a value that is stuffed into bookingID (this can be any name).
                    (error, bookingId) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(bookingId);
                        }
                    } // this something that comes with promises. If reject and resolve are
                    // not present the promise doesn't understand its finished and will keep powering
                    // thru the method until it finds an end (there is none)
                );
            }).then(bookingId => {
                assert.notStrictEqual(bookingId, undefined);
                const booking = BookingCollection.findOne(bookingId);
                assert.notStrictEqual(booking, null);
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
                assert.notStrictEqual(retrievedBooking, null); // Check if a booking object is returned
                assert.notStrictEqual(retrievedBooking, undefined); // Check if a booking object is returned

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
            Meteor.call('update_booking_details', bookingId, {'bookingStatus': 'Confirmed'});
            const updatedBooking = BookingCollection.findOne(bookingId);
            assert.strictEqual(updatedBooking.bookingStatus, 'Confirmed');
        });

        // has_booking_of_service
        /**
         * Test case to check if a booking with a particular service id can be found successfully.
         */
        
        it('can check if a booking exists for a service', function () {
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
                    Meteor.call('has_booking_of_service', 'service789', (error, bookingExists) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(bookingExists);
                        }
                    });
                });
            }).then(bookingExists => {
                assert.strictEqual(bookingExists, true); // Check if the booking exists for the service
            }).catch(error => {
                assert.fail("Error checking booking for service. Returned with error:" + error.message);
            });
        });

        /**
         * Test case to check if bookings can be retrieved by their status.
         */
        it('can retrieve bookings by status', function () {
            return new Promise((resolve, reject) => {
                const booking1 = BookingCollection.insert({
                    bookingStartDateTime: new Date(),
                    bookingEndDateTime: new Date(),
                    bookingLocation: 'Location1',
                    bookingPrice: 100,
                    bookingStatus: 'Confirmed',
                    brideUsername: 'bride123',
                    artistUsername: 'artist456',
                    serviceId: 'service789'
                });

                const booking2 = BookingCollection.insert({
                    bookingStartDateTime: new Date(),
                    bookingEndDateTime: new Date(),
                    bookingLocation: 'Location2',
                    bookingPrice: 150,
                    bookingStatus: 'Pending',
                    brideUsername: 'bride234',
                    artistUsername: 'artist567',
                    serviceId: 'service987'
                });

                const booking3 = BookingCollection.insert({
                    bookingStartDateTime: new Date(),
                    bookingEndDateTime: new Date(),
                    bookingLocation: 'Location3',
                    bookingPrice: 200,
                    bookingStatus: 'Confirmed',
                    brideUsername: 'bride345',
                    artistUsername: 'artist678',
                    serviceId: 'service654'
                });

                resolve([booking1, booking2, booking3]);
            }).then(() => {
                return new Promise((resolve, reject) => {
                    Meteor.call('get_bookings_by_status', 'Confirmed', (error, bookings) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(bookings);
                        }
                    });
                });
            }).then(bookings => {
                assert.strictEqual(bookings.length, 2); 
                assert.strictEqual(bookings[0].bookingStatus, 'Confirmed');
                assert.strictEqual(bookings[1].bookingStatus, 'Confirmed');
            }).catch(error => {
                assert.fail("Error retrieving bookings by status. Returned with error:" + error.message);
            });
        });
    });
}