/**
 * File Description: Payment API
 * File version: 1.0
 * Contributors: Neth, Katie
 */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';


Meteor.methods({

    /**
     * Process the payment for the booking
     * @param {object} paymentData - The data for the payment.
     */
    "processPayment": function (paymentData) {
        console.log(paymentData.expiryDate)

        // Check is needed to validate the right payment data and santise the inputs
        check(paymentData, {
            cardNumber: String,
            cvv: String,
            expiryDate: String
        });
        console.log(paymentData.expiryDate)

        

        
        
        // Remove all non-digit characters
        const digitsOnly = paymentData.cardNumber.replace(/\D/g, "");
        if (digitsOnly.length !== 16) {
            throw new Meteor.Error('invalid-length', 'The string must be exactly 16 characters long.');
        } else {
            // Implement Luhn algorithm for basic card number validation
            let sum = 0;
            let alternate = false;
            for (let i = digitsOnly.length - 1; i >= 0; i--) {
                let n = parseInt(digitsOnly.charAt(i), 10);
                if (alternate) {
                    n *= 2;
                    if (n > 9) {
                        n = (n % 10) + 1;
                    }
                }
                sum += n;
                alternate = !alternate;
            }
            if (sum % 10 !== 0) {
                throw new Meteor.Error('invalid-card-number', 'Card number needs to be from a valid card.');
            }
        }
        console.log(paymentData.expiryDate)

        if (!/^(0[1-9]|1[0-2])\d{2}$/.test(paymentData.expiryDate)) {
            throw new Meteor.Error('invalid-date', 'Date needs to be in mmyy format.');
        }
         else {
            const month = paymentData.expiryDate.slice(0, 2);
            const year = paymentData.expiryDate.slice(2, 4);
            const expDate = new Date(20 + year, month - 1);
            if (expDate < new Date()) {
                throw new Meteor.Error('card-expired', 'The card has expired.');
            }
        }
        if (!/^\d{3,4}$/.test(paymentData.cvv)) {
            throw new Meteor.Error('invalid-cvv', 'CVV must be 3 or 4 digits long.');
        }

        // Returns true or false at an 20% change of failure
        const paymentSuccessful = Math.random() > 0.2;

        return { success: paymentSuccessful };
    }
});