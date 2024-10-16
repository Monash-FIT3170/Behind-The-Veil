/**
 * File Description: Review database entity
 * File version: 1.0
 * Contributors: Vicky, Katie
 */

import {Meteor} from "meteor/meteor";
import {ReviewCollection} from "/imports/api/collections/reviews";
import { check } from 'meteor/check';


Meteor.methods({
    /**
     * Adds a new review to the database. Keep in mind this is an async method
     * @param {number} reviewTitle - the title for the review.
     * @param {number} reviewRating - the rating for the review from 1 to 5.
     * @param {string} reviewComment - the bride's description for the review
     * @param {string} bookingId - the ID of the booking this review belongs to 
     * @param {string} artistUsername - the username for the artist that this review corresponds to
     * @returns {string} The unique ID of the newly created review (reviewId).
     */
    "add_review": function (reviewTitle, reviewRating, reviewComment, bookingId, artistUsername) {
        check(reviewTitle, String)
        check(reviewRating, Number)
        check(reviewComment, String)
        check(bookingId, String)
        check(artistUsername, String)
        return ReviewCollection.insert(
            {
                "reviewTitle": reviewTitle,
                "reviewRating": reviewRating,
                "reviewComment": reviewComment,
                "bookingId": bookingId,
                "artistUsername": artistUsername
            }
        );
    },
    /**
     * Retrieves a single review instance from the database based on the review ID.
     * @param {string} bookingId - The booking ID of the review to retrieve.
     * @returns {object|null} - The review object if found, otherwise null.
     */
    "get_review": function (bookingId) {
    check(bookingId, String)    
    return ReviewCollection.findOne(
            { bookingId: bookingId },
        )
    },
})