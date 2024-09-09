/**
 * File Description: Review component
 * File version: 1.0
 * Contributors: Vicky
 */

import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useSubscribe, useTracker} from "meteor/react-meteor-data"

import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Loader from '../../loader/Loader';
import ServiceDetailsHeader from '../../service-details-header/ServiceDetailsHeader.jsx';
import PreviousButton from '../../button/PreviousButton';

import ReviewCollection from '../../../../api/collections/reviews.js';
import "../../../../api/methods/reviews.js"
import BookingCollection from '../../../../api/collections/bookings.js';

import { useSpecificService } from '../../DatabaseHelper';


/**
 * Component for reviews
 */
export const Review = () => {
    const [leaveReview, setLeaveReview] = useState(true);

    // grab the booking ID from the URL
    const {bookingId} = useParams();

    // get service data from database
    const {
        isLoadingService,
        serviceData,
        artistData,
        serviceImagesData,
        profileImageData,
    } = useSpecificService(bookingId);

    // set up subscription to reviews and bookings
    const isLoadingReviews = useSubscribe('specific_review', bookingId);
    const isLoadingBookings = useSubscribe('specific_booking', bookingId);
    const isLoading = isLoadingReviews() || isLoadingBookings() || isLoadingService;

    // get review data from db
    let reviewData = useTracker(() => {
        return ReviewCollection.find({bookingId: bookingId}).fetch();
    });
    let bookingData = useTracker(() => {
        return BookingCollection.find({_id: bookingId}).fetch();
    })

    // if we have finished loading, print the data
    if (!isLoading) {
        // if there is an existing review, then set the leave review status to false
        if (reviewData.length != 0) {
            setLeaveReview(false);
        }
        //const booking
        console.log("booking id: ", bookingId);
        console.log("review data: ", reviewData);
        console.log("booking data: ", bookingData);
        console.log("service data: ", serviceData)
    }

    // method for submit button for the review - read the inputs then call db method to add 
    // review object to the database. then, set the leave review to false
    const handleSubmit = (event) => {
        event.preventDefault();
        // Grab data from form inputs and submit to database
        // After submission, set leaveReview to false
        setLeaveReview(false);
    };


    if (isLoading) {
        // is loader, display loader
        return (
            <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
                <Loader
                    loadingText={"loading . . ."}
                    isLoading={isLoading}
                    size={100}
                    speed={1.5}
                />
            </WhiteBackground>
        );}
    else {
        return (
            <WhiteBackground pageLayout={PageLayout.LARGE_CENTER}>
                <PreviousButton/>
                {/* display review details as a card */}
                <ServiceDetailsHeader
                service = "service name"
                type = "serivce type"
                artist = "artist name"
                price = "service price"
                                // service={serviceData.serviceName}
                                // type={serviceData.serviceType}
                                // artist={artistData.profile.alias}
                                // price={serviceData.servicePrice}
                />
                <div>
                    {/* if no review exists, show the leave review page. otherwise, show the review.*/}
                    {leaveReview ? (
                        <form onSubmit={handleSubmit}>
                            <h2>Leave a Review</h2>
                            <label>
                                Rating:
                                <input type="number" min="1" max="5" name="rating" required />
                            </label>
                            <label>
                                Comment:
                                <textarea name="comment" required />
                            </label>
                            <button type="submit">Submit Review</button>
                        </form>
                    ) : (
                        <div>
                            <h2>Your Review</h2>
                            {reviewData.map((review) => (
                                <div key={review._id}>
                                    <p>Rating: {review.rating}</p>
                                    <p>Comment: {review.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </WhiteBackground>
        )
    }
}

export default Review;