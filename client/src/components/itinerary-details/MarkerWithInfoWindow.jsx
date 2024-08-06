import { useState } from "react";
import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

import PropType from "prop-types";
import { Grid, IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

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
        onClick={() => setInfoWindowOpen(!infoWindowOpen)}
        position={position}
        title={"AdvancedMarker that opens an Infowindow when clicked."}
      >
        {/* only specify pin children if prop is assigned by parent */}
        {pinContent && (
          <Pin>
            <Typography sx={{ color: "white" }}>{pinContent}</Typography>
          </Pin>
        )}
      </AdvancedMarker>
      {infoWindowOpen && (
        <InfoWindow
          anchor={marker}
          onCloseClick={() => setInfoWindowOpen(false)}
          headerDisabled
        >
          <Grid container spacing={0.5} sx={{ px: 1, overflow: "hidden" }}>
            <Grid item xs={11}>
              <Typography>{infoWindowContent}</Typography>
            </Grid>
            {/* close button */}
            <Grid item xs={1} sx={{ alignContent: "center" }}>
              <IconButton
                sx={{ width: 22, height: 22 }}
                onClick={() => setInfoWindowOpen(false)}
              >
                <Close sx={{ width: 22, height: 22 }} />
              </IconButton>
            </Grid>
          </Grid>
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
