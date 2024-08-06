import {
  Typography,
  Box,
  Button,
  Container,
  TextField,
  Card,
  Grid,
  Avatar,
  Input,
  Dialog,
  DialogContent,
  DialogTitle,
  Badge,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import PersonalizationForm from "../components/PersonalizationForm";
import { useEffect, useState } from "react";
import { editUser, updateProfilePicture } from "../redux/authSlice";
import { useParams } from "react-router-dom";

function UserDetails({
  user,
  setUploadImageDialogOpen,
  setPersonalizeFormOpen,
}) {
  return (
    <Grid
      item
      container
      xs={12}
      spacing={4}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={8} sm={3}>
        <Box
          sx={{
            position: "relative",
            pt: "100%",
            width: "100%",
            borderRadius: "100%",
          }}
        >
          <Badge
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Button
                variant="contained"
                sx={{
                  borderRadius: "100%",
                  aspectRatio: 1,
                  p: { xs: 1, md: 2 },
                  minWidth: "0",
                }}
                onClick={setUploadImageDialogOpen}
              >
                <Edit />
              </Button>
            }
          >
            <Avatar
              sx={{ height: "100%", width: "100%" }}
              src={
                user.imageId
                  ? `${import.meta.env.VITE_BACKEND_URL}/auth/image/${
                      user.imageId
                    }`
                  : null
              }
            />
          </Badge>
        </Box>
      </Grid>

      <Grid item xs={12} sm={9} sx={{ alignContent: "center" }}>
        <Typography
          variant="h3"
          fontWeight={800}
          sx={{
            typography: {
              xs: { textAlign: "center", fontSize: 35, fontWeight: 700 },
              sm: { textAlign: "left" },
              md: { fontSize: 40, fontWeight: 800 },
            },
          }}
        >
          {`${user.firstName} ${user.lastName}`}
        </Typography>
        <Typography
          fontWeight={500}
          fontStyle={"italic"}
          sx={{
            typography: {
              xs: { textAlign: "center", fontSize: 18 },
              sm: { textAlign: "left" },
              md: { fontSize: 20 },
            },
          }}
        >
          {user.username}
        </Typography>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Button
            sx={{ width: { xs: "100%", sm: "auto" } }}
            variant="contained"
            onClick={setPersonalizeFormOpen}
          >
            Edit Travel Preferences
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

function UploadImageDialog({ open, handleClose }) {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (file) setPreview(URL.createObjectURL(file));
  }, [file]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        setFile(null);
        setPreview();
        handleClose();
      }}
    >
      <DialogTitle textAlign={"center"}>Preview</DialogTitle>
      <DialogContent>
        <Avatar
          sx={{ mx: "auto", mb: 2, width: 140, height: 140 }}
          src={preview}
        >
          <Typography>Upload Image</Typography>
        </Avatar>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Button
              component="label"
              role={undefined}
              tabIndex={-1}
              variant="outlined"
              fullWidth
            >
              <Input
                type="file"
                inputProps={{ accept: "image/png, image/gif, image/jpeg" }}
                sx={{ display: "none" }}
                onChange={(event) => {
                  setFile(event.target.files[0]);
                }}
              />
              Choose File
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              disabled={!file}
              onClick={() => {
                dispatch(updateProfilePicture(file));
                handleClose();
              }}
            >
              Confirm
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

