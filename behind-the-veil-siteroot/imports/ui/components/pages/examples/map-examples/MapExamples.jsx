/**
 * File Description: Map examples
 * File version: 1.0
 * Contributors: Laura
 */

import React from "react";
import Map from "../../../map/Map";

const MapExamples = () => {
    return (
        <div className="flex flex-col gap-3">
            <div className="large-text underline">Map:</div>
            <Map 
                className=""
                location="Melbourne, Australia"
            ></Map>
        </div>
    )
}

export default MapExamples;