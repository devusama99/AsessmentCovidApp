import React from "react";
import { makeStyles } from "@mui/styles";
import { Card, CircularProgress, Typography } from "@mui/material";
import CountUp from "react-countup";
import { fontSize } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: "200px",
    margin: theme.spacing(1),
    minHeight: "200px",
    flexGrow: 1,
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    color: theme.palette.light.main,
  },
  cardIcon: {
    paddingRight: theme.spacing(3),
    fontSize: "42px",
    color: theme.palette.light.main,
  },
  cardFigure: {
    fontWeight: "bold",
    fontSize: "24px",
  },
  CircularProgress: {
    margin: theme.spacing(1),
    color: theme.palette.light.main,
  },
}));

function FiguresCard({ label, data, icon, primaryColor, secondaryColor }) {
  const classes = new useStyles();
  return (
    <Card
      className={classes.card}
      style={{
        backgroundImage: `linear-gradient(45deg , ${primaryColor}, ${secondaryColor} )`,
      }}
    >
      <span className={classes.cardIcon}>{icon}</span>
      <span>
        <Typography>{label}</Typography>
        <Typography
          variant="h6"
          component={"h3"}
          className={classes.cardFigure}
        >
          {data ? (
            <CountUp
              end={Number(data)}
              duration={1.5}
              separator=","
              useEasing={true}
            />
          ) : (
            <CircularProgress className={classes.CircularProgress} />
          )}
        </Typography>
      </span>
    </Card>
  );
}

export default FiguresCard;
