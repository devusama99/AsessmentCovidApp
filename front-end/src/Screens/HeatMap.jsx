import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Button,
  Card,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import Map from "../Components/Map";
import io from "socket.io-client";
import { useEffect } from "react";
import axios from "axios";

import { useForm } from "react-hook-form";
import { height } from "@mui/system";
import Legend from "../Components/Legend";

const useStyles = makeStyles((theme) => ({
  pageHeading: {
    fontWeight: "bold !important",
    marginBottom: `${theme.spacing(3)} !important`,
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: theme.palette.primary.light,

    margin: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      justifyContent: "flex-start",
    },
  },
  width48: {
    flexDirection: "column",
    justifyContent: "center !important",
    alignContent: "center !important",
    width: "50%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  formContainer: {
    display: "flex",
    padding: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  formItem: {
    marginBottom: `${theme.spacing()} !important`,
    fontWeight: "bold !important",
  },
  legend: {
    marginBottom: theme.spacing(5),
  },
}));

// Creating Socket Connection
const socket = io.connect("http://localhost:4000");

export default function HeatMap() {
  // react-form-hooks
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const classes = new useStyles();

  const [layerValue, setLayerValue] = useState({
    lat: "",
    lng: "",
    int: "",
    type: "",
    load: false,
  });

  const [heatLayers, setHeatLayers] = useState();

  function formSubmit(data) {
    setLayerValue({ ...layerValue, load: true });
    socket.emit("data", data);
    window.location.reload();
  }

  function getDataFromNode() {
    axios
      .get("http://localhost:4000/heatMap")
      .then(function (response) {
        setHeatLayers(response.data);
        // console.log(heatLayers);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  useEffect(() => {
    socket.on("data", (gotData) => {
      setHeatLayers(gotData);
      setLayerValue({
        lat: "",
        lng: "",
        int: "",
        type: "",
        load: false,
      });
      // console.log(gotData);
    });
  });

  useEffect(() => {
    getDataFromNode();
  }, []);

  return (
    <>
      {/* {console.log(heatLayers)} */}

      <div className={classes.content}>
        <div className={classes.width48}>
          {heatLayers ? <Map data={heatLayers} /> : <CircularProgress />}
        </div>
        <div className={[classes.width48, classes.formContainer].join(" ")}>
          <div className={classes.legend}>
            <Legend color={"red"} text={"Death Area"} />
            <Legend color={"yellow"} text={"Affected Area"} />
            <Legend color={"green"} text={"Recovered Area"} />
          </div>
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              formSubmit(data);
            })}
          >
            <Typography variant="h5" className={classes.pageHeading}>
              Enter Location To Add On Heat Map
            </Typography>
            <TextField
              variant="outlined"
              label="Latitude"
              name="lat"
              required
              fullWidth
              value={layerValue.lat}
              className={classes.formItem}
              {...register("lat", {
                required: "Latitude Required",
                pattern: {
                  value: /^(\d+(\.\d+)?)$/,
                  message: "Invalid Value",
                },
              })}
              error={Boolean(errors.lat)}
              helperText={errors.lat ? errors.lat.message : " "}
              onChange={(e) =>
                setLayerValue({ ...layerValue, lat: e.target.value })
              }
            />
            <TextField
              variant="outlined"
              label="Longitude"
              value={layerValue.lng}
              name="lng"
              required
              fullWidth
              className={classes.formItem}
              {...register("lng", {
                required: "Longitude Required",
                pattern: {
                  value: /^(\d+(\.\d+)?)$/,
                  message: "Invalid Value",
                },
              })}
              error={Boolean(errors.lng)}
              helperText={errors.lng ? errors.lng.message : " "}
              onChange={(e) =>
                setLayerValue({ ...layerValue, lng: e.target.value })
              }
            />
            <TextField
              variant="outlined"
              label="Intensity"
              value={layerValue.int}
              name="int"
              required
              fullWidth
              className={classes.formItem}
              {...register("int", {
                required: "Latitude Required",
                pattern: {
                  value: /^(\d+(\.\d+)?)$/,
                  message: "Value must be between 0-1",
                },
              })}
              error={Boolean(errors.int)}
              helperText={
                errors.int ? errors.int.message : "Value must be between 0-1"
              }
              onChange={(e) =>
                setLayerValue({ ...layerValue, int: e.target.value })
              }
            />
            <TextField
              variant="outlined"
              label="Type"
              name="type"
              required
              value={layerValue.type}
              autoComplete="password"
              fullWidth
              className={classes.formItem}
              {...register("type", {
                required: "Latitude Required",
                pattern: {
                  value: "Affected" || "Death" || "Recovered",
                  message:
                    "Accepted Value are Affected,Death,Recovered. CASE SENSITIVE",
                },
              })}
              error={Boolean(errors.type)}
              helperText={
                errors.type
                  ? errors.type.message
                  : "Accepted Value are Affected,Death,Recovered. CASE SENSITIVE"
              }
              onChange={(e) =>
                setLayerValue({ ...layerValue, type: e.target.value })
              }
            />
            <Button
              variant="outlined"
              type="submit"
              style={{
                paddingTop: !layerValue.load ? "10px" : "0",
                paddingBottom: !layerValue.load ? "10px" : "0",
              }}
              endIcon={
                layerValue.load ? (
                  <CircularProgress style={{ padding: "10px" }} />
                ) : null
              }
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
