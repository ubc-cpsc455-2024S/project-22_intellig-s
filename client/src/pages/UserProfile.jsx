import { Typography, Box, Button, Container, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import PersonalizationForm from "../components/PersonalizationForm";
import { useState } from "react";

function UserProfile() {
  const [editUserFormOpen, setEditUserFormOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  return (
    <Box sx={{ top: 0, left: 0, height: "100vh" }}>
      <Box sx={{ pt: "64px", height: "100%" }}>
        <Box sx={{ height: "100%", overflow: "auto" }}>
          <Container>
            {user && (
              <Box sx={{ mt: 5, textAlign: "left" }}>
                <Typography variant="h3" fontWeight={900}>
                  Profile Information
                </Typography>
                <TextField
                  label="Username"
                  value={user.username}
                  size="small"
                />
                <Typography>{user.id}</Typography>
                <Button
                  variant="contained"
                  onClick={() => setEditUserFormOpen(true)}
                >
                  My Travel Preferences
                </Button>
                <PersonalizationForm
                  open={editUserFormOpen}
                  initialFormValues={user.preferences}
                  handleClose={() => setEditUserFormOpen(false)}
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