function EditUserForm({ user }) {
  const dispatch = useDispatch();

  const { usernameConflict, emailConflict } = useSelector(
    (state) => state.auth
  );
  const [formValues, setFormValues] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  });
  const [editMode, setEditMode] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  function handleChange(event) {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  }

  function onSubmit() {
    if (validateForm()) {
      dispatch(editUser(formValues))
        .unwrap()
        .then(() => {
          setEditMode(false);
        });
    }
  }

  function validateForm() {
    let errorMessages = {};

    const emailValidatorRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (formValues.firstName === "")
      errorMessages.firstName = "First name cannot be blank";

    if (formValues.lastName === "")
      errorMessages.lastName = "Last name cannot be blank";

    if (formValues.email === "") errorMessages.email = "Email cannot be blank";
    else if (!emailValidatorRegex.test(formValues.email))
      errorMessages.email = "Please enter a valid email";

    if (formValues.username === "")
      errorMessages.username = "Username cannot be blank";

    setFormErrors(errorMessages);
    return !Object.keys(errorMessages).length;
  }

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={12}>
        <Typography
          sx={{
            typography: {
              xs: { fontSize: 30, fontWeight: 800 },
              md: { fontSize: 40, fontWeight: 900 },
              textAlign: "center",
            },
          }}
        >
          User Information
        </Typography>
      </Grid>
      <Grid item container spacing={1} xs={12} textAlign={"right"}>
        {editMode ? (
          <Grid item xs={12}>
            <Button
              variant="outlined"
              onClick={() => {
                setFormValues(user);
                setEditMode(false);
              }}
              sx={{ width: { xs: "100%", md: "auto" }, mr: 1, mb: 1 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => onSubmit()}
              sx={{ width: { xs: "100%", md: "auto" }, mb: 1 }}
            >
              Confirm
            </Button>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Button
              variant="outlined"
              onClick={() => setEditMode(true)}
              sx={{ pl: 1.75, width: { xs: "100%", md: "auto" } }}
            >
              <Edit sx={{ mr: 1 }} />
              Edit
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="First Name"
          name="firstName"
          value={formValues.firstName}
          size="small"
          fullWidth
          InputProps={{
            readOnly: !editMode,
          }}
          onChange={handleChange}
          error={formErrors.firstName ? true : false}
          helperText={formErrors.firstName}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Last Name"
          name="lastName"
          value={formValues.lastName}
          size="small"
          fullWidth
          InputProps={{
            readOnly: !editMode,
          }}
          onChange={handleChange}
          error={formErrors.lastName ? true : false}
          helperText={formErrors.lastName}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Email"
          name="email"
          value={formValues.email}
          size="small"
          fullWidth
          InputProps={{
            readOnly: !editMode,
          }}
          onChange={handleChange}
          error={emailConflict || formErrors.email ? true : false}
          helperText={
            emailConflict ? "Email is already in use" : formErrors.email
          }
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Username"
          name="username"
          value={formValues.username}
          size="small"
          fullWidth
          InputProps={{
            readOnly: !editMode,
          }}
          onChange={handleChange}
          error={usernameConflict || formErrors.email ? true : false}
          helperText={
            usernameConflict ? "Username is already in use" : formErrors.email
          }
        />
      </Grid>
    </Grid>
  );
}

function UserProfile() {
  const { personalize } = useParams();

  const user = useSelector((state) => state.auth.user);

  const [personalizeFormOpen, setPersonalizeFormOpen] = useState(
    personalize === "personalize" ? true : false
  );
  const [uploadImageDialogOpen, setUploadImageDialogOpen] = useState(false);

  return (
    <Box sx={{ top: 0, left: 0, height: "100vh" }}>
      <Box sx={{ pt: "64px", height: "100%" }}>
        <Box sx={{ height: "100%", overflow: "auto" }}>
          <Container sx={{ mt: 4 }}>
            <Card
              variant="outlined"
              sx={{ width: "100%", mt: 4, px: { xs: 2, md: 7 }, pt: 4, pb: 7 }}
            >
              <Grid container spacing={4} sx={{ textAlign: "left" }}>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      typography: {
                        textAlign: "center",
                        xs: { fontSize: 35, fontWeight: 900 },
                        md: { fontSize: 45, fontWeight: 900 },
                      },
                    }}
                  >
                    Settings
                  </Typography>
                </Grid>
                {user && (
                  <>
                    <Grid item xs={12}>
                      <Card variant="outlined" sx={{ p: 2 }}>
                        <UserDetails
                          user={user}
                          setUploadImageDialogOpen={() =>
                            setUploadImageDialogOpen(true)
                          }
                          setPersonalizeFormOpen={() =>
                            setPersonalizeFormOpen(true)
                          }
                        />
                      </Card>
                    </Grid>
                    <Grid item xs={12}>
                      <Card variant="outlined" sx={{ p: 2 }}>
                        <EditUserForm user={user}></EditUserForm>
                      </Card>
                    </Grid>
                  </>
                )}
              </Grid>
            </Card>
          </Container>

          {user && (
            <>
              <PersonalizationForm
                open={personalizeFormOpen}
                initialFormValues={user.preferences}
                handleClose={() => setPersonalizeFormOpen(false)}
              ></PersonalizationForm>
              <UploadImageDialog
                open={uploadImageDialogOpen}
                handleClose={() => setUploadImageDialogOpen(false)}
              ></UploadImageDialog>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

UploadImageDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

EditUserForm.propTypes = {
  user: PropTypes.object,
};

UserDetails.propTypes = {
  user: PropTypes.object,
  setUploadImageDialogOpen: PropTypes.func,
  setPersonalizeFormOpen: PropTypes.func,
};

export default UserProfile;
