/**
 * File Description: Payment receipt database entity
 * File version: 1.0
 * Contributors: Cameron
 */
import { ReceiptCollection } from "../collections/receipts";

Meteor.methods({
    "add_receipt": function (paymentDatetime, paymentAmount, paymentType, paymentStatus, bookingId) {
        /**
         * Adds a new payment receipt to the database.
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
    /**
     * Retrieves a single receipt instance from the database based on the receipt ID.
     * @param {string} paymentId - The ID of the payment to retrieve.
     * @returns {object|null} - The payment receipt object if found, otherwise null.
     */
    "get_receipt": function (paymentId) {
        return ReceiptCollection.findOne(
            { _id: paymentId },
        )
    },
})