import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PropType from "prop-types";

import SearchBar from "./SearchBar";
import { addItineraryAsync } from "../redux/itinerarySlice";

const SurveyForm = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState({
    location: "",
    startDate: "",
    endDate: "",
  });

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    const newItinerary = {
      ...formValues,
    };
    dispatch(addItineraryAsync(newItinerary));
    handleClose();
    setStep(1); // Reset to the first step
    setFormValues({
      location: "",
      startDate: "",
      endDate: "",
    }); // Clear the form values
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { width: "50%", height: "50%" } }}
    >
      <DialogTitle>Add Itinerary</DialogTitle>
      <DialogContent>
        {step === 1 && (
          <Box className="survey-step">
            <Typography variant="h4" fontWeight={500} sx={{ mb: 2 }}>
              Where are you traveling?
            </Typography>
            <SearchBar
              handleChange={(newLocation) =>
                setFormValues({
                  ...formValues,
                  location: newLocation.description,
                })
              }
            />
            <Box className="button-group">
              <Button onClick={handleNext} color="primary" variant="contained">
                Next
              </Button>
            </Box>
          </Box>
        )}
        {step === 2 && (
          <Box className="survey-step">
            <Typography variant="h4" fontWeight={500} sx={{ mb: 2 }}>
              When are you planning to travel?
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                sx={{ px: 1 }}
                name="startDate"
                onChange={(newDate) =>
                  setFormValues({
                    ...formValues,
                    startDate: newDate.format("LL"),
                  })
                }
              />
              <DatePicker
                label="End Date"
                sx={{ px: 1 }}
                name="endDate"
                onChange={(newDate) =>
                  setFormValues({
                    ...formValues,
                    endDate: newDate.format("LL"),
                  })
                }
              />
            </LocalizationProvider>
            <Box className="button-group">
              <Button onClick={handleBack} color="primary" variant="outlined">
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                color="primary"
                variant="contained"
              >
                Submit
              </Button>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

SurveyForm.propTypes = {
  open: PropType.bool,
  handleClose: PropType.func,
};

export default SurveyForm;
