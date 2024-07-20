import { AdvancedMarker, Map, Pin } from "@vis.gl/react-google-maps";
import { useState } from "react";

import PropType from "prop-types";
import { Typography } from "@mui/material";

export default function ControlledMap({ bounds, markers, activeDay }) {
  const [cameraProps, setCameraProps] = useState({
    defaultBounds: bounds,
  });

  const handleCameraChange = (ev) => setCameraProps(ev.detail);

  let markerCount = 1;
  return (
    <Map
      {...cameraProps}
      mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
      onCameraChanged={handleCameraChange}
      clickableIcons={false}
    >
      {markers.map((marker) => {
        if (activeDay === null)
          return (
            <AdvancedMarker
              key={marker.latitude}
              position={{ lat: marker.latitude, lng: marker.longitude }}
            ></AdvancedMarker>
          );

        return activeDay === marker.day ? (
          <AdvancedMarker
            key={marker.latitude}
            position={{ lat: marker.latitude, lng: marker.longitude }}
          >
            <Pin>
              <Typography sx={{ color: "white" }}> {markerCount++}</Typography>
            </Pin>
          </AdvancedMarker>
        ) : null;
      })}
    </Map>
  );
}

ControlledMap.propTypes = {
  bounds: PropType.object,
  markers: PropType.array,
  activeDay: PropType.number,
};
