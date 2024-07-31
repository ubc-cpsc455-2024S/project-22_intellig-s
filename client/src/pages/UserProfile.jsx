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
  Tooltip,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PersonalizationForm from "../components/PersonalizationForm";
import { useEffect, useState } from "react";
import { updateProfilePicture } from "../redux/authSlice";

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

function UserProfile() {
  const user = useSelector((state) => state.auth.user);

  const [userInformation, setUserInformation] = useState(user);

  const [editPreferenceFormOpen, setEditPreferenceFormOpen] = useState(false);
  const [uploadImageDialogOpen, setUploadImageDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (user) setUserInformation(user);
  }, [user]);

  return (
    <Box sx={{ top: 0, left: 0, height: "100vh" }}>
      <Box sx={{ pt: "64px", height: "100%" }}>
        <Box sx={{ height: "100%", overflow: "auto" }}>
          <Container sx={{ mt: 4 }}>
            <Typography variant="h3" fontWeight={900}>
              Settings
            </Typography>
            <Card
              variant="outlined"
              sx={{ width: "100%", mt: 4, px: 7, py: 3 }}
            >
              {userInformation && (
                <Box sx={{ textAlign: "left" }}>
                  <Grid container>
                    <Grid item container xs={8}>
                      <Grid item xs={12}>
                        <Tooltip
                          placement="top"
                          title={<Typography>Click to Update</Typography>}
                        >
                          <Avatar
                            sx={{ width: 140, height: 140 }}
                            src={`${
                              import.meta.env.VITE_BACKEND_URL
                            }/auth/image/${user.imageId}`}
                            onClick={() => setUploadImageDialogOpen(true)}
                          />
                        </Tooltip>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h1" fontWeight={700}>
                          {`${user.firstName} ${user.lastName}`}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container item xs={4} spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          label="First Name"
                          value={userInformation.firstName}
                          size="small"
                          InputProps={{
                            readOnly: !editMode,
                          }}
                          onChange={(event) =>
                            setUserInformation({
                              ...userInformation,
                              firstName: event.target.value,
                            })
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Last Name"
                          value={userInformation.lastName}
                          size="small"
                          InputProps={{
                            readOnly: !editMode,
                          }}
                          onChange={(event) =>
                            setUserInformation({
                              ...userInformation,
                              lastName: event.target.value,
                            })
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Email"
                          value={userInformation.email}
                          size="small"
                          InputProps={{
                            readOnly: !editMode,
                          }}
                          onChange={(event) =>
                            setUserInformation({
                              ...userInformation,
                              email: event.target.value,
                            })
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Password"
                          value={userInformation.password}
                          size="small"
                          InputProps={{
                            readOnly: !editMode,
                          }}
                          onChange={(event) =>
                            setUserInformation({
                              ...userInformation,
                              password: event.target.value,
                            })
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Username"
                          value={userInformation.username}
                          size="small"
                          InputProps={{
                            readOnly: !editMode,
                          }}
                          onChange={(event) =>
                            setUserInformation({
                              ...userInformation,
                              username: event.target.value,
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    onClick={() => setEditMode(!editMode)}
                  >
                    {editMode ? `Done` : `Edit`}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => setEditPreferenceFormOpen(true)}
                  >
                    My Travel Preferences
                  </Button>
                </Box>
              )}
            </Card>
          </Container>
          {user && (
            <>
              <PersonalizationForm
                open={editPreferenceFormOpen}
                initialFormValues={user.preferences}
                handleClose={() => setEditPreferenceFormOpen(false)}
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

export default UserProfile;
