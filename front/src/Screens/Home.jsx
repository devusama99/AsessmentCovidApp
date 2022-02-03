import { Typography, Card } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaBed, FaMedkit, FaVirus, FaHeadSideCough } from "react-icons/fa";

import { Countries } from "../Data/Countries";

import FiguresCard from "../Components/FiguresCard";
import SelectCountry from "../Components/SelectCountry";
import StatsContainerHead from "../Components/StatsContainerHead";
import AffectedCountry from "../Components/AffectedCountry";
import Graph from "../Components/Graph";
import CountryErr from "../Components/CountryErr";

const useStyles = makeStyles((theme) => ({
  content: {
    width: "100%",
  },
  cardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "center",
    },
  },
  statsContainer: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  statsContent: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  lineChartContainer: {
    display: "inline-block",
    marginTop: theme.spacing(4),
    width: "65%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  mostAffectedCountriesContainer: {
    display: "inline-block",
    textAlign: "left",
    marginTop: theme.spacing(1),
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  mostAffectedCountriesHeading: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      fontSize: "14px",
    },
  },
  affectedCountryContainer: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

const setZoom = () => {
  window.innerWidth <= 600
    ? (document.body.style.zoom = "80%")
    : (document.body.style.zoom = "100%");
};

function Home() {
  const classes = new useStyles();
  const [country, setCountry] = useState("");
  const [mainStats, setMainStats] = useState("");
  const [countryReport, setCountryReport] = useState();
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });

  const mostAfected = [];
  for (let i = 0; i < 4; i++) {
    const random = Math.floor(Math.random() * Countries.length);
    mostAfected.push(Countries[random]);
  }
  const closeSnackBar = () => {
    setOpenSnackbar({ ...openSnackbar, open: false });
  };

  const handleChange = (data) => {
    setCountry(data);
  };

  const searchCountryData = () => {
    const selectedCountryData = Countries.filter(
      (countryData) =>
        countryData.name.toLowerCase().trim() === country.toLowerCase().trim()
    );
    selectedCountryData.length >= 1
      ? setCountryReport(selectedCountryData[0].lastWeeksCases)
      : setOpenSnackbar({ ...openSnackbar, open: true });

    setTimeout(() => {
      setOpenSnackbar({ ...openSnackbar, open: false });
    }, 3000);
  };

  const getMainStats = () => {
    var options = {
      method: "GET",
      url: "https://covid-19-data.p.rapidapi.com/totals",
      headers: {
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        "x-rapidapi-key": "3587aaf50dmsh5cec0011733021dp11abedjsn0478c05ba6cb",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setMainStats(response.data[0]);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    setZoom();
    getMainStats();
  }, []);

  return (
    <div className={classes.content}>
      <div className={classes.cardsContainer}>
        <FiguresCard
          label="Confirmed"
          data={mainStats.confirmed}
          icon={<FaVirus />}
          primaryColor={"#74117C"}
          secondaryColor={"#C9266B"}
        />
        <FiguresCard
          label="Recovered"
          data={mainStats.recovered}
          icon={<FaMedkit />}
          primaryColor={"#198A8D"}
          secondaryColor={"#60DD8E"}
        />
        <FiguresCard
          label="Critical"
          data={mainStats.critical}
          icon={<FaHeadSideCough />}
          primaryColor={"#C9266B"}
          secondaryColor={"#74117C"}
        />
        <FiguresCard
          label="Deaths"
          data={mainStats.deaths}
          icon={<FaBed />}
          primaryColor={"#60DD8E"}
          secondaryColor={"#198A8D"}
        />
      </div>
      <div className={classes.statsContainer}>
        <StatsContainerHead />
        <SelectCountry
          change={handleChange}
          country={country}
          submit={searchCountryData}
        />
        <div className={classes.statsContent}>
          <div
            className={[classes.lineChartContainer, "canvas-container"].join(
              " "
            )}
          >
            <Graph dataWeek={countryReport} />
          </div>
          <div className={classes.mostAffectedCountriesContainer}>
            <Typography className={classes.mostAffectedCountriesHeading}>
              Most Affected Countries
            </Typography>
            <div className={classes.affectedCountryContainer}>
              {mostAfected.map((country, i) => (
                <AffectedCountry
                  key={i}
                  countryName={country.name}
                  countryCode={country.code.toLowerCase()}
                  cases={country.lastWeeksCases[6]}
                />
              ))}
              {/* <AffectedCountry
                countryName="Pakistan"
                countryCode={"pk"}
                cases={"200,124,456"}
              />
              <AffectedCountry
                countryName="India"
                countryCode={"in"}
                cases={"200,124,456"}
              />
              <AffectedCountry
                countryName="China"
                countryCode={"cn"}
                cases={"200,124,456"}
              />
              <AffectedCountry
                countryName="Turkey"
                countryCode={"tr"}
                cases={"200,124,456"}
            /> */}
            </div>
          </div>
        </div>
      </div>
      <CountryErr openState={openSnackbar} handle={closeSnackBar} />
    </div>
  );
}
export default Home;
