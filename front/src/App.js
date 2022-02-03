import { Button, Drawer } from "@mui/material";
import "./App.css";
import AppDrawer from "./Components/AppDrawer";
import Home from "./Screens/Home";

function App() {
  return (
    <div className="App">
      <AppDrawer>
        <Home />
      </AppDrawer>
    </div>
  );
}

export default App;
