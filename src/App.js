import React from "react";
import {
  Route,
  Switch,  
  BrowserRouter
} from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";

function App() {
  return <BrowserRouter>
    <Switch>
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
      <Route>
        <Login />
      </Route>
    </Switch>
  </BrowserRouter>
}

export default App;
