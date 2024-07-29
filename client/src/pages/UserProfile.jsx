import { Typography, Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import PersonalizationForm from "../components/PersonalizationForm";
import { useState } from "react";

function UserProfile() {
  const [editUserFormOpen, setEditUserFormOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  return (
    <Box sx={{ top: 0, left: 0, height: "100vh" }}>
      <Box sx={{ pt: "64px", height: "100%" }}>
        <Box sx={{ height: "100%", overflow: "auto", px: "20%", pt: 2 }}>
          {user && (
            <>
              <Typography>{user.id}</Typography>
              <Button
                variant="contained"
                onClick={() => setEditUserFormOpen(true)}
              >
                test
              </Button>
              <PersonalizationForm
                open={editUserFormOpen}
                initialFormValues={user.preferences}
                handleClose={() => setEditUserFormOpen(false)}
              ></PersonalizationForm>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default UserProfile;
