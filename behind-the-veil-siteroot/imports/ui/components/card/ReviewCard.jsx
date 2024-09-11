/**
 * File Description: Reviews comment card
 * File version: 1.1
 * Contributors: Hirun
 */

import React from "react";
import classNames from "classnames";
import Card from "../card/Card";
import { StarIcon } from '@heroicons/react/24/solid'

/**
 * Component that displays a brides review
 * @param {string} className - Additional classes to be applied on top of the base style
 * @param {string} reviewTitle - Title of review
 * @param {string} reviewComment - Comment of review
 * @param {string} date - Date of service performed
 * @param {string} service - service Description
 * @param {string} price - Price of service
 * // TODO: may need to refactor props once the database schema is set up
 */
const ReviewCard = ({ className,reviewTitle, reviewComment, date, service, price, reviewRating }) => {
  const classes = classNames("review-details", className)
  return (
    <Card className={classes}>
      <div>
        <div className="text-xl font-bold mb-2">Review Title{reviewTitle}</div>
        <div className="medium-text text-our-black max-w-xl break-words">{reviewComment}</div>
      </div>
      <div>
        <div className="main-text text-dark-grey font-semibold"> Service: {service}</div>
        <div className="main-text text-dark-grey font-semibold"> Price: ${price}</div>
        <div className="main-text text-dark-grey font-semibold"> Date: {date ? date.split('T')[0] : type ? type : ""}</div>
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => {
            const currentStar = i + 1;
            if (currentStar <= Math.floor(reviewRating)) {
              return <StarIcon key={i} className="lg:size-8 ml-2 size-4 text-secondary-purple-hover" />; // Full star
            } else if (currentStar === Math.ceil(reviewRating) && reviewRating % 1 !== 0) {
              return <StarIcon key={i} className="lg:size-8 ml-2 size-4 text-main-blue" />; // Half star
            } else {
              return <StarIcon key={i} className="lg:size-8 ml-2 size-4 text-gray-400" />; // Empty star
            }
          })}
        </div>
      </div>

    </Card>
  );
};

export default ReviewCard;