/**
 * File Description: A simple map component with a marker and circular layer at the given location
 * File version: 1.0
 * Contributors: Laura, Nishan
 */

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import classNames from "classnames";
import { mapboxKey, getCoordinates } from "./mapUtils";

export const MarkerMap = ({ className, location, radius }) => {
  mapboxgl.accessToken = mapboxKey;

  const classes = classNames(className, "h-96 w-full");

  const mapContainer = useRef(null);
  const map = useRef(null);
  const australiaBounds = [
    [96.8168, -43.7405],
    [173.0205, -9.1422],
  ];

  /**
   * Creates a circular GeoJSON feature based on a center point and a radius.
   *
   * @param {Array<number>} center - The center of the circle as [longitude, latitude].
   * @param {number} radiusInMeters - The radius of the circle in meters.
   * @param {number} [points=64] - The number of points used to create the circle. More points result in a smoother circle.
   * @returns {Object} A GeoJSON feature representing the circle.
   */
  const createCircle = (center, radiusInMeters, points = 64) => {
    const coords = {
      latitude: center[1],
      longitude: center[0],
    };

    const km = radiusInMeters / 1000;
    const ret = [];
    const distanceX = km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
    const distanceY = km / 110.574;

    for (let i = 0; i < points; i++) {
      const theta = (i / points) * (2 * Math.PI);
      const x = distanceX * Math.cos(theta);
      const y = distanceY * Math.sin(theta);

      ret.push([coords.longitude + x, coords.latitude + y]);
    }
    ret.push(ret[0]);

    return {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [ret],
      },
    };
  };

  /**
   * Calculates the bounding box of a circle based on its center and radius.
   *
   * @param {Array<number>} center - The center of the circle as [longitude, latitude].
   * @param {number} radiusInMeters - The radius of the circle in meters.
   * @returns {mapboxgl.LngLatBounds} The bounding box that encompasses the entire circle.
   */
  const getCircleBounds = (center, radiusInMeters) => {
    const circle = createCircle(center, radiusInMeters);
    const coordinates = circle.geometry.coordinates[0];

    const bounds = coordinates.reduce(
      (bounds, coord) => {
        return bounds.extend(coord);
      },
      new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])
    );

    return bounds;
  };

  // Load map
  useEffect(() => {
    if (map.current) return;

    const loadMap = async () => {
      // Get coordinates of location (using utility function)
      const coordinates = await getCoordinates(location);
      if (!coordinates) return;

      // Convert radius from km to meters
      const radiusInMeters = radius * 1000;

      // Create map
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [coordinates.longitude, coordinates.latitude],
        maxBounds: australiaBounds,
      });
      map.current = mapInstance;

      // Add marker to the location coordinates
      new mapboxgl.Marker({ color: "#D33B3B" })
        .setLngLat([coordinates.longitude, coordinates.latitude])
        .addTo(map.current);

      // Create circle GeoJSON and add it as a layer
      const circle = createCircle([coordinates.longitude, coordinates.latitude], radiusInMeters);
      mapInstance.on("load", () => {
        mapInstance.addSource("circle", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [circle],
          },
        });

        mapInstance.addLayer({
          id: "circle-layer",
          type: "fill",
          source: "circle",
          layout: {},
          paint: {
            "fill-color": "#D33B3B",
            "fill-opacity": 0.3,
          },
        });

        // Fit map to the circle's bounds
        const bounds = getCircleBounds([coordinates.longitude, coordinates.latitude], radiusInMeters);
        mapInstance.fitBounds(bounds, {
          padding: 20, // Add some padding around the edges
        });
      });
    };

    loadMap();

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [location, radius]);

  return (
    <div className="flex w-full h-96 overflow-hidden rounded-[45px]">
      <div className={classes} ref={mapContainer} />
    </div>
  );
};

export default MarkerMap;
