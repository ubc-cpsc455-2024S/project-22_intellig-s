import {
  Typography,
  Box,
  Button,
  Container,
  TextField,
  Card,
  Grid,
} from "@mui/material";
import { useSelector } from "react-redux";
import PersonalizationForm from "../components/PersonalizationForm";
import { useEffect, useState } from "react";

function UserProfile() {
  const user = useSelector((state) => state.auth.user);

  const [userInformation, setUserInformation] = useState(user);

  const [editPreferenceFormOpen, setEditPreferenceFormOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (user) setUserInformation(user);
  }, [user]);

  return (
    <Box sx={{ top: 0, left: 0, height: "100vh" }}>
      <Box sx={{ pt: "64px", height: "100%" }}>
        <Box sx={{ height: "100%", overflow: "auto" }}>
          <Container>
            <Typography variant="h3" fontWeight={900}>
              Profile Information
            </Typography>
            <Card
              variant="outlined"
              sx={{ mt: 8, width: "100%", px: 7, py: 3 }}
            >
              {userInformation && (
                <Box sx={{ textAlign: "left" }}>
                  <Grid container spacing={2} sx={{ width: "100%" }}>
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
                  <PersonalizationForm
                    open={editPreferenceFormOpen}
                    initialFormValues={user.preferences}
                    handleClose={() => setEditPreferenceFormOpen(false)}
                  ></PersonalizationForm>
                </Box>
              )}
            </Card>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}

export default UserProfile;
