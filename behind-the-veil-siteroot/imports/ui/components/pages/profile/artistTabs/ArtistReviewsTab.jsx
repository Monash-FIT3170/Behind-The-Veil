import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import BookingCollection from '/imports/api/collections/bookings';
import ReviewCollection from '/imports/api/collections/reviews';
import Loader from '../../../loader/Loader';
import { useState } from 'react';
import "/imports/api/methods/reviews";

import {returnReviews} from "../../../DatabaseHelper";

export const ArtistReviewsTab = ({ username }) => {
    const { bookings, reviews, isLoading } = useTracker(() => {
        const bookingHandle = Meteor.subscribe('all_user_bookings', username);
        const reviewHandle = Meteor.subscribe('all_reviews');

        console.log(bookingHandle, reviewHandle)

        if (!bookingHandle.ready()) {
            return { bookings: [], reviews:[] , isLoading: true };
        }
        

        const bookings = BookingCollection.find({ artistUsername: username }).fetch();
        console.log('bookings inside useTracker: ', bookings)
        const reviews = ReviewCollection.find({}).fetch();
        console.log( 'reviews inside userTracker', reviews)
        return { bookings, reviews, isLoading: false };
    }, [username]);

    if (isLoading) {
        <Loader
            loadingText={"Reviews are loading . . ."}
            isLoading={isLoading}
            size={100}
            speed={1.5}
        />
    }

    const bookingIds = bookings.map(booking => booking._id);
    console.log("bookingIds", bookingIds)

    const {
        isLoading_from_dbhelper,
        reviews_from_dbhelper } = returnReviews(username);

    console.log("reviews from dbhelper", reviews_from_dbhelper)
    // const matchingReviews = reviews.filter(review => bookingIds.includes(review.bookingId));

    // const totalRating = matchingReviews.reduce((sum, review) => sum + review.reviewRating, 0);
    // const averageRating = totalRating / matchingReviews.length;

    const [reviewId, setReviewId] = useState('');
    const [review, setReview] = useState(null);

    const handleGetReview = () => {
        Meteor.call('get_review', "66bb050ffc13ae0ea1e2604f", (error, reviewData) => {
            if (error) {
                console.error('Error retrieving review:', error);
            } else {
                setReview(reviewData);
                console.log('Retrieved review:', reviewData);
            }
        });
    }
    return (
        <div>
            {/* testing fetching */}
            <h2>Artist Reviews</h2>
            <ul>
                {bookingIds.map(id => (
                    <li key={id}>{id}</li>
                ))}
            </ul>
            {/* <ul>
                {matchingReviews.map(review => (
                    <li key={review._id}>{review.reviewText}</li>
                ))}
            </ul>
            <p>{averageRating}</p> */}
            <div>
            <button className=" underline text-red-600" onClick={handleGetReview}>Get Review</button>
            {review && (
                <div>
                    <h3>Review Details:</h3>
                    <p>Rating: {review.reviewRating}</p>
                    <p>Comment: {review.reviewComment}</p>
                    <p>Booking ID: {review.bookingId}</p>
                </div>
            )}
            </div>

            {/* Overall Ratings Section */}
            <div>

            </div>

            {/* Client Reviews Section */}
            <div>

            </div>
        </div>
    );
};

export default ArtistReviewsTab;
