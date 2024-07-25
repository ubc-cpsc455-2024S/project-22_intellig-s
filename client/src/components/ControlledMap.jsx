import { Map } from "@vis.gl/react-google-maps";
import { useState } from "react";

import PropType from "prop-types";
import { MarkerWithInfoWindow } from "./MarkerWithInfoWindow";

export default function ControlledMap({ bounds, markers, activeDay }) {
  const [cameraProps, setCameraProps] = useState({
    defaultBounds: bounds,
  });

  const handleCameraChange = (ev) => setCameraProps(ev.detail);

  return (
    <Map
      {...cameraProps}
      mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
      disableDefaultUI={true}
      zoomControl={true}
      onCameraChanged={handleCameraChange}
      clickableIcons={false}
    >
      {markers.map((marker, index) => {
        if (activeDay === null)
          return (
            <MarkerWithInfoWindow
              key={index}
              position={{ lat: marker.latitude, lng: marker.longitude }}
              infoWindowContent={`Day ${marker.dayNumber}: ${marker.title}`}
            ></MarkerWithInfoWindow>
          );

        return activeDay === marker.dayNumber ? (
          <MarkerWithInfoWindow
            key={marker.latitude}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            infoWindowContent={`Day ${marker.dayNumber}: ${marker.title}`}
            pinContent={`${marker.activityNumber}`}
          ></MarkerWithInfoWindow>
        ) : null;
      })}
    </Map>
  );
}

ControlledMap.propTypes = {
  bounds: PropType.shape({
    east: PropType.number,
    north: PropType.number,
    south: PropType.number,
    west: PropType.number,
  }),
  markers: PropType.arrayOf(
    PropType.shape({
      latitude: PropType.number,
      longitude: PropType.number,
      dayNumber: PropType.number,
      activityNumber: PropType.number,
      title: PropType.string,
    })
  ),
  activeDay: PropType.number,
};
