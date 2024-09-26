/**
 * File Description: API to find coordinates from location input
 * File version: 1.0
 * Contributors: Laura
 */
import { config } from '../../../../config.js';

export const mapboxKey = config.MAPBOX_KEY;

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
