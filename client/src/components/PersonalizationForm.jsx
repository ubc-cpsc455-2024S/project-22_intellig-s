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
  Card,
} from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { updatePreferences } from "../redux/authSlice";

function FormQuestion({ question, children }) {
  return (
    <Box sx={{ mt: 3 }}>
      <Card variant="outlined" sx={{ p: 2 }}>
        <Typography sx={{ mb: 1 }}>{question}</Typography>
        {children}
      </Card>
    </Box>
  );
}

const PersonalizationForm = ({ open, handleClose, initialFormValues }) => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    kids: initialFormValues.kids ? initialFormValues.kids : null,
    pets: initialFormValues.pets ? initialFormValues.pets : null,
    budget: initialFormValues.budget ? initialFormValues.budget : undefined,
    peopleInParty: initialFormValues.peopleInParty
      ? initialFormValues.peopleInParty
      : 1,
    locationPreference: initialFormValues.locationPreference
      ? initialFormValues.locationPreference
      : "",
    activityPreference: initialFormValues.activityPreference
      ? initialFormValues.activityPreference
      : "",
    culinaryPreference: initialFormValues.culinaryPreference
      ? initialFormValues.culinaryPreference
      : "",
    explorationPreference: initialFormValues.explorationPreference
      ? initialFormValues.explorationPreference
      : "",
    nightlifeImportance: initialFormValues.nightlifeImportance
      ? initialFormValues.nightlifeImportance
      : "",
    culturalInterest: initialFormValues.culturalInterest
      ? initialFormValues.culturalInterest
      : null,
  });

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
      >
        {options.map((option) => (
          <ToggleButton
            key={option}
            value={option}
            sx={{
              transition: "300ms",
              "&.MuiToggleButtonGroup-grouped": {
                borderRadius: "4px !important",
                mx: 1,
                border: "1px solid lightgrey !important",
              },
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
              sx={{ width: "90%" }}
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
              "Fine Dining",
              "Local Cuisine",
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
                  value={formValues.budget ? Number(formValues.budget) : 100}
                  name="budget"
                  onChange={handleInputChange}
                  aria-labelledby="budget-slider"
                  min={100}
                  max={5000}
                  step={10}
                  sx={{ width: "90%" }}
                />
              </Grid>
              <Grid item xs={2}>
                <OutlinedInput
                  value={formValues.budget ? formValues.budget : ""}
                  name="budget"
                  onChange={(e) => {
                    if (e.target.value > 5000) e.target.value = 5000;
                    else if (e.target.value < 100) e.target.value = 100;
                    handleInputChange(e);
                  }}
                  type="number"
                  inputProps={{
                    step: "10",
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
