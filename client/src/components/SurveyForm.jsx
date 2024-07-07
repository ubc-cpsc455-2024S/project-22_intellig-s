import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { addItinerary } from "../redux/itinerarySlice";
import '../App.css'; // Importing the CSS file

const SurveyForm = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState({
    name: "",
    dates: "",
    weather: "",
    accessibility: "",
    budget: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleWeatherChange = (weather) => {
    setFormValues({
      ...formValues,
      weather,
    });
    handleNext();
  };

  const handleSubmit = () => {
    const newItinerary = {
      ...formValues,
      id: Date.now(),
      imageUrl: "https://example.com/new.jpg",
    };
    dispatch(addItinerary(newItinerary));
    handleClose();
    setStep(1);  // Reset to the first step
    setFormValues({
      name: "",
      dates: "",
      weather: "",
      accessibility: "",
      budget: "",
    });  // Clear the form values
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Itinerary</DialogTitle>
      <DialogContent>
        {step === 1 && (
          <div className="survey-step">
            <h2>What's your name?</h2>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Name"
              type="text"
              fullWidth
              value={formValues.name}
              onChange={handleChange}
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
            <TextField
              autoFocus
              margin="dense"
              name="dates"
              label="Dates"
              type="text"
              fullWidth
              value={formValues.dates}
              onChange={handleChange}
            />
            <div className="button-group">
              <Button onClick={handleBack} color="primary" variant="outlined">
                Back
              </Button>
              <Button onClick={handleNext} color="primary" variant="contained">
                Next
              </Button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="survey-step">
            <h2>Do you prefer hot or cold weather?</h2>
            <div className="button-group">
              <Button onClick={() => handleWeatherChange("Hot")} color="primary" variant="contained">
                Hot
              </Button>
              <Button onClick={() => handleWeatherChange("Cold")} color="primary" variant="contained">
                Cold
              </Button>
            </div>
            <div className="button-group">
              <Button onClick={handleBack} color="primary" variant="outlined">
                Back
              </Button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="survey-step">
            <h2>Do you have any accessibility needs?</h2>
            <TextField
              autoFocus
              margin="dense"
              name="accessibility"
              label="Accessibility"
              type="text"
              fullWidth
              value={formValues.accessibility}
              onChange={handleChange}
            />
            <div className="button-group">
              <Button onClick={handleBack} color="primary" variant="outlined">
                Back
              </Button>
              <Button onClick={handleNext} color="primary" variant="contained">
                Next
              </Button>
            </div>
          </div>
        )}
        {step === 5 && (
          <div className="survey-step">
            <h2>What's your budget?</h2>
            <TextField
              autoFocus
              margin="dense"
              name="budget"
              label="Budget"
              type="text"
              fullWidth
              value={formValues.budget}
              onChange={handleChange}
            />
            <div className="button-group">
              <Button onClick={handleBack} color="primary" variant="outlined">
                Back
              </Button>
              <Button onClick={handleSubmit} color="primary" variant="contained">
                Submit
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SurveyForm;
