/**
 * File Description: Map examples
 * File version: 1.0
 * Contributors: Laura
 */

import React from "react";
import CenteredMap from "../../../map/CenteredMap";
import MapWithMarker from "../../../map/MarkerMap"

const MapExamples = () => {
    return (
        <div className="flex flex-col gap-3">
            <div className="large-text underline">Map:</div>
            <CenteredMap 
                className = {""} 
                location ={"Southern Cross,Melbourne,Australia"}
            ></CenteredMap>
            <MapWithMarker
                className = {""} 
                location ={"Southern Cross,Melbourne,Australia"}
            ></MapWithMarker>
        </div>
    )
}

export default MapExamples;