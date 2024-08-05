import { Dialog, DialogContent, Typography } from "@mui/material";
import SkewLoader from "react-spinners/SkewLoader";
import theme from "../../theme";
import PropTypes from "prop-types";

export default function LoadingDialog({ isOpen, children }) {
  return (
    <Dialog
      open={isOpen}
      sx={{
        height: "100%",
        width: "100%",
        alignItems: "center",
        m: "auto",
      }}
    >
      <DialogContent
        sx={{ px: 8, py: 4, alignContent: "center", textAlign: "center" }}
      >
        <SkewLoader color={theme.palette.primary.main} />
        <Typography>{children}</Typography>
      </DialogContent>
    </Dialog>
  );
}

LoadingDialog.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.node,
};
