import React from "react";
import {
  Autocomplete,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import PublicIcon from "@mui/icons-material/Public";

const arbList = [
  { label: "Vancouver" },
  { label: "Calgary" },
  { label: "Edmonton" },
  { label: "Winnipeg" },
  { label: "Regina" },
  { label: "Toronto" },
];

function SearchBar({ autoCompleteList }) {
  return (
    <Autocomplete
      disablePortal
      autoComplete
      options={arbList}
      PaperComponent={CustomPaper}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            style: {
              outline: 0,
              borderRadius: "100em",
              backgroundColor: "#FFF",
              boxShadow: "0 0 10px 1px rgba(0,0,0,0.1)",
              padding: 4,
            },
            startAdornment: (
              <InputAdornment position="start">
                <PublicIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          placeholder="Search destinations..."
        />
      )}
    />
  );
}

function CustomPaper({ children }) {
  return (
    <Paper
      sx={{
        mt: 1,
        borderRadius: 5,
        outline: 2,
        maxHeight: "200px",
        overflowX: "scroll",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none", // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
        },
        "&-ms-overflow-style:": {
          display: "none", // Hide the scrollbar for IE
        },
        "& .MuiAutocomplete-listbox": {
          borderRadius: 5,
        },
        "& .MuiAutocomplete-listbox .MuiAutocomplete-option.Mui-focused": {
          borderRadius: 5,
        },
        "& .MuiAutocomplete-option": {
          mt: 0.5,
        },
      }}
    >
      {children}
    </Paper>
  );
}

export default SearchBar;
