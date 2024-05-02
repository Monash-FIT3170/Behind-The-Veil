/**
 * File Description: Booking form component
 * File version: 1.1
 * Contributors: Neth
 */

import React from "react";

const FormOutput = ({ label, input, deposit}) => {
    return (
        <div className="booking-summary-input text">
            <span className={`label ${deposit} text-dark-grey`}>
                {label}
            </span>
            <span className="input">
                {input}
            </span>
        </div>
    );
};

export default FormOutput;