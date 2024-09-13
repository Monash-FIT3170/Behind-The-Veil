/**
 * File Description: Payment API
 * File version: 1.0
 * Contributors: Neth
 */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
    "processPayment": function (paymentData) {
        // Check is needed to validate the right payment data and santise the inputs
        check(paymentData, {
            cardNumber: String,
            cvv: String,
            expiryDate: String
        });

        // Returns true or false at an 20% change of failure
        const paymentSuccessful = Math.random() > 0.2;

        return { success: paymentSuccessful };
    }
});