import { Meteor } from "meteor/meteor";
import { Email } from "meteor/email";
import { check } from "meteor/check";
import BookingStatus from "../imports/ui/enums/BookingStatus";
import BookingCollection from "../imports/api/collections/bookings";
import ServiceCollection from "../imports/api/collections/services";
import UserCollection from "../imports/api/collections/users";

// file containing info for mail server
import {fromUser} from "./secrets.js"

Meteor.methods({
    /**
     * Sends an email about booking status change to BOTH users (bride and artist)
     * @param bookingId - id of booking to send about
     * @param statusAfter - the status that it was changed to
     */
    sendStatusUpdateEmail({ bookingId, statusAfter }) {
        check([bookingId, statusAfter], [String]);

        // retrieve data (server side, so no need for meteor.call)
        const bookingData = BookingCollection.find({_id: bookingId}).fetch()[0];
        const serviceData = ServiceCollection.find({_id: bookingData.serviceId}).fetch()[0];
        const usersData = UserCollection.find({
            username: { $in : [bookingData.brideUsername, bookingData.artistUsername] }
        }).fetch();

        // if data is all there
        if (bookingData && serviceData && usersData) {
            const from = fromUser;
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
            Email.send({ to: userEmails, from, subject, text });
        }
    },
});