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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { FiHome, FiMap } from "react-icons/fi";

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

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <div style={DrawerHeader}>
          <IconButton onClick={toggleDrawer}>
            {open === false ? <MenuIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <List>
          <Divider />
          <ListItem button key={"home"}>
            <ListItemIcon>
              <FiHome
                style={{
                  fontSize: "22px",
                }}
              />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
          <Divider />
          <ListItem button key={"map"}>
            <ListItemIcon>
              <FiMap
                style={{
                  fontSize: "22px",
                }}
              />
            </ListItemIcon>
            <ListItemText primary={"Heat Map"} />
          </ListItem>
          <Divider />
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 6, pl: 1, pr: 1 }}>
        {props.children}
      </Box>
    </Box>
  );
}
