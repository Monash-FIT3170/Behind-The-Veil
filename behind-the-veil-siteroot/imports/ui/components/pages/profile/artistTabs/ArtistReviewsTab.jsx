import React from 'react';
import Loader from '../../../loader/Loader';
import { useUserInfo } from '../../../util';
import { StarIcon } from '@heroicons/react/24/solid'

import { reviewCollection } from "../../../DatabaseHelper";

export const ArtistReviewsTab = ({ username }) => {
    const { isLoading, bookingsData, reviewSourceArray } = reviewCollection(username);

    if (isLoading) {
        <Loader
            loadingText={"Reviews are loading . . ."}
            isLoading={isLoading}
            size={100}
            speed={1.5}
        />
    }

    // Calculate the average rating from the reviewSourceArray
    const totalReviews = reviewSourceArray.length;
    const ratingSum = reviewSourceArray.reduce((sum, review) => sum + review.reviewRating, 0);
    const ratingAverage = Math.round((ratingSum / totalReviews).toFixed(1) * 2) / 2;

    // Create rating distribution (counts of each rating from 1 to 5)
    const ratingDistribution = reviewSourceArray.reduce((distribution, review) => {
        distribution[review.reviewRating] = (distribution[review.reviewRating] || 0) + 1;
        return distribution;
    }, {});

    // Find the maximum number of reviews for any rating
    const maxReviewsCount = Math.max(...Object.values(ratingDistribution));

    // Convert the rating distribution counts into percentages, relative to the max count
    const ratingDistributionPercent = {};
    Object.keys(ratingDistribution).forEach(star => {
        ratingDistributionPercent[star] = (ratingDistribution[star] / maxReviewsCount) * 100;
    });

    return (
        totalReviews !== 0 ? (
            <div>
                {/* Ratings Section */}
                <div className='lg:grid lg:grid-cols-2 gap-8'>
                    {/* Average Ratings Section */}
                    <div className='lg:pl-20 lg:py-6'>
                        <div className="text-xl font-semibold mb-2">Overall Rating:</div>
                        <div className="flex items-center">
                            <span className="text-2xl lg:text-5xl">{ratingAverage}</span>
                            <div className="ml-2 flex items-center px-2">
                                {[...Array(5)].map((_, i) => {
                                    const currentStar = i + 1;
                                    if (currentStar <= Math.floor(ratingAverage)) {
                                        return <StarIcon key={i} className="lg:size-8 ml-2 size-4 text-secondary-purple-hover" />; // Full Star
                                    } else if (currentStar === Math.ceil(ratingAverage) && ratingAverage % 1 !== 0) {
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
                        {Object.keys(ratingDistributionPercent)
                            .sort((a, b) => b - a) // Sort in descending order to show 5 stars at the top
                            .map((star) => (
                                <div key={star} className="flex items-center mb-2">
                                    <StarIcon className="lg:size-5 mr-2 size-4 text-gray-500 " />
                                    <span className=' font-semibold lg:text-xl'>{star}</span>
                                    <div className=" w-2/3 rounded-full h-2 lg:h-3 ml-4">
                                        <div
                                            className={`bg-secondary-purple h-full rounded-full`}
                                            style={{ width: `${ratingDistributionPercent[star]}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                {/* Client Reviews Section */}
                <div>
                    
                </div>
            </div>
        ) : (
            <span className="text-xl font-semibold mb-2 lg:pl-20 lg:py-6">No reviews yet</span>
        )
    );
};

export default ArtistReviewsTab;