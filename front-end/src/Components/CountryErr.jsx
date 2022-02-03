import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function CountryErr({ handle, openState }) {
  const { vertical, horizontal, open } = openState;

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handle}
      key={vertical + horizontal}
    >
      <Alert severity="error">Country Not Found!</Alert>
    </Snackbar>
  );
}
