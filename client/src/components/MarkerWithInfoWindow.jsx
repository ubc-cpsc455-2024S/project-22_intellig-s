import { useState } from "react";
import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

import PropType from "prop-types";
import { Typography } from "@mui/material";

export function MarkerWithInfoWindow({
  position,
  infoWindowContent,
  pinContent,
}) {
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setInfoWindowOpen(true)}
        position={position}
        title={"AdvancedMarker that opens an Infowindow when clicked."}
      >
        {pinContent && (
          <Pin>
            <Typography sx={{ color: "white" }}>{pinContent}</Typography>
          </Pin>
        )}
      </AdvancedMarker>
      {infoWindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={300}
          onCloseClick={() => setInfoWindowOpen(false)}
        >
          <Typography>{infoWindowContent}</Typography>
        </InfoWindow>
      )}
    </>
  );
}

MarkerWithInfoWindow.propTypes = {
  position: PropType.shape({ lat: PropType.number, lng: PropType.number }),
  infoWindowContent: PropType.string,
  pinContent: PropType.string,
};
