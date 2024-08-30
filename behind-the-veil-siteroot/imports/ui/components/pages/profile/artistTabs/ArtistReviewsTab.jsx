import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import BookingCollection from '/imports/api/collections/bookings';
import ReviewCollection from '../../../../../api/collections/reviews';
import Loader from '../../../loader/Loader';

export const ArtistReviewsTab = ({ username }) => {
    const { bookings, isLoading } = useTracker(() => {
        const bookingHandle = Meteor.subscribe('all_user_bookings', username);

        if (!bookingHandle.ready()) {
            return { bookings: [], isLoading: true };
        }

        const bookings = BookingCollection.find({ artistUsername: username }).fetch();
        return { bookings, isLoading: false };
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

    const reviewData = useTracker(() => {
        return ReviewCollection.find({}).fetch();
        // return ReviewCollection.find({ bookingId: { $in: bookingIds } }).fetch();
    })

    console.log('review', reviewData)
    
    const matchingReviews = reviewData.filter(review => bookingIds.includes(review.bookingId));

    const totalRating = matchingReviews.reduce((sum, review) => sum + review.reviewRating, 0);
    const averageRating = totalRating / matchingReviews.length;

    return (
        <div>
            <h2>Artist Reviews</h2>
            <ul>
                {bookingIds.map(id => (
                    <li key={id}>{id}</li>
                ))}
            </ul>
            <ul>
                {matchingReviews.map(review => (
                    <li key={review._id}>{review.reviewText}</li>
                ))}
            </ul>
            <p>{averageRating}</p>
        </div>
    );
};

export default ArtistReviewsTab;
