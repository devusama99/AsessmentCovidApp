import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Countries } from "../Data/Countries";
import { Button, TextField, Typography } from "@mui/material";
import { minHeight, minWidth } from "@mui/system";

export default function SelectCountry({ change, submit }) {
  const [country, setCountry] = React.useState("");

  const handleChange = (event) => {
    change(event.target.value);
  };

  const handleSubmit = () => {
    submit();
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextField
          variant="outlined"
          label={"Country Name"}
          onChange={handleChange}
          style={{ minWidth: "200px" }}
        />
        <Button
          variant="contained"
          style={{ height: 55, transform: "translateX(-10px)" }}
          onClick={handleSubmit}
        >
          Search
        </Button>
      </form>
    </div>
  );
}
