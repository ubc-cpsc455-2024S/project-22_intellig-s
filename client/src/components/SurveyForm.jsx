import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
                <SearchBar
                  handleChange={(newLocation) =>
                    setFormValues({
                      ...formValues,
                      location: newLocation.description,
                    })
                  }
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
                      textField: { size: "small", fullWidth: true },
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
                        ? dayjs(formValues.startDate).add(4, "day")
                        : null
                    }
                    onChange={(newDate) =>
                      setFormValues({
                        ...formValues,
                        endDate: newDate.format("LL"),
                      })
                    }
                    slotProps={{
                      textField: { size: "small", fullWidth: true },
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

SurveyForm.propTypes = {
  open: PropType.bool,
  handleClose: PropType.func,
};

export default SurveyForm;
