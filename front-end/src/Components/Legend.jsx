import React from "react";
import { makeStyles } from "@mui/styles";
import { Card, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    margin: theme.spacing(1),
  },
  legendBox: {
    height: "30px",
    width: "30px",
    display: "inline-block",
    marginRight: `${theme.spacing(1)} !important`,
  },
  legendText: {
    display: "inline-block !important",
  },
}));
export default function Legend({ color, text }) {
  const classes = new useStyles();
  return (
    <div className={classes.container}>
      <Card
        className={classes.legendBox}
        style={{
          backgroundColor: `${color}`,
        }}
      ></Card>
      <Typography className={classes.legendText}>{text}</Typography>
    </div>
  );
}
