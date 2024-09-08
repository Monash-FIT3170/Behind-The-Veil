/**
 * File Description: Reviews comment card
 * File version: 1.1
 * Contributors: Hirun
 */

import React from "react";
import classNames from "classnames";
import Card from "../card/Card";

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
const ReviewCard = ({ className,reviewTitle, reviewComment, date, service, price }) => {
  const classes = classNames("review-details", className)
  return (
    <Card className={classes}>
      <div>
        {/*<div className="main-text text-dark-grey">Service</div>*/}
        <div className="title-text text-our-black">Review Title{reviewTitle}</div>
        <div className="main-text text-our-black max-w-xl break-words">{reviewComment}</div>
      </div>
      <div>
        <div className="main-text text-dark-grey">Service: {service}</div>
        <div className="main-text text-dark-grey">Price: ${price}</div>
        <div className="main-text text-dark-grey">Date: {date ? date : type ? type : ""}</div>
      </div>

    </Card>
  );
};

export default ReviewCard;