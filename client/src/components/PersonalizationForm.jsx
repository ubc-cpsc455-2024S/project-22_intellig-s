import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slider,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { updatePreferences } from "../redux/authSlice";

const PersonalizationForm = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    kids: null,
    pets: null,
    budget: 100,
    peopleInParty: 1,
    locationPreference: "",
    activityPreference: "",
    culinaryPreference: "",
    explorationPreference: "",
    nightlifeImportance: "",
    culturalInterest: null,
  });

  const handleButtonClick = (field, value) => {
    setFormValues({ ...formValues, [field]: value });
  };

  const handleSliderChange = (event, newValue) => {
    setFormValues({ ...formValues, budget: newValue });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    dispatch(updatePreferences(formValues));
    handleClose();
  };

  const renderButtonGroup = (field, options) => {
    return options.map((option) => (
      <Button
        key={option}
        variant={formValues[field] === option ? "contained" : "outlined"}
        onClick={() => handleButtonClick(field, option)}
      >
        {option}
      </Button>
    ));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Personalize Your Experience</DialogTitle>
      <DialogContent>
        <div>
          <Typography>Are you traveling with any kids?</Typography>
          {renderButtonGroup("kids", ["Yes", "No"])}
        </div>

        <div>
          <Typography>Will you be bringing any pets along?</Typography>
          {renderButtonGroup("pets", ["Yes", "No"])}
        </div>

        <div>
          <Typography>People in party:</Typography>
          <TextField
            type="number"
            name="peopleInParty"
            value={formValues.peopleInParty}
            onChange={handleInputChange}
            inputProps={{ min: 1 }}
          />
        </div>

        <div>
          <Typography>
            Would you rather explore bustling cities or tranquil countryside?
          </Typography>
          {renderButtonGroup("locationPreference", ["City", "Countryside"])}
        </div>

        <div>
          <Typography>
            What type of activities do you enjoy the most?
          </Typography>
          {renderButtonGroup("activityPreference", ["Adventure", "Relaxation"])}
        </div>

        <div>
          <Typography>
            What kind of culinary experiences are you interested in?
          </Typography>
          {renderButtonGroup("culinaryPreference", [
            "Fine dining and gourmet experiences",
            "Street food and local cuisine",
          ])}
        </div>

        <div>
          <Typography>
            Do you prefer structured tours or independent exploration?
          </Typography>
          {renderButtonGroup("explorationPreference", [
            "Structured tours",
            "Independent exploration",
          ])}
        </div>

        <div>
          <Typography>
            How important is nightlife to your travel plans?
          </Typography>
          {renderButtonGroup("nightlifeImportance", [
            "Very important",
            "Somewhat important",
            "Not important",
          ])}
        </div>

        <div>
          <Typography>
            Do you have a strong interest in local culture?
          </Typography>
          {renderButtonGroup("culturalInterest", ["Yes", "No"])}
        </div>

        <div>
          <Typography>Budget per day (USD):</Typography>
          <Slider
            value={formValues.budget}
            onChange={handleSliderChange}
            aria-labelledby="budget-slider"
            min={0}
            max={5000}
            step={10}
          />
          <TextField
            value={formValues.budget}
            name="budget"
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </div>

        <Button onClick={handleSubmit}>Submit</Button>
      </DialogContent>
    </Dialog>
  );
};

PersonalizationForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default PersonalizationForm;
