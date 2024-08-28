/**
 * File Description: Booking database entity
 * File version: 1.1
 * Contributors: Neth, Nikki
 */
import { ReceiptCollection } from "../collections/receipts";

Meteor.methods({
    "add_receipt": function (paymentDatetime, paymentAmount, paymentType, paymentStatus, bookingId) {
        /**
         * Adds a new booking to the database.
         * @param {Date} paymentDatetime - The date and time when the payment is made
         * @param {number} paymentAmount - Amount paid within the payment
         * @param {string} paymentType - Deposit or full payment
         * @param {string} paymentStatus - Paid or Refunded
         * @param {string} bookingId - The booking the payment was made for.
         * @returns {number} The unique ID number of the payment
         */
        return ReceiptCollection.insert({
            paymentDatetime: paymentDatetime,
            paymentAmount: paymentAmount,
            paymentType: paymentType,
            paymentStatus: paymentStatus,
            bookingId: bookingId
        });
    },
})