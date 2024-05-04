/**
 * File Description: A simple map component which accepts location as a centre
 * File version: 1.0
 * Contributors: Laura
 */

import React, {useEffect, useState, useRef} from 'react';
import mapboxgl from 'mapbox-gl';

import classNames from "classnames";
import { mapboxKey, getCoordinates } from './api';

export const CenteredMap = ({ className, setMap, location }) => {

    mapboxgl.accessToken = mapboxKey

    const classes = classNames(className, "h-96 w-full");

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [zoom, setZoom] = useState(14);
    const australiaBounds = [[96.8168, -43.7405], [173.0205, -9.1422]];

    useEffect(() => {
        if (map.current) return;

        const loadMap = async () => {
            const coordinates = await getCoordinates(location);
            if (!coordinates) return;

            const mapInstance = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [coordinates.longitude, coordinates.latitude],
                zoom: zoom,
                maxBounds: australiaBounds
            });

            console.log(coordinates);

            console.log('Map instance:', mapInstance);

            if (setMap) {
                setMap(mapInstance);
            }

            map.current = mapInstance;
        };

        loadMap();

        return () => {
            if (map.current) {
                map.current.remove();
            }
        };
    }, [location, setMap, australiaBounds]);

    return (
        <div className='flex h-96 w-2/5 overflow-hidden rounded-[45px]'>
            <div className={classes} ref={mapContainer} />
        </div>
    );
};

export default CenteredMap;
