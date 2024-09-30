/**
 * File Description: Review component
 * File version: 1.0
 * Contributors: Vicky
 */

import React, {useState, useId, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useSubscribe, useTracker} from "meteor/react-meteor-data";
import {Modal} from 'react-responsive-modal';

import WhiteBackground from "../../whiteBackground/WhiteBackground.jsx";
import PageLayout from "../../../enums/PageLayout";
import Loader from '../../loader/Loader';
import ServiceDetailsHeader from '../../service-details-header/ServiceDetailsHeader.jsx';
import PreviousButton from '../../button/PreviousButton';
import Input from '../../input/Input.jsx';
import Button from '../../button/Button.jsx';
import {CheckIcon, NoSymbolIcon} from "@heroicons/react/24/outline";
import { StarIcon } from '@heroicons/react/24/solid'

import ReviewCollection from '../../../../api/collections/reviews.js';
import BookingCollection from '../../../../api/collections/bookings.js';
import "../../../../api/methods/reviews.js";
import "../../../../api/methods/bookings.js";

import { useSpecificService } from '../../DatabaseHelper';
import { useUserInfo } from '../../util.jsx';


/**
 * Component for reviews
 */
export const Review = () => {
    const userInfo = useUserInfo();

    const [leaveReview, setLeaveReview] = useState(true); // track whether the user has left a review or not
    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewComment, setReviewComment] = useState("");
    const [reviewRating, setReviewRating] = useState(0);
    const [hoveredStar, setHoveredStar] = useState(0); // track the star currently being hovered
    const [errors, setErrors] = useState({
        inputReviewTitle: "",
        inputReviewComment: "",
        inputReviewRating: ""
    });

    const [serviceId, setServiceId] = useState(null);

    // confirmation modal attributes
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    // grab the booking ID from the URL
    const {bookingId} = useParams();

    // set ID's for input
    const reviewTitleInputId = useId();
    const reviewCommentInputId = useId();

    // set up subscription to reviews and bookings
    const isLoadingReviews = useSubscribe('specific_review', bookingId);
    const isLoadingBookings = useSubscribe('specific_booking', bookingId);
    
    // get review data from db
    let reviewData = useTracker(() => {
        return ReviewCollection.find({bookingId: bookingId}).fetch();
    });
    let bookingData = useTracker(() => {
        return BookingCollection.find({_id: bookingId}).fetch();
    })

    // set the review attributes when reviewData has loaded
    useEffect(() => {
        if (reviewData.length > 0) {
            const review = reviewData[0]
            setReviewTitle(review.reviewTitle)
            setReviewRating(review.reviewRating)
            setReviewComment(review.reviewComment)
        }
    }, [reviewData]);

    // set the serviceId when bookingData has loaded
    useEffect(() => {
        if (bookingData.length > 0) {
            const booking = bookingData[0]
            const serviceIdFromBooking = booking.serviceId;
            setServiceId(serviceIdFromBooking); 
            if (booking.bookingIsReviewed) {
                setLeaveReview(false);
            }
        }
    }, [bookingData]);

    // use the serviceId to fetch relevant data for the service header card
    const {
        isLoading: isLoadingService,
        serviceData,
        artistData,
        serviceImagesData,
        profileImageData,
    } = useSpecificService(serviceId ?? null); // pass serviceId if available, else pass null

    const isLoading = isLoadingReviews() || isLoadingBookings() || isLoadingService;

    // when the user clicks submit review, conduct error checks to make sure that input fields are 
    // not empty
    const handleSubmitReview = (event) => {
        event.preventDefault();

        // handle input errors (empty review title, description or no rating)
        let newErrors = {};
        let isError = false;

        // check for empty fields in each field. make sure nothing is empty
        if (!reviewTitle) {
            newErrors.inputReviewTitle = "Please input a review title";
            isError = true;
        }
        if (!reviewComment) {
            newErrors.inputReviewComment = "Please input a review comment";
            isError = true;
        }
        if (reviewRating == 0) {
            newErrors.inputReviewRating = "Please input a review rating";
            isError = true;
        }

        // update errors state with new error messages
        setErrors(newErrors);

        // open the modal if there are no errors
        if (!isError) {
            onOpenModal()
        }
    };

    const confirmReview = (event) => {
        event.preventDefault();

        // save the review to the mongodb database and refresh the page to display the review
        try {
            // wrap meteor.call in a promise
            new Promise((resolve, reject) => {
                // asynchronous operation
                Meteor.call('add_review', reviewTitle, reviewRating, reviewComment, bookingId, (error, result) => {
                    if (error) {
                        reject(error); // if there's an error, go to the catch block
                    } else {
                        resolve(result); // if there's no error, continue with the rest of the block
                    }
                });
            }).then(() => {
                console.log("Review successfully added");
                setLeaveReview(false);
            });
        } catch (error) {
            console.log("Error adding review. Returned with error:" + error.message);
        }

        // set the bookingIsReviewed attribute of the booking to 'true'
        bookingReviewedObj = {
            bookingIsReviewed: true
        }
        try {
            // wrap meteor.call in a promise
            new Promise((resolve, reject) => {
                // asynchronous operation
                Meteor.call('update_booking_details', bookingId, bookingReviewedObj, (error, result) => {
                    if (error) {
                        reject(error); // if there's an error, go to the catch block
                    } else {
                        resolve(result); // if there's no error, continue with the rest of the block
                    }
                });
            }).then(() => {
                console.log("Booking successfully updated");
            });
        } catch (error) {
            console.log("Error adding review. Returned with error:" + error.message);
        }
    }


    if (isLoading || serviceData == null) {
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
                    service={serviceData.serviceName}
                    type={serviceData.serviceType}
                    artist={artistData.profile.alias}
                    price={serviceData.servicePrice}
                    />
                    <div>
                        {/* if no review exists, show the leave review page. otherwise, show the review.*/}
                        {leaveReview ? (
                            <form onSubmit={handleSubmitReview} className="flex flex-col gap-6">
                                <div className="flex flex-col md:flex-row gap-4 md:gap-10 md:justify-between">
                                    {/* review title input */}
                                    <div>
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
                                            className={"w-64 sm:w-96"}
                                            name="reviewTitle"
                                            onChange={(e) => {
                                                setReviewTitle(e.target.value)
                                            }}
                                        />
                                        {!reviewTitle && errors.inputReviewTitle && <span className="text-cancelled-colour">{errors.inputReviewTitle}</span>}
                                    </div>
                                    {/* review rating input */}
                                    <div className="pr-20">
                                        <div className="main-text">Rating</div>
                                        <div className="flex items-center">
                                            {/* display 5 star rating clickable icons */}
                                            {[...Array(5)].map((_, i) => {
                                                const currentStar = i + 1;
                                                return (
                                                    <StarIcon
                                                        key={i}
                                                        className={`lg:size-8 ml-2 sm:size-8 md:size-6 size-6 cursor-pointer 
                                                            ${currentStar <= (hoveredStar || reviewRating) ? 'text-secondary-purple-hover' : 'text-gray-400'}`}
                                                        onMouseEnter={() => setHoveredStar(currentStar)} // highlight stars on the left when mouse is hovering
                                                        onMouseLeave={() => setHoveredStar(0)} // reset highlight when mouse stops hovering
                                                        onClick={() => setReviewRating(currentStar)} // set rating when clicked
                                                    />
                                                );
                                            })}
                                        </div>
                                        {reviewRating == 0 && errors.inputReviewRating && <span className="text-cancelled-colour">{errors.inputReviewRating}</span>}
                                    </div>
                                    </div>
                                    {/* review comment input */}
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="reviewCommentInputId" className="main-text text-our-black">Your Review</label>
                                        <textarea id="reviewCommentInputId"
                                                className="input-base h-48"
                                                placeholder="Enter Your Review"
                                                onChange={(e) => {
                                                    setReviewComment(e.target.value)
                                                }}
                                                rows={4} cols={40}/>
                                        {!reviewComment && errors.inputReviewComment && <span className="text-cancelled-colour">{errors.inputReviewComment}</span>}
                                    </div>
                                    <Button
                                        className="bg-secondary-purple hover:bg-secondary-purple-hover flex gap-2 w-fit justify-center"
                                        type="submit"
                                    >
                                        <CheckIcon className="icon-base"/>
                                        Submit Review
                                    </Button>
                                    <Modal
                                        classNames={{
                                            modal: "w-[480px] h-[300px] rounded-[45px] bg-glass-panel-background border border-main-blue",
                                        }}
                                        open={open}
                                        onClose={onCloseModal}
                                        center
                                        showCloseIcon={false}
                                    >
                                        <div className="flex justify-center items-center h-full">
                                            <div className="flex flex-col gap-2">
                                                <h2 className="text-center title-text">Submit Review?</h2>
                                                <p className="text-center medium-text">Press No to keep editing.</p>
                                                <p className="text-center medium-text">You cannot edit your review once it is posted.</p>
                                                <div className="flex justify-center space-x-6 mt-5">
                                                    <Button
                                                        className="btn-base bg-secondary-purple hover:bg-secondary-purple-hover ps-[25px] pe-[25px] flex gap-1"
                                                        onClick={confirmReview}
                                                    >
                                                        <CheckIcon className="icon-base"/>
                                                        Yes
                                                    </Button>
                                                    <Button className="btn-base ps-[25px] pe-[25px] flex gap-1"
                                                            onClick={onCloseModal}>
                                                        <NoSymbolIcon className="icon-base"/>
                                                        No
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Modal>
                            </form>
                        ) : (
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col md:justify-between md:flex-row gap-4 md:gap-10">
                                    <div className="flex flex-col">
                                        <div className="main-text">Review Title</div>
                                        {/* TODO: make the below text grey */}
                                        <div className="main-text text-dark-grey">{reviewTitle}</div>
                                    </div>
                                    <div className="flex flex-col w-1/2">
                                            <div className="main-text">Rating</div>
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => {
                                                const currentStar = i + 1; // current star position (1-5)
                                                
                                                // if the current star is less than or equal to the review rating, show a full star
                                                if (currentStar <= reviewRating) {
                                                    return (
                                                        <StarIcon 
                                                            key={i} 
                                                            className="lg:size-8 ml-2  sm:size-8 md:size-6 size-6 text-secondary-purple-hover" 
                                                        /> 
                                                    );
                                                } 
                                                // if the current star is greater than the review rating, show an empty star
                                                else {
                                                    return (
                                                        <StarIcon 
                                                            key={i} 
                                                            className="lg:size-8 ml-2 sm:size-8 md:size-6 size-6 text-gray-400" 
                                                        />
                                                    );
                                                }
                                            })}
                                            </div>
                                    </div>
                                </div>
                                <div className="main-text">Your Review</div>
                                    <div className="main-text text-dark-grey">{reviewComment}</div>
                                </div>  
                        )}
                    </div>
                </div>
            </WhiteBackground>
        )
    }
}

export default Review;