/**
 * File Description: Payment method testing
 * File version: 1.0
 * Contributors: Katie
 */
const assert = require('assert');
import {resetDatabase} from 'meteor/xolvio:cleaner';
import "../imports/api/methods/payments";

/**
 * Test suite for client-side payment methods.
 */
if (Meteor.isClient) {
    /**
     * Describes test cases for payment methods.
     */
    describe('Payment methods', function () {
        beforeEach(function () {
            resetDatabase(); // Clear the collection before each test
        });
        /**
         * Test case to check if a valid payment is proccessed.
         */
        it('payment is processed', function () {

            const paymentData = {
                cardNumber: '5425233430109903',
                cardName: 'Kim',
                expDate: '12/25',
                cvv: '222'
            }
            const { cardNumber, expDate, cvv } = paymentData;
            const formattedExpiryDate = expDate.replace(/\D/g, ''); // Remove non-digit characters if needed
            
            Meteor.call("processPayment", { cardNumber, cvv, expiryDate: formattedExpiryDate }, (error, result) => {
                if (error) {
                    console.error('Error processing payment:', error);
                    alert('Payment Failed');
                } else {
                    if (result.success) {
                        assert.strictEqual(result.success, true)
                    }
                    assert.strictEqual(result.success, false)

                }
            })


        })
    });  
}