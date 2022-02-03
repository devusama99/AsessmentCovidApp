import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import { FiActivity } from "react-icons/fi";

const useStyles = makeStyles((theme) => ({
  StatsContainerHead: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(4),
  },
  FiActivityIcon: {
    color: theme.palette.light.main,
  },
  FiActivityIconContainer: {
    padding: theme.spacing(1),
    marginRight: theme.spacing(1),
    borderRadius: "5px",
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function StatsContainerHead() {
  const classes = new useStyles();
  return (
    <div className={classes.StatsContainerHead}>
      <span className={classes.FiActivityIconContainer}>
        <FiActivity className={classes.FiActivityIcon} />
      </span>
      <Typography>Country Stats</Typography>
    </div>
  );
}

export default StatsContainerHead;
