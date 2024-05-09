/**
 * File Description: Input examples
 * File version: 1.0
 * Contributors: Nikki
 */

import React from "react";
import SearchBarExamples from "./SearchBarExamples";

const ButtonExamples = () => {
    return (
        <div className="flex flex-col gap-3">
            <div className="large-text underline">Inputs:</div>
            <input className="input-base"/>
            <div className="main-text underline">Search bar</div>
            <SearchBarExamples/>
        </div>
    )
}

export default ButtonExamples;