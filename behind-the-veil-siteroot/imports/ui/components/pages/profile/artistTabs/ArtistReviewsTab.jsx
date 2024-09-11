import React from 'react';
import Loader from '../../../loader/Loader';
import { StarIcon } from '@heroicons/react/24/solid'

import { useArtistReviews } from "../../../DatabaseHelper";
import ReviewCard from '../../../card/ReviewCard';
export const ArtistReviewsTab = ({ username }) => {
    const { isLoading, reviewArray, artistReviewData } = useArtistReviews(username);

    const calculateReviewStats = (reviewSourceArray) => {
        const totalReviews = reviewSourceArray.length;

        // Calculate rating sum and average
        const ratingSum = reviewSourceArray.reduce((sum, review) => sum + review.reviewRating, 0);
        const ratingAverage = Math.round((ratingSum / totalReviews).toFixed(1) * 2) / 2;

        // Calculate rating distribution (counts of each rating from 1 to 5)
        const ratingDistribution = reviewSourceArray.reduce((distribution, review) => {
            distribution[review.reviewRating] = (distribution[review.reviewRating] || 0) + 1;
            return distribution;
        }, {});

        // Find the maximum number of reviews for any rating
        const maxReviewsCount = Math.max(...Object.values(ratingDistribution));

        // Convert the rating distribution counts into percentages
        const ratingDistributionPercent = Object.keys(ratingDistribution).reduce((percentages, star) => {
            percentages[star] = (ratingDistribution[star] / maxReviewsCount) * 100;
            return percentages;
        }, {});

        // Return all calculated values
        return {
            totalReviews,
            ratingAverage,
            ratingDistribution,
            ratingDistributionPercent,
        };
    };

    const reviewStats = calculateReviewStats(artistReviewData);

    if (isLoading) {
        return (
            <Loader
                loadingText={"Reviews are loading . . ."}
                isLoading={isLoading}
                size={100}
                speed={1.5}
            />
        )
    } else {
        return (
            reviewStats.totalReviews !== 0 ? (
                <div>
                    {/* Ratings Section */}
                    <div className='lg:grid lg:grid-cols-2 gap-8'>
                        {/* Average Ratings Section */}
                        <div className='lg:pl-20 lg:py-6'>
                            <div className="text-xl font-semibold mb-2">Overall Rating:</div>
                            <div className="flex items-center">
                                <span className="text-2xl lg:text-5xl">{reviewStats.ratingAverage}</span>
                                <div className="ml-2 flex items-center px-2">
                                    {[...Array(5)].map((_, i) => {
                                        const currentStar = i + 1;
                                        if (currentStar <= Math.floor(reviewStats.ratingAverage)) {
                                            return <StarIcon key={i} className="lg:size-8 ml-2 size-4 text-secondary-purple-hover" />; // Full Star
                                        } else if (currentStar === Math.ceil(reviewStats.ratingAverage) && reviewStats.ratingAverage % 1 !== 0) {
                                            return <StarIcon key={i} className="lg:size-8 ml-2 size-4 text-main-blue" />; // Half 0.5 rating star
                                        } else {
                                            return <StarIcon key={i} className="lg:size-8 ml-2 size-4 text-gray-400" />; // Empty star
                                        }
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Rating Distribution Bars */}
                        <div className='py-4'>
                            {Object.keys(reviewStats.ratingDistributionPercent)
                                .sort((a, b) => b - a) // Sort in descending order to show 5 stars at the top
                                .map((star) => (
                                    <div key={star} className="flex items-center mb-2">
                                        <StarIcon className="lg:size-5 mr-2 size-4 text-gray-500 " />
                                        <span className=' font-semibold lg:text-xl'>{star}</span>
                                        <div className=" w-2/3 rounded-full h-2 lg:h-3 ml-4">
                                            <div
                                                className={`bg-secondary-purple h-full rounded-full`}
                                                style={{ width: `${reviewStats.ratingDistributionPercent[star]}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* Client Reviews Section */}
                    <div className="flex flex-col gap-6 mt-2">
                    {reviewArray.map((review) => (
                            <ReviewCard
                                key={review._id}
                                reviewTitle={review.reviewTitle}
                                reviewComment={review.reviewComment}
                                date={review.booking.bookingStartDateTime} // Use booking start date from booking data
                                service={review.service.serviceName} // Use service name from booking data
                                price={review.booking.bookingPrice} // Use booking price from booking data
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <span className="text-xl font-semibold mb-2 lg:pl-20 lg:py-6">No reviews yet</span>
            )
        );
    };
};

export default ArtistReviewsTab;