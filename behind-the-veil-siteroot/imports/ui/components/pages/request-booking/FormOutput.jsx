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
                <span className="tooltip-icon content-center" title="Tooltip text">
                    <QuestionMarkCircleIcon className="size-4 text-hyperlink-colour"/>
                    <span></span>
                </span>
            )}
        </div>
    );
};

export default FormOutput;