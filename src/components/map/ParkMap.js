import React from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
} from "react-google-maps";

function SimpleMap(props) {
  return (
    <div style={{ height: props.mapHeight, width: "100%" }}>
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{
          lat: parseInt(props.latlng.latitude),
          lng: parseInt(props.latlng.longitude),
        }}
      >
        <Marker
          key={1}
          position={{
            lat: parseInt(props.latlng.latitude),
            lng: parseInt(props.latlng.longitude),
          }}
        />
      </GoogleMap>
    </div>
  );
}

export default withScriptjs(withGoogleMap(SimpleMap));
