/**
 * File Description: Booking form component
 * File version: 1.0
 * Contributors: Neth
 */

import React from "react";
import QuestionMarkCircleIcon from "@heroicons/react/16/solid/QuestionMarkCircleIcon";

const FormOutput = ({ label, input, textColor, haveHelpText}) => {

    if (label === 'Date') {
        input = input[2]
    }

    return (
        <div className="booking-summary-input text">
            <span className={`label ${textColor}`}>
                {label}
            </span>
            <span className="input">
                {input}
            </span>
            {haveHelpText && (
                <span className="tooltip content-center">
                    <QuestionMarkCircleIcon className="tooltip-icon size-4 text-hyperlink-colour"/>
                    <div className="booking-tooltip border border-main-blue rounded-lg mt-1 px-4 py-2 bg-glass-panel-background shadow-lg absolute w-96">Full deposit for a service is required. If the booking is cancelled or rejected, the full fee will be refunded.</div>
                </span>
            )}
        </div>
    );
};

export default FormOutput;