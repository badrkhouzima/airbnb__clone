//import { Result } from "postcss";
import React, { useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import "mapbox-gl/dist/mapbox-gl.css";

function AppMap({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  const coordinates = searchResults.map((results) => ({
    longitude: results.long,
    latitude: results.lat,
  }));

  const center = getCenter(coordinates);

  const [initialViewState, setInitialViewState] = useState({
    longitude: center.longitude,
    latitude: center.latitude,
    zoom: 9,
    style: {
      width: 600,
      height: 1000,
    },
  });

  return (
    <Map
      {...initialViewState}
      mapStyle="mapbox://styles/badrkey/ckzdzbgb4004u14l9z0674fsv"
      mapboxAccessToken={process.env.mapBox_key}
      onViewportChange={(nextViewport) => setInitialViewState(nextViewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
             role="img"
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
            >
              📌
            </p>
          </Marker>
          {/* popup that show click on marker */}
          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </Map>
  );
}

export default AppMap;
