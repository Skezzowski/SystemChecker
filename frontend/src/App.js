import React from "react";
import Nav from "react-bootstrap/Nav";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SystemInfo from "./SystemInfo/SystemInfo.component";
import SystemInfoPast from "./SystemInfoPast/SystemInfoPast";

function App() {
  return (
    <Router>
      <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link href="/current">Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/past">Option 2</Nav.Link>
        </Nav.Item>
      </Nav>
      <Switch>
        <Route exact path="/">
          <Redirect to="/current" />
        </Route>
        <Route path="/current" component={SystemInfo} />
        <Route path="/past" component={SystemInfoPast} />
      </Switch>
    </Router>
  );
}

export default App;
