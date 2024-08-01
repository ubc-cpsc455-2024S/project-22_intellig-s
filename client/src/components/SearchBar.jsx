/* eslint-disable react/prop-types */
import {
  Autocomplete,
  Paper,
  TextField,
  Box,
  Grid,
  Typography,
  Chip,
} from "@mui/material";
import parse from "autosuggest-highlight/parse";
import { debounce } from "@mui/material/utils";

import SearchIcon from "@mui/icons-material/Search";
import PublicIcon from "@mui/icons-material/Public";
import { useEffect, useMemo, useState, useRef } from "react";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// function to load the google maps script on page load
function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

function SearchBar({ handleChange }) {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const loaded = useRef(false);

  // load the google maps script on page load
  if (typeof window !== "undefined" && !loaded.current) {
    if (
      !document.querySelector('[src^="https://maps.googleapis.com/maps/api"]')
    ) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&loading=async&libraries=places`,
        document.querySelector("head"),
        "google-maps"
      );
    }

    loaded.current = true;
  }

  // used to limit amount of fetch calls, prevent too much network usage if there is fast typing
  const fetch = useMemo(
    () =>
      debounce((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 400),
    []
  );

  useEffect(() => {
    let active = true;

    // initialize google maps autocomplete service if required
    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    // call the google maps api to retrieve autocomplete results (only cities)
    fetch({ input: inputValue, types: ["(cities)"] }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      disablePortal
      autoComplete
      PaperComponent={CustomPaper}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No locations"
      onChange={(event, newValue) => {
        handleChange(newValue);
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          fullWidth
          InputProps={{
            ...params.InputProps,
            style: {
              backgroundColor: "#FFF",
              paddingRight: "6px",
            },
            startAdornment: <PublicIcon />,
            endAdornment: <SearchIcon />,
          }}
          placeholder="Search"
        />
      )}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings || [];

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length])
        );

        return (
          <Box
            {...props}
            key={props.key}
            sx={{ borderBottom: "1px solid lightgrey", py: 1.5, m: 0 }}
          >
            <Grid container alignItems="center">
              <Grid item sx={{ width: "100%", wordWrap: "break-word" }}>
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        );
      }}
      renderTags={(tagValue, getTagProps) => {
        return tagValue.map((option, index) => (
          <Chip {...getTagProps({ index })} key={option} label={option} />
        ));
      }}
    />
  );
}

function CustomPaper({ children }) {
  return (
    <Paper
      sx={{
        mt: 1,
        border: "2px solid",
        maxHeight: "200px",
        overflowX: "scroll",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none", // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
        },
        "&-ms-overflow-style:": {
          display: "none", // Hide the scrollbar for IE
        },
      }}
    >
      {children}
    </Paper>
  );
}

export default SearchBar;
