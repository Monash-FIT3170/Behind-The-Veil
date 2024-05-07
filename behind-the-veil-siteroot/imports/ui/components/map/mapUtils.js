/**
 * File Description: API to find coordinates from location input
 * File version: 1.0
 * Contributors: Laura
 */

export const mapboxKey = 'pk.eyJ1IjoibHpoYTAxODEiLCJhIjoiY2x2ajl6cG0xMXA0NDJpbjFsMjg3MXRhcCJ9.O6uwgTLaLd3avXJGjJR_4A';

export const getCoordinates = async (location) => {
    try {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${mapboxKey}`;
        const response = await fetch(url);
        const data = await response.json();
        const [longitude, latitude] = data.features[0].center;
        return { latitude, longitude };
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        return null;
    }
};
