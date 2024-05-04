/**
 * File Description: Map component with a centre at given location
 * File version: 1.0
 * Contributors: Laura
 */

import React, { useEffect, useState } from 'react';
import Map from './Map';
import { getCoordinates } from './api';

const CenteredMap = ({ className, location }) => {
    const [map, setMap] = useState(null);
    const [coordinates, setCoordinates] = useState(null);

    const handleSetMap = (map) => {
        if (map) {
            getCoordinates(location).then(coords => {
                setCoordinates(coords);
            });
        }
    };

    useEffect(() => {
        if (map && coordinates) {
            map.setCenter([coordinates.longitude, coordinates.latitude]);
        }
    }, [map, coordinates]);

    useEffect(() => {
        handleSetMap(map);
    }, [map]);

    // Render the Map component with the provided className and setMap function
    return <Map className={className} setMap={setMap} />;
};

export default CenteredMap;


