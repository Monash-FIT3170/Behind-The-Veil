/**
 * File Description: Simple Map component
 * File version: 1.0
 * Contributors: Laura
 */

import React, {useEffect, useState, useRef} from 'react';
import mapboxgl from 'mapbox-gl';

import classNames from "classnames";

export const Map = ({ className, location }) => {

    const mapboxKey = 'pk.eyJ1IjoibHpoYTAxODEiLCJhIjoiY2x2ajl6cG0xMXA0NDJpbjFsMjg3MXRhcCJ9.O6uwgTLaLd3avXJGjJR_4A';
    mapboxgl.accessToken = mapboxKey

    const classes = classNames(className, "h-96 w-full");

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(0);
    const [lat, setLat] = useState(0);
    const [zoom, setZoom] = useState(14);
    const australiaBounds = [[96.8168, -43.7405], [173.0205, -9.1422]];

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom,
            maxBounds: australiaBounds
        });

}, [lat, lng, zoom, australiaBounds]);

    useEffect(() => {
        const geocodeLocation = async (location) => {
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${mapboxKey}`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                if (data.features && data.features.length > 0) {
                    const lngLat = data.features[0].center;
                    setLng(lngLat[0]);
                    setLat(lngLat[1]);
                }
            } catch (error) {
                console.error('Error geocoding location:', error);
            }
        };

        geocodeLocation(location);
    }, [location]);

    return (
        <div className='flex h-96 w-1/2 overflow-hidden rounded-[45px]'>
            <div className={classes} ref={mapContainer} />
        </div>
    );
};

export default Map;
