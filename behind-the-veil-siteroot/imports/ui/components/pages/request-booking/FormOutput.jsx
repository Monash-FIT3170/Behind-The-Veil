/**
 * File Description: Form output component
 * File version: 1.0
 * Contributors: Neth
 */

import React from "react";
import QuestionMarkCircleIcon from "@heroicons/react/16/solid/QuestionMarkCircleIcon";
import ToolTip from "../../toolTip/ToolTip";

/**
 * FormOutput component displays a label and input field, with an optional tooltip.
 * @param {string} label - The label for the input field.
 * @param {string} input - The input value.
 * @param {string} textColor - The color of the label text.
 * @param {boolean} haveHelpText - Indicates if the tooltip should be displayed.
 * @param {string} tipText - The text to be displayed in the tooltip.
 * @returns {JSX.Element} - The rendered FormOutput component.
 */
const FormOutput = ({ label, input, textColor, haveHelpText, tipText}) => {
    return (
        <div className="booking-summary-input text">
            <span className={`label ${textColor} font-semibold`}>
                {label}
            </span>
            <span className="input font-semibold">
                {input}
            </span>
            {haveHelpText && (
                <span className="tooltip content-center">
                    <ToolTip tipText={tipText} tipIcon={QuestionMarkCircleIcon}  type="tooltip"/>
                </span>
            )}
        </div>
    );
};

export default FormOutput;