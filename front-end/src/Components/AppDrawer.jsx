import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Menu as MenuIcon } from "@mui/icons-material";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FiHome, FiMap } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import Logo from "../Assests/logosvg.svg";
import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  Link: {
    textDecoration: "none",
    color: theme.palette.dark.main,
  },
  active: {
    backgroundImage: `linear-gradient(45deg , ${theme.palette.primary.main},${theme.palette.secondary.main})`,
  },
  activeIcon: {
    color: theme.palette.light.main,
    fontSize: "22px",
  },
  activeColor: {
    color: theme.palette.light.main,
  },
  drawer: {
    position: "relative",
  },
  appBranding: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 35,
  },
  brandText: {
    fontWeight: "bold !important",
    marginLeft: `${theme.spacing(0.5)} !important`,
    color: "red",
  },
}));

// Initialzing Drawer With
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7.2)} + 1px)`,
  },
});

const DrawerHeader = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  paddingLeft: "8px",
  padding: "8px",
};

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const mobile = window.innerWidth >= 700 ? false : true;

export default function AppDrawer(props) {
  const [open, setOpen] = React.useState(!mobile);

  // Drawer Toggle Function
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // initalizing useHistory
  const history = useLocation();

  // Initialize styles
  const classes = new useStyles();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open} className={classes.drawer}>
        <div style={DrawerHeader}>
          <IconButton onClick={toggleDrawer}>
            {open === false ? <MenuIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <List>
          <Divider />
          <Link to="/" className={classes.Link}>
            <ListItem
              button
              key={"home"}
              className={history.pathname === "/" ? classes.active : null}
            >
              <ListItemIcon>
                <FiHome
                  style={{
                    fontSize: "22px",
                  }}
                  className={
                    history.pathname === "/" ? classes.activeIcon : null
                  }
                />
              </ListItemIcon>
              <ListItemText
                primary={"Home"}
                className={
                  history.pathname === "/" ? classes.activeColor : null
                }
              />
            </ListItem>
          </Link>
          <Divider />
          <Link to="/heatMap" className={classes.Link}>
            <ListItem
              button
              key={"map"}
              className={
                history.pathname === "/heatMap" ? classes.active : null
              }
            >
              <ListItemIcon>
                <FiMap
                  style={{
                    fontSize: "22px",
                  }}
                  className={
                    history.pathname === "/heatMap" ? classes.activeIcon : null
                  }
                />
              </ListItemIcon>
              <ListItemText
                primary={"Heat Map"}
                className={
                  history.pathname === "/heatMap" ? classes.activeColor : null
                }
              />
            </ListItem>
          </Link>
          <Divider />
        </List>
        <div className={classes.appBranding}>
          <img src={Logo} alt={"logo"} width="30px" />
          <Typography className={classes.brandText}>Covid App</Typography>
        </div>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 6, pl: 1, pr: 1 }}>
        {props.children}
      </Box>
    </Box>
  );
}
