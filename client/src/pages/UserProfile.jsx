import { Typography, Box, Button, Container, TextField } from "@mui/material";
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
            {userInformation && (
              <Box sx={{ mt: 5, textAlign: "left" }}>
                <Typography variant="h3" fontWeight={900}>
                  Profile Information
                </Typography>
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
                <Typography>{user.id}</Typography>
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
          </Container>
        </Box>
      </Box>
    </Box>
  );
}

export default UserProfile;
