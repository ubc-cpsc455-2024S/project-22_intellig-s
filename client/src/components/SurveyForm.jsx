import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PropType from "prop-types";

import SearchBar from "./SearchBar";
import { addItineraryAsync } from "../redux/itinerarySlice";
import "../App.css"; // Importing the CSS file

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
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Itinerary</DialogTitle>
      <DialogContent>
        {step === 1 && (
          <div className="survey-step">
            <h2>Where would you like to visit?</h2>
            <SearchBar
              handleChange={(newLocation) =>
                setFormValues({
                  ...formValues,
                  location: newLocation.description,
                })
              }
            />
            <div className="button-group">
              <Button onClick={handleNext} color="primary" variant="contained">
                Next
              </Button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="survey-step">
            <h2>When are you planning to travel?</h2>
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
            <div className="button-group">
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
            </div>
          </div>
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
