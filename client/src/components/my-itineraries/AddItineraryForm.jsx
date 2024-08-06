import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PropType from "prop-types";

import MapsAutocomplete from "../common/MapsAutocomplete";
import { generateItineraryAsync } from "../../redux/itinerarySlice";
import dayjs from "dayjs";

const AddItineraryForm = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState({
    location: "",
    startDate: "",
    endDate: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const validateForm = () => {
    let errorMessages = {};

    if (formValues.startDate === "") {
      errorMessages.startDate = "Start date cannot be blank";
      setStep(2);
    }

    if (formValues.startDate === "") {
      errorMessages.endDate = "End date cannot be blank";
      setStep(2);
    }

    if (formValues.location === "") {
      errorMessages.location = "Location cannot be blank";
      setStep(1);
    }

    setFormErrors(errorMessages);
    return !Object.keys(errorMessages).length;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    dispatch(generateItineraryAsync(formValues));

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
    >
      <Container>
        <DialogTitle
          sx={{ typography: { xs: { fontSize: 20 } } }}
          textAlign={"center"}
        >
          Add Itinerary
        </DialogTitle>
        <DialogContent>
          {step === 1 && (
            <Grid
              container
              rowSpacing={2}
              className="survey-step"
              sx={{ p: 0 }}
            >
              <Grid item xs={12}>
                <Typography
                  sx={{
                    typography: { fontWeight: 600, xs: { fontSize: 25 } },
                    mb: 2,
                  }}
                >
                  Where are you traveling?
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ mb: 25 }}>
                <MapsAutocomplete
                  handleChange={(newLocation) =>
                    setFormValues({
                      ...formValues,
                      location: newLocation.description,
                    })
                  }
                  formError={formErrors.location}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  onClick={handleNext}
                  color="primary"
                  variant="contained"
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          )}
          {step === 2 && (
            <Grid
              container
              spacing={2}
              className="survey-step"
              sx={{ px: 0, pb: 0 }}
            >
              <Grid item xs={12}>
                <Typography
                  sx={{
                    typography: { fontWeight: 600, xs: { fontSize: 25 } },
                    mb: 2,
                  }}
                >
                  When are you planning to travel?
                </Typography>
              </Grid>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Start Date"
                    name="startDate"
                    views={["year", "month", "day"]}
                    disablePast
                    sx={{ mb: 1 }}
                    onChange={(newDate) =>
                      setFormValues({
                        ...formValues,
                        startDate: newDate.format("LL"),
                        endDate: newDate.format("LL"),
                      })
                    }
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                        error: formErrors.startDate ? true : false,
                        helperText: formErrors.startDate,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    sx={{ mb: 12 }}
                    label="End Date"
                    name="endDate"
                    views={["year", "month", "day"]}
                    disablePast
                    value={
                      formValues.endDate ? dayjs(formValues.endDate) : null
                    }
                    minDate={
                      formValues.startDate ? dayjs(formValues.startDate) : null
                    }
                    maxDate={
                      formValues.startDate
                        ? dayjs(formValues.startDate).add(6, "day")
                        : null
                    }
                    onChange={(newDate) =>
                      setFormValues({
                        ...formValues,
                        endDate: newDate.format("LL"),
                      })
                    }
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                        error: formErrors.endDate ? true : false,
                        helperText: formErrors.endDate,
                      },
                    }}
                  />
                </Grid>
              </LocalizationProvider>
              <Grid item xs={12} sm={6}>
                <Button
                  onClick={handleBack}
                  color="primary"
                  variant="outlined"
                  fullWidth
                >
                  Back
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  onClick={handleSubmit}
                  color="primary"
                  variant="contained"
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </Container>
    </Dialog>
  );
};

AddItineraryForm.propTypes = {
  open: PropType.bool,
  handleClose: PropType.func,
};

export default AddItineraryForm;
