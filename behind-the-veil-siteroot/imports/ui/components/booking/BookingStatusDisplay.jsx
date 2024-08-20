/**
 * File Description: Booking Status display component
 * File version: 1.1
 * Contributors: Nikki
 */

import React from 'react';
import classNames from "classnames";
import Tippy from '@tippyjs/react/headless';
import {CheckIcon, ClockIcon, SparklesIcon, XMarkIcon} from "@heroicons/react/24/outline";
import QuestionMarkCircleIcon from "@heroicons/react/16/solid/QuestionMarkCircleIcon";

import BookingStatus from "../../enums/BookingStatus";

/**
 * Booking status display component with a tool tip popup
 * @param {string} bookingStatus - The status of the current booking (e.g. pending, completed, etc.)
 * @param {string} className - custom classes that override the button style, e.g. background color, font, etc
 */
export const BookingStatusDisplay = ({bookingStatus, className}) => {

    let statusIcon = null;
    let statusColour = "text-our-black";

    switch (bookingStatus) {
        case BookingStatus.COMPLETED:
            statusIcon = <SparklesIcon className="icon-base text-confirmed-colour"/>
            statusColour = "text-confirmed-colour";
            break;
        case BookingStatus.CONFIRMED:
            statusIcon = <CheckIcon className="icon-base text-confirmed-colour"/>
            statusColour = "text-confirmed-colour";
            break;
        case BookingStatus.PENDING:
            statusIcon = <ClockIcon className="icon-base text-pending-colour"/>
            statusColour = "text-pending-colour";
            break;
        case BookingStatus.REJECTED:
        case BookingStatus.CANCELLED:
            statusIcon = <XMarkIcon className="icon-base text-cancelled-colour"/>
            statusColour = "text-cancelled-colour";
            break;
        case BookingStatus.OVERDUE:
            statusIcon = <ClockIcon className="icon-base text-cancelled-colour"/>
            statusColour = "text-cancelled-colour";
            break;
    }
    // the constant text for any booking status component
    const toolTipText = (
        <div>
            <span className={"main-text"}>Active statuses:</span>
            <ul className="list-disc list-inside small-text">
                <li><span className={"text-confirmed-colour"}>Confirmed:</span> A booking scheduled to proceed</li>
                <li><span className={"text-pending-colour"}>Awaiting confirmation:</span> Waiting on artist to accept the booking</li>
                <li><span className={"text-cancelled-colour"}>Overdue:</span> Waiting for bride to confirm booking completion</li>
            </ul>

            <br/>

            <span className={"main-text"}>Closed statuses:</span>
            <ul className="list-disc list-inside small-text">
                <li className=""><span className={"text-confirmed-colour"}>Completed:</span> A booking that was completed successfully</li>
                <li className=""><span className={"text-cancelled-colour"}>Cancelled:</span> A booking cancelled by the artist or bride</li>
                <li className=""><span className={"text-cancelled-colour"}>Rejected:</span> A booking rejected by the artist</li>
            </ul>
        </div>
    );

    const toolTip = (
        <span className="content-center ml-2">
            <Tippy render={attrs => (
                <div
                    className="box border border-main-blue rounded-lg mt-1 px-6 py-6 white-glass-base shadow-lg w-[500px]"
                    tabIndex="-1" {...attrs}>
                    {toolTipText}
                </div>
            )}>
                <QuestionMarkCircleIcon className="tooltip-icon size-4 text-light-grey-hover"/>
            </Tippy>
        </span>
    );

    // combine classnames with input
    const baseClassnames = "flex flex-row gap-x-2 medium-text max-w-full break-all line-clamp-1 mb-3 capitalize " + statusColour;
    const combinedClassname = classNames(baseClassnames, className)

    return (
        <div className={combinedClassname}>
            {statusIcon}
            {/*return the booking status text, except for "pending" which becomes awaiting confirmation*/}
            <span className={"line-clamp-1"}>{bookingStatus === 'pending' ? 'Awaiting Confirmation' : bookingStatus}</span>
            {toolTip}
        </div>
    );
};

export default BookingStatusDisplay;