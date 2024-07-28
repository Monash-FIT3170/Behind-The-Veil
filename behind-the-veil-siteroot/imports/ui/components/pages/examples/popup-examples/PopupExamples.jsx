/**
 * File Description: Popup examples
 * File version: 1.0
 * Contributors: Josh
 */

import React from "react";
import SinglePopupForSetExample from "./SinglePopupForSetExample";
import SimpleAutoplacedExample from "./SimpleAutoplacedExample";
import CalendarPopupExample from "./CalendarPopupExample";

const PopupExamples = () => {
    return (
        <div className="flex flex-col gap-3">
            <div className="large-text underline">Popups:</div>
            <SimpleAutoplacedExample />
            <SinglePopupForSetExample />
            <CalendarPopupExample />
        </div>
    )
}

export default PopupExamples;