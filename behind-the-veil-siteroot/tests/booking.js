const assert = require('node:assert').strict;
import {resetDatabase} from 'meteor/xolvio:cleaner';
import "../imports/api/methods/booking";
import BookingCollection from "../imports/api/collections/booking";

if (Meteor.isClient) {
    describe('Booking methods', function () {
        beforeEach(function () {
            resetDatabase(); // Clear the collection before each test
        });
        it('can add a booking', function () {
            const bookingId = Meteor.call("add_booking",
                new Date(),
                new Date(),
                'Location',
                100,
                'Pending',
                'bride123',
                'artist456',
                'service789'
            );
            var all = BookingCollection.find({});
            console.log(all);
            assert.notEqual(bookingId, undefined);
            const booking = BookingCollection.findOne(bookingId);
            assert.notEqual(booking, undefined) // Check if a booking with the returned ID exists
        });
        it('can retrieve a booking', function () {
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
            console.log(bookingId)
            var all = BookingCollection.find({});
            console.log(all);
            const retrievedBooking = Meteor.call('get_booking', bookingId);
            assert.equal(retrievedBooking, "bundo")
            assert.notEqual(retrievedBooking, null); // Check if a booking object is returned
        });
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
            // Update booking status to 'Confirmed'
            var all = BookingCollection.find({});
            console.log(all);
            Meteor.call('update_booking_details', bookingId, ['bookingStatus'], ['Confirmed']);
            const updatedBooking = BookingCollection.findOne(bookingId);
            console.log(updatedBooking)
            assert.equal(updatedBooking.bookingStatus, 'Confirmed');
        });
    });
}
