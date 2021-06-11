import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./containers/home/Home";
import PartDetails from "./containers/partDetails/PartDetails";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Home />} />
        <Route exact path="/parkDetails" component={() => <PartDetails />} />
      </Switch>
    </Router>
  );
}

export default App;
