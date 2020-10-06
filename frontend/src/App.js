import React from "react";
import Nav from "react-bootstrap/Nav";
import { HashRouter as Router, Link, Route, Redirect } from "react-router-dom";

import SystemInfo from "./SystemInfo/SystemInfo.component";
import SystemInfoPast from "./SystemInfoPast/SystemInfoPast";

function App() {
  return (
    <Router>
      <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link as={Link} to="/current">
            System Info
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/past">
            History
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <div>
        <Route exact path="/">
          <Redirect to="/current" />
        </Route>
        <Route path="/current" component={SystemInfo} />
        <Route path="/past" component={SystemInfoPast} />
      </div>
    </Router>
  );
}

export default App;
