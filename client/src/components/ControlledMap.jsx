import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import { useState } from "react";

import PropType from "prop-types";

export default function ControlledMap({ bounds, markers }) {
  const [cameraProps, setCameraProps] = useState({
    defaultBounds: bounds,
  });
  const handleCameraChange = (ev) => setCameraProps(ev.detail);

  return (
    <Map
      {...cameraProps}
      mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
      onCameraChanged={handleCameraChange}
    >
      {markers.map((marker) => {
        return (
          <AdvancedMarker
            key={marker.latitude}
            position={{ lat: marker.latitude, lng: marker.longitude }}
          ></AdvancedMarker>
        );
      })}
    </Map>
  );
}

ControlledMap.propTypes = {
  bounds: PropType.object,
  markers: PropType.array,
};
