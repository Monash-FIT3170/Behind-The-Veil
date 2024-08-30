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

    /**
     * Retrieves a receipt instance from the database based on the booking ID.
     * @param {string} bookingId - The ID of the booking associated with the receipt.
     * @returns {object|null} - The payment receipt object if found, otherwise null.
     */
    "get_receipt_from_booking": function (bookingId) {
        return ReceiptCollection.findOne({ bookingId: bookingId });
    },


    "deposit_to_refund": function (receiptId) {
        /**
         * Updates a receipt's payment status from "Deposit" to "Refund" and updates the paymentDatetime to the current date and time.
         * @param {string} receiptId - The ID of the receipt to update.
         * @returns {number} The number of documents updated.
         */
        
        // Get the current date and time
        const currentDatetime = new Date();

        // Find the receipt with the given receiptId
        const receipt = ReceiptCollection.findOne({ _id: receiptId });

        if (receipt && receipt.paymentStatus === "Deposit") {
            // Update the receipt's payment status to "Refund" and set the paymentDatetime to the current date and time
            return ReceiptCollection.update(
                { _id: receiptId }, // Find the receipt by ID
                {
                    $set: {
                        paymentStatus: "Refund",
                        paymentDatetime: currentDatetime,
                    }
                }
            );
        } else {
            throw new Meteor.Error("invalid-receipt", "Receipt not found or already refunded");
        }
    },
})