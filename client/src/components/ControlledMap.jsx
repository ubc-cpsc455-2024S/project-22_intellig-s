import { Map, Marker } from "@vis.gl/react-google-maps";
import { useState } from "react";

import PropType from "prop-types";

export default function ControlledMap({ bounds, markers }) {
  const [cameraProps, setCameraProps] = useState({
    defaultBounds: bounds,
  });
  const handleCameraChange = (ev) => setCameraProps(ev.detail);

  return (
    <Map {...cameraProps} onCameraChanged={handleCameraChange}>
      {markers.map((marker) => {
        return (
          <Marker
            key={marker.latitude}
            position={{ lat: marker.latitude, lng: marker.longitude }}
          ></Marker>
        );
      })}
    </Map>
  );
}

ControlledMap.propTypes = {
  bounds: PropType.object,
  markers: PropType.array,
};
