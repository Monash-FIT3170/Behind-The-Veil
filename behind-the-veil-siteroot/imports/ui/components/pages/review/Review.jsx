/**
 * File Description: Review component
 * File version: 1.0
 * Contributors: Vicky
 */

import React, {useState, useId} from 'react';
import {useParams} from 'react-router-dom';
import {useSubscribe, useTracker} from "meteor/react-meteor-data";

import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Loader from '../../loader/Loader';
import ServiceDetailsHeader from '../../service-details-header/ServiceDetailsHeader.jsx';
import PreviousButton from '../../button/PreviousButton';
import Input from '../../input/Input.jsx';
import Button from '../../button/Button.jsx';

import ReviewCollection from '../../../../api/collections/reviews.js';
import "../../../../api/methods/reviews.js";
import BookingCollection from '../../../../api/collections/bookings.js';

import { useSpecificService } from '../../DatabaseHelper';


/**
 * Component for reviews
 */
export const Review = () => {
    const [leaveReview, setLeaveReview] = useState(true);
    const [reviewTitle, setReviewTitle] = useState("");

    // grab the booking ID from the URL
    const {bookingId} = useParams();

    // set ID's for input
    const reviewTitleInputId = useId();
    const reviewCommentInputId = useId();


    // set up subscription to reviews and bookings
    const isLoadingReviews = useSubscribe('specific_review', bookingId);
    const isLoadingBookings = useSubscribe('specific_booking', bookingId);
    const isLoading = isLoadingReviews() || isLoadingBookings();

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

        // get the service id from the booking data and use this
        // get service data from database
        // get the other user
        // Meteor.call('get_booking', bookingId, (error, result) => {
        //     if (error) {
        //     console.error('Error fetching booking:', error);
        //     return;
        //     }
        //     console.log("service id: ", result.serviceId);
        // })

        // const {
        //     isLoading: isLoadingService,
        //     serviceData,
        //     artistData,
        //     serviceImagesData,
        //     profileImageData,
        // } = useSpecificService(bookingId);

        //const booking
        console.log("booking id: ", bookingId);
        console.log("review data: ", reviewData);
        console.log("booking data: ", bookingData);
        //console.log("service data: ", serviceData)
    }

    // method for submit button for the review - read the inputs then call db method to add 
    // review object to the database. then, set the leave review to false
    const handleSubmit = (event) => {
        event.preventDefault();
        // Grab data from form inputs and submit to database
        // After submission, set leaveReview to false
        setLeaveReview(false);
    };

    console.log("review title: ", reviewTitle);


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
                {/* main container for content */}
                <div className="flex flex-col gap-4 xl:px-40">
                    <div className="large-text">Leave a Review</div>
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
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                                <Input 
                                    id={reviewTitleInputId} 
                                    label={
                                        <label
                                            htmlFor={reviewTitleInputId}
                                            className="main-text text-our-black"
                                        >
                                            Review Title
                                        </label>
                                    }
                                    type="text"
                                    placeholder="Enter Review Title"
                                    className={"w-64 sm:w-96 lg:w-64 xl:w-96"}
                                    name="reviewTitle"
                                    onChange={(e) => {
                                        setReviewTitle(e.target.value)
                                    }}
                                />
                                <div className="main-text">Rating</div>
                                {/* TODO: Add star rating object here */}
                                <div>temporary star rating</div>
                                </div>
                                <Input 
                                    id={reviewCommentInputId} 
                                    label={
                                        <label
                                            htmlFor={reviewCommentInputId}
                                            className="main-text text-our-black"
                                        >
                                            Your Review
                                        </label>
                                    }
                                    type="text"
                                    placeholder="Enter Your Review"
                                    className={"w-64 sm:w-96 lg:w-64 xl:w-96"}
                                    name="reviewComment"
                                    onChange={(e) => {
                                        setReviewTitle(e.target.value)
                                    }}
                                />
                                <Button
                                    className="bg-secondary-purple hover:bg-secondary-purple-hover flex gap-2 w-fit justify-center"
                                    type="submit"
                                >
                                    Submit Review
                                    {/* <ArrowRightIcon className="icon-base" /> */}
                                </Button>
                            </form>
                        ) : (
                            <div>
                                <div className="main-text">Review Title</div>
                                {/* TODO: make the below text grey */}
                                <div className="main-text">{reviewData[0].reviewTitle}</div>
                                <div className="main-text">Rating</div>
                                {/* TODO: Add star rating object here */}
                                <div className="main-text">Your Review</div>
                                {/* TODO: make the below text grey */}
                                <div className="main-text">reviewData[0].reviewComment</div>
                            </div>
                        )}
                    </div>
                </div>
            </WhiteBackground>
        )
    }
}

export default Review;