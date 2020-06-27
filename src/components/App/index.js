import React, { useState } from "react";
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  BrowserRouter as Router,
} from "react-router-dom";

import Layout from "../Layout";

export default function App() {
  const [playerTableData, setPlayerTableData] = useState({});

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/ratings" />
        </Route>
        <Route path="/ratings">
          <Layout />
        </Route>
      </Switch>
    </Router>
  );
}
