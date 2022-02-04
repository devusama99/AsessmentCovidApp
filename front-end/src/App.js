import "./App.css";
import AppDrawer from "./Components/AppDrawer";
import Home from "./Screens/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HeatMap from "./Screens/HeatMap";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop>
          <Switch>
            <AppDrawer>
              <Route path={"/"} exact component={Home} />
              <Route path={"/heatMap"} exact component={HeatMap} />
            </AppDrawer>
          </Switch>
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;
