/**
 * File Description: ToolTip component for displaying helpful information for accessibility.
 * File version: 1.0
 * Contributors: Neth
 */

import React from "react";
import "./tooltip.css";


/**
 * ToolTip component displays a tooltip with an icon and text.
 * @param {JSX.Element} tipIcon - The icon for the tooltip.
 * @param {string} tipText - The text to be displayed in the tooltip.
 * @returns {JSX.Element} - The rendered ToolTip component.
 */
const ToolTip = ({ tipIcon: ToolTipIcon, tipText}) => {
    return (
        <span className="tooltip content-center">
            <ToolTipIcon className="tooltip-icon size-4 text-hyperlink-colour"/>
            <div className="booking-tooltip border border-main-blue rounded-lg mt-1
            px-4 py-2 bg-glass-panel-background shadow-lg absolute w-96">
                {tipText}
            </div>
        </span>
    );
};

export default ToolTip;