import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function ErrSnackbar({ handle, openState, msg }) {
  const { vertical, horizontal, open } = openState;
  console.log(msg);
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handle}
      key={vertical + horizontal}
    >
      <Alert severity="error">{msg}</Alert>
    </Snackbar>
  );
}
