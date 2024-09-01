/**
 * File Description: Review database entity
 * File version: 1.0
 * Contributors: Vicky
 */

import {Meteor} from "meteor/meteor";
import {ReviewCollection} from "/imports/api/collections/reviews";

Meteor.methods({
    /**
     * Adds a new review to the database. Keep in mind this is an async method
     * @param {number} reviewRating - the rating for the review from 1 to 5.
     * @param {string} reviewComment - the bride's description for the review
     * @param {string} bookingId - the ID of the booking this review belongs to 
     * @returns {string} The unique ID of the newly created review (reviewId).
     */
    "add_review": function (reviewRating, reviewComment, bookingId) {
        return ReviewCollection.insert(
            {
                "reviewRating": reviewRating,
                "reviewComment": reviewComment,
                "bookingId": bookingId,
            }
        );
    },
    /**
     * Retrieves a single review instance from the database based on the review ID.
     * @param {string} reviewId - The ID of the review to retrieve.
     * @returns {object|null} - The review object if found, otherwise null.
     */
    "get_review": function (reviewId) {
        return ReviewCollection.findOne(
            { _id: reviewId },
        )
    },
})