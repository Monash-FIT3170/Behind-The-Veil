/**
 * File Description: Booking form component
 * File version: 1.1
 * Contributors: Neth
 */

import React from "react";

const FormOutput = ({ label, input, textColor}) => {
    return (
        <div className="booking-summary-input text">
            <span className={`label ${textColor}`}>
                {label}
            </span>
            <span className="input">
                {input}
            </span>
        </div>
    );
};

export default FormOutput;