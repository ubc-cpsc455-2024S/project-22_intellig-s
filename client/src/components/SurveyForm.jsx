import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { generateItineraryAsync } from "../redux/itinerarySlice";
import dayjs from "dayjs";

const SurveyForm = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
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
    dispatch(
      generateItineraryAsync({ itinerary: newItinerary, userId: user.id })
    );
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
      onClose={() => {
        handleClose();
        setStep(1);
        setFormValues({
          location: "",
          startDate: "",
          endDate: "",
        }); // Clear the form values
      }}
      PaperProps={{ sx: { width: "30%", height: "50%" } }}
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
                name="startDate"
                views={["year", "month", "day"]}
                disablePast
                sx={{ px: 1, mb: 1 }}
                onChange={(newDate) =>
                  setFormValues({
                    ...formValues,
                    startDate: newDate.format("LL"),
                    endDate: newDate.format("LL"),
                  })
                }
              />
              <DatePicker
                label="End Date"
                name="endDate"
                views={["year", "month", "day"]}
                disablePast
                value={formValues.endDate ? dayjs(formValues.endDate) : null}
                minDate={
                  formValues.startDate ? dayjs(formValues.startDate) : null
                }
                maxDate={
                  formValues.startDate
                    ? dayjs(formValues.startDate).add(5, "day")
                    : null
                }
                sx={{ px: 1 }}
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
