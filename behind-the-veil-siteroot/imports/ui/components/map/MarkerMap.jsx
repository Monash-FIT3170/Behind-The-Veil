/**
 * File Description: A simple map component with a marker at the given location
 * File version: 1.0
 * Contributors: Laura
 */

import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'

import classNames from "classnames";
import {getCoordinates, mapboxKey} from './mapUtils';

export const MarkerMap = ({ className, location }) => {

    mapboxgl.accessToken = mapboxKey

    const classes = classNames(className, "h-96 w-full");

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [zoom, setZoom] = useState(14);
    const australiaBounds = [[96.8168, -43.7405], [173.0205, -9.1422]];

    // Load map
    useEffect(() => {
        if (map.current) return;

        const loadMap = async () => {
            // Get coordinates of location (using utility funcion)
            const coordinates = await getCoordinates(location);
            if (!coordinates) return;

            // Create map
            const mapInstance = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [coordinates.longitude, coordinates.latitude],
                zoom: zoom,
                maxBounds: australiaBounds,
            });
            map.current = mapInstance;

            // Add marker to the location coordinates
            new mapboxgl.Marker({ color: '#D33B3B' }).setLngLat([coordinates.longitude, coordinates.latitude]).addTo(map.current);
        };

        loadMap();

        return () => {
            if (map.current) {
                map.current.remove();
            }
        };
    }, [location, australiaBounds]);

    return (
        <div className='flex h-96 w-1/3 overflow-hidden rounded-[45px]'>
            <div className={classes} ref={mapContainer} />
        </div>
    );
};

export default MarkerMap;
