/**
 * File Description: Popup examples
 * File version: 1.0
 * Contributors: Josh
 */

import React from "react";
import SinglePopupForSetExample from "./SinglePopupForSetExample";
import SimpleAutoplacedExample from "./SimpleAutoplacedExample";

const PopupExamples = () => {
    return (
        <div className="flex flex-col gap-3">
            <div className="large-text underline">Popups:</div>
            <SimpleAutoplacedExample />
            <SinglePopupForSetExample />
        </div>
    )
}

export default PopupExamples;