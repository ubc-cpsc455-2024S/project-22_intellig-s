import { Map } from "@vis.gl/react-google-maps";
import { useState } from "react";

import PropType from "prop-types";
import { MarkerWithInfoWindow } from "./MarkerWithInfoWindow";

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
            <MarkerWithInfoWindow
              key={marker.latitude}
              position={{ lat: marker.latitude, lng: marker.longitude }}
              infoWindowContent={`Day ${marker.day}: ${marker.title}`}
            ></MarkerWithInfoWindow>
          );

        return activeDay === marker.day ? (
          <MarkerWithInfoWindow
            key={marker.latitude}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            infoWindowContent={`Day ${marker.day}: ${marker.title}`}
            pinContent={`${markerCount++}`}
          ></MarkerWithInfoWindow>
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
