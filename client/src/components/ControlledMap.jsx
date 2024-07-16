import { Map, Marker } from "@vis.gl/react-google-maps";
import { useState } from "react";

import PropType from "prop-types";

export default function ControlledMap({ center, zoom, markers }) {
  const [cameraProps, setCameraProps] = useState({
    defaultCenter: { lat: center.lat, lng: center.lng },
    defaultZoom: zoom,
  });
  const handleCameraChange = (ev) => setCameraProps(ev.detail);

  return (
    <Map {...cameraProps} onCameraChanged={handleCameraChange}>
      {markers.map((marker) => {
        return (
          <Marker
            key={{ lat: marker.latitude, lng: marker.longitude }}
            position={{ lat: marker.latitude, lng: marker.longitude }}
          ></Marker>
        );
      })}
    </Map>
  );
}

ControlledMap.propTypes = {
  center: PropType.object,
  zoom: PropType.number,
  markers: PropType.array,
};
