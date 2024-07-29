import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slider,
  Typography,
  TextField,
  InputAdornment,
  ButtonGroup,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { updatePreferences } from "../redux/authSlice";

const PersonalizationForm = ({ open, handleClose, initialFormValues }) => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(
    initialFormValues
      ? initialFormValues
      : {
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
        }
  );

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
    return (
      <ButtonGroup fullWidth variant="text">
        {options.map((option) => (
          <Button
            key={option}
            variant={formValues[field] === option ? "contained" : "text"}
            onClick={() => handleButtonClick(field, option)}
          >
            {option}
          </Button>
        ))}
      </ButtonGroup>
    );
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Personalize Your Experience</DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: "center" }}>
          <Typography>Are you traveling with any kids?</Typography>
          {renderButtonGroup("kids", ["Yes", "No"])}

          <Typography>Will you be bringing any pets along?</Typography>
          {renderButtonGroup("pets", ["Yes", "No"])}

          <Typography>People in party:</Typography>
          <Slider
            value={formValues.peopleInParty}
            name="peopleInParty"
            valueLabelDisplay="auto"
            shiftStep={30}
            step={1}
            min={1}
            max={10}
            onChange={handleInputChange}
          />

          <Typography>
            Would you rather explore bustling cities or tranquil countryside?
          </Typography>
          {renderButtonGroup("locationPreference", ["City", "Countryside"])}

          <Typography>
            What type of activities do you enjoy the most?
          </Typography>
          {renderButtonGroup("activityPreference", ["Adventure", "Relaxation"])}

          <Typography>
            What kind of culinary experiences are you interested in?
          </Typography>
          {renderButtonGroup("culinaryPreference", [
            "Fine dining and gourmet experiences",
            "Street food and local cuisine",
          ])}

          <Typography>
            Do you prefer structured tours or independent exploration?
          </Typography>
          {renderButtonGroup("explorationPreference", [
            "Structured tours",
            "Independent exploration",
          ])}

          <Typography>
            How important is nightlife to your travel plans?
          </Typography>
          {renderButtonGroup("nightlifeImportance", [
            "Very important",
            "Somewhat important",
            "Not important",
          ])}

          <Typography>
            Do you have a strong interest in local culture?
          </Typography>
          {renderButtonGroup("culturalInterest", ["Yes", "No"])}

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

          <Box>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

PersonalizationForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  initialFormValues: PropTypes.object,
};

export default PersonalizationForm;
