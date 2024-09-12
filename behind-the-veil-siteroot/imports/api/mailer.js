/**
 * File Description: Email related functions
 * File version: 1.2
 * Contributors: Nikki
 */

import { Meteor } from "meteor/meteor";
import { Email } from "meteor/email";
import { check } from "meteor/check";
import BookingStatus from "../ui/enums/BookingStatus";
import BookingCollection from "./collections/bookings";
import ServiceCollection from "./collections/services";
import UserCollection from "./collections/users";

Meteor.methods({
    /**
     * Sends an email about booking status change to BOTH users (bride and artist)
     * @param bookingId - id of booking to send about
     * @param statusAfter - the status that it was changed to
     */
    "sendStatusUpdateEmail": function (bookingId, statusAfter) {
        check([bookingId, statusAfter], [String]);

        // retrieve data (server side, so no need for meteor.call)
        const bookingData = BookingCollection.find({_id: bookingId}).fetch()[0];
        const serviceData = ServiceCollection.find({_id: bookingData.serviceId}).fetch()[0];
        const usersData = UserCollection.find({
            username: { $in : [bookingData.brideUsername, bookingData.artistUsername] }
        }).fetch();

        // if data is all there
        if (bookingData && serviceData && usersData) {
            const from = "Behind the Veil <behindtheveil010@gmail.com>";
            const subject = "[Behind the Veil] Booking status change alert";
            let text = `Booking Details: \n`;
            text += `Service Name: ${serviceData.serviceName} \n`;
            text += `Service Description: ${serviceData.serviceDesc} \n`;
            text += `Date: ${new Date(bookingData.bookingStartDateTime).toLocaleString()} \n`;
            text += `Price: $${bookingData.bookingPrice} \n\n`;

            text += "The status of this booking has now changed to being: " + statusAfter.toString() + "\n";

            if (statusAfter === BookingStatus.CANCELLED) {
                text += `\nThe user who cancelled the booking: ${bookingData.cancelUser} \n`;
                text += `Reason for cancellation: ${bookingData.cancelReason}`;
            }

            const userEmails = usersData.map((user) => user.emails[0].address)

            // send each separately to not reveal the email address of each user to each other
            for (let i=0; i < userEmails.length; i++) {
                Email.send({ to: userEmails, from, subject, text });
            }

        }
    },

    /**
     * Sends email for a new booking
     * @param bookingId - ID of new booking
     */
    "sendNewBookingEmail": function (bookingId) {
        check([bookingId], [String]);

        // retrieve data (server side, so no need for meteor.call)
        const bookingData = BookingCollection.find({_id: bookingId}).fetch()[0];
        const serviceData = ServiceCollection.find({_id: bookingData.serviceId}).fetch()[0];
        const usersData = UserCollection.find({
            username: { $in : [bookingData.brideUsername, bookingData.artistUsername] }
        }).fetch();

        // if data is all there
        if (bookingData && serviceData && usersData) {
            const from = "Behind the Veil <behindtheveil010@gmail.com>";
            const subject = "[Behind the Veil] New Booking";
            let text = `You have a new booking: \n\n`;
            text += `Booking Details: \n`;
            text += `Service Name: ${serviceData.serviceName} \n`;
            text += `Service Description: ${serviceData.serviceDesc} \n`;
            text += `Date: ${new Date(bookingData.bookingStartDateTime).toLocaleString()} \n`;
            text += `Price: $${bookingData.bookingPrice} \n\n`;

            const userEmails = usersData.map((user) => user.emails[0].address)

            // send each separately to not reveal the email address of each user to each other
            for (let i=0; i < userEmails.length; i++) {
                Email.send({ to: userEmails[i], from, subject, text });
            }
        }
    }
});

