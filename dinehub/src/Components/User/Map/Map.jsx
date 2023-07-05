import React, { useState } from "react";
// import { Map, Marker, } from 'react-map-gl';
import { Map, Marker } from "react-map-gl";

export const MapComponent = (props) => {
  const [viewport, setViewPort] = useState({
    width: "100%",
    height: "100%",
    latitude: props.latitude,
    longitude: props.longitude,
    zoom: 9,
  });

  return (
    <section className=" h-96 w-full rounded-md">
      <Map
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken="pk.eyJ1IjoiYWtoaWx2MDMzIiwiYSI6ImNsaDdnaGM0dzA5OGkzZ3BpaDdlejZuanYifQ.-FRRw7jUSm6r0TwReFdTTw"
        {...viewport}
      >
        <Marker latitude={props.latitude} longitude={props.longitude}>
          {" "}
          {/* Replace with your desired latitude and longitude */}
        </Marker>
      </Map>
    </section>
  );
};
