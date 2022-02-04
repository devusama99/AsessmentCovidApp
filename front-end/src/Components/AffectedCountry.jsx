import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography, Card } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  card: {
    flexGrow: 1,
    flex: 1,
    minWidth: "150px",
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  cardContent: {
    padding: theme.spacing(1),
    paddingTop: 0,
  },
  cardImg: {
    width: "100%",
    height: "100px",
  },
  countryName: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "14px",
  },
  cardCases: {
    fontSize: "12px",
    display: "inline",
    color: "red",
  },
  cardCasesBold: {
    fontWeight: "bold",
    fontSize: "12px",
    display: "inline",
    color: "red",
  },
}));

function AffectedCountry({ countryName, countryCode, cases }) {
  const classes = new useStyles();
  return (
    <Card className={classes.card}>
      <img
        src={`https://flagcdn.com/${countryCode}.svg`}
        alt={countryName}
        className={classes.cardImg}
      />
      <div className={classes.cardContent}>
        <Typography className={classes.countryName}>{countryName}</Typography>
        <Typography className={classes.cardCases}>Total Cases:</Typography>
        <Typography className={classes.cardCasesBold}>{cases}</Typography>
      </div>
    </Card>
  );
}

export default AffectedCountry;
