import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slider,
  Typography,
  Box,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  OutlinedInput,
} from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { updatePreferences } from "../redux/authSlice";

function FormQuestion({ question, children }) {
  return (
    <Box sx={{ mt: 3, pb: 3, borderBottom: "lightgrey solid 1px" }}>
      <Typography sx={{ mb: 1 }}>{question}</Typography>
      {children}
    </Box>
  );
}

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
      <ToggleButtonGroup
        value={formValues[field]}
        onChange={(event, newValue) => {
          setFormValues({ ...formValues, [field]: newValue });
        }}
        exclusive
        fullWidth
        sx={{
          width: "70%",
        }}
      >
        {options.map((option) => (
          <ToggleButton
            key={option}
            value={option}
            sx={{
              "&.Mui-selected": {
                color: "#fff",
                backgroundColor: "primary.main",
                "&:hover": {
                  color: "#fff",
                  backgroundColor: "primary.main",
                },
              },
            }}
          >
            {option}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    );
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Personalize Your Experience</DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: "center" }}>
          <FormQuestion question={`Are you traveling with any kids?`}>
            {renderButtonGroup("kids", ["Yes", "No"])}
          </FormQuestion>

          <FormQuestion question={`Will you be bringing any pets along?`}>
            {renderButtonGroup("pets", ["Yes", "No"])}
          </FormQuestion>

          <FormQuestion
            question={`How many people do you usually travel with?`}
          >
            <Slider
              value={formValues.peopleInParty}
              name="peopleInParty"
              valueLabelDisplay="auto"
              step={1}
              min={1}
              max={10}
              onChange={handleInputChange}
              sx={{ width: "70%" }}
            />
          </FormQuestion>

          <FormQuestion
            question={`Would you rather explore bustling cities or tranquil countryside?`}
          >
            {renderButtonGroup("locationPreference", ["City", "Countryside"])}
          </FormQuestion>

          <FormQuestion
            question={`What type of activities do you enjoy the most?`}
          >
            {renderButtonGroup("activityPreference", [
              "Adventure",
              "Relaxation",
            ])}
          </FormQuestion>

          <FormQuestion
            question={`What kind of culinary experiences are you interested in?`}
          >
            {renderButtonGroup("culinaryPreference", [
              "Fine dining/gourmet experiences",
              "Street food/local cuisine",
            ])}
          </FormQuestion>

          <FormQuestion
            question={`Do you prefer structured tours or independent exploration?`}
          >
            {renderButtonGroup("explorationPreference", [
              "Structured tours",
              "Independent exploration",
            ])}
          </FormQuestion>

          <FormQuestion
            question={`How important is nightlife to your travel plans?`}
          >
            {renderButtonGroup("nightlifeImportance", [
              "Very important",
              "Somewhat important",
              "Not important",
            ])}
          </FormQuestion>

          <FormQuestion>
            <Typography>
              Do you have a strong interest in local culture?
            </Typography>
            {renderButtonGroup("culturalInterest", ["Yes", "No"])}
          </FormQuestion>

          <FormQuestion>
            <Typography>Budget per day (USD):</Typography>
            <Grid container alignContent="center">
              <Grid item xs={1} />
              <Grid item xs={8} sx={{ alignContent: "center" }}>
                <Slider
                  value={formValues.budget}
                  name="budget"
                  onChange={handleInputChange}
                  aria-labelledby="budget-slider"
                  min={0}
                  max={5000}
                  step={10}
                  sx={{ width: "90%" }}
                />
              </Grid>
              <Grid item xs={2}>
                <OutlinedInput
                  value={formValues.budget}
                  name="budget"
                  onChange={handleInputChange}
                  inputProps={{
                    step: 10,
                    min: 0,
                    max: 5000,
                    type: "number",
                  }}
                  sx={{ height: "100%" }}
                />
              </Grid>
            </Grid>
          </FormQuestion>

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

FormQuestion.propTypes = {
  question: PropTypes.string,
  children: PropTypes.node,
};

PersonalizationForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  initialFormValues: PropTypes.object,
};

export default PersonalizationForm;
