import React from "react";
import { Router, Route, Switch } from "react-router-dom";

//import "./index.css";
//import "./assets/css/login.scss";
//import "./assets/css/viewRecords.scss";

import history from "./history";
import CreateTask from "./taskManage/createTask";

const CustomesRoutes = () => (
  <Router history={history}>
    <div>
      <hr />
      <Switch>
        <Route exact path="/" component={CreateTask} />
      </Switch>
    </div>
  </Router>
);

export default CustomesRoutes;
