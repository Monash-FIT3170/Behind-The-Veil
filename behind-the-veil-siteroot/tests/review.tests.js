/**
 * File Description: Review database testing
 * File version: 1.0
 * Contributors: Vicky
 */
const assert = require('assert');
import {resetDatabase} from 'meteor/xolvio:cleaner';
import "../imports/api/methods/reviews";
import ReviewCollection from "../imports/api/collections/reviews";

/**
 * Test suite for client-side review methods.
 */
if (Meteor.isClient) {
    /**
     * Describes test cases for review methods.
     */
    describe('Review methods', function () {
        beforeEach(function () {
            resetDatabase(); // Clear the collection before each test
        });
        /**
         * Test case to check if a review can be added successfully.
         */
        it('can add a review', function () {
            // Wrap the Meteor.call in a Promise
            return new Promise((resolve, reject) => {
                Meteor.call("add_review",
                    3,
                    'Review comment',
                    'bookingId123',
                    // up to here it knows these are its args - it (somehow) also knows that you get back
                    // either an error or a value that is stuffed into reviewId (this can be any name).
                    (error, reviewId) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(reviewId);
                        }
                    } // this something that comes with promises. If reject and resolve are
                    // not present the promise doesn't understand its finished and will keep powering
                    // thru the method until it finds an end (there is none)
                );
            }).then(reviewId => {
                assert.notStrictEqual(reviewId, undefined, "Review ID is undefined");
                const review = ReviewCollection.findOne(reviewId);
                assert.notStrictEqual(review, null, "Review does not exist in the collection");
            }).catch(error => {
                assert.fail("Error adding review. Returned with error:" + error.message);
            });
        });
        /**
         * Test case to check if a review can be retrieved successfully.
         */
        it('can retrieve a review', function () {
            return new Promise((resolve, reject) => {
                const reviewId = ReviewCollection.insert({
                    reviewRating: 3,
                    reviewComment: 'Review comment',
                    bookingId: 'bookingId123'
                }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            }).then(reviewId => {
                return new Promise((resolve, reject) => {
                    Meteor.call('get_review', reviewId, (error, retrievedReview) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(retrievedReview);
                        }
                    });
                });
            }).then(retrievedReview => {
                assert.notStrictEqual(retrievedReview, null); // Check if a review object is returned
            }).catch(error => {
                assert.fail("Error adding review. Returned with error:" + error.message);
            });
        });
    });
}