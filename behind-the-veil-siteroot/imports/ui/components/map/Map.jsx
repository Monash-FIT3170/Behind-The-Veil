/**
 * File Description: A simple map component with hardcoded center
 * File version: 1.0
 * Contributors: Laura
 */

import React, {useEffect, useState, useRef} from 'react';
import mapboxgl from 'mapbox-gl';

import classNames from "classnames";

export const Map = ({ className, setMap }) => {

    const mapboxKey = 'pk.eyJ1IjoibHpoYTAxODEiLCJhIjoiY2x2ajl6cG0xMXA0NDJpbjFsMjg3MXRhcCJ9.O6uwgTLaLd3avXJGjJR_4A';
    mapboxgl.accessToken = mapboxKey

    const classes = classNames(className, "h-96 w-full");

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(144.995693);
    const [lat, setLat] = useState(-37.811541);
    const [zoom, setZoom] = useState(14);
    const australiaBounds = [[96.8168, -43.7405], [173.0205, -9.1422]];

    useEffect(() => {
        if (map.current) return;
        const mapInstance = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom,
            maxBounds: australiaBounds
        });

        if (setMap) {
            setMap(mapInstance);
        }

        map.current = mapInstance;

        return () => {
            mapInstance.remove();
        };
    }, [lat, lng, zoom, australiaBounds, setMap]);

    return (
        <div className='flex h-96 w-2/5 overflow-hidden rounded-[45px]'>
            <div className={classes} ref={mapContainer} />
        </div>
    );
};

export default Map;
