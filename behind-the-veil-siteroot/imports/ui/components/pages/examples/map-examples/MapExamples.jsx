/**
 * File Description: Map examples
 * File version: 1.0
 * Contributors: Laura
 */

import React from "react";
import Map from "../../../map/Map";
import CenteredMap from "../../../map/Loc";

const MapExamples = () => {
    return (
        <div className="flex flex-col gap-3">
            <div className="large-text underline">Map:</div>
            
            <CenteredMap
                className=""
                location="Melbourne,Australia"
            ></CenteredMap>
        </div>
    )
}

export default MapExamples;