import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import { HashRouter as Router, Link, Route, Redirect } from "react-router-dom";
import { sendSystemData } from "./AppAPI";

import SystemInfo from "./SystemInfo/SystemInfo.component";
import SystemInfoPast from "./SystemInfoPast/SystemInfoPast";

import "./App.css";

const electron = window.require("electron");

export default class App extends Component {
  state = { loaded: false, ramData: {}, cpuData: {}, gpuData: {} };

  constructor() {
    super();
    this.initState = this.initState.bind(this);
    this.refreshPartsChangingData = this.refreshPartsChangingData.bind(this);
  }

  initState() {
    electron.ipcRenderer.invoke("GetCpuBaseData").then((data) => {
      this.setState({ cpuData: data });
    });
    electron.ipcRenderer.invoke("GetRamBaseData").then((data) => {
      this.setState({ ramData: data });
    });
    electron.ipcRenderer.invoke("GetGPUBaseData").then((data) => {
      this.setState({ gpuData: data });
    });
  }

  refreshPartsChangingData() {
    electron.ipcRenderer.invoke("GetChangingData").then((data) => {
      this.setState((state, props) => {
        const newState = { ...state };
        newState.cpuData.temp = data.cpuData.temp;
        newState.cpuData.currentLoad = data.cpuData.currentLoad;
        newState.ramData.used = data.ramData.used;
        newState.loaded = true;
        return newState;
      });
    });
  }

  componentDidMount() {
    this.initState();
    this.refreshIntervalId = setInterval(this.refreshPartsChangingData, 1000);
    this.sendDataIntervalId = setInterval(
      () => sendSystemData(this.state).catch((error) => {}),
      60000  // send data with 1 minute interval
    );
  }

  componentWillUnmount() {
    clearInterval(this.refreshIntervalId);
    clearInterval(this.sendDataIntervalId);
  }

  render() {
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
          <Route
            path="/current"
            render={(props) => <SystemInfo {...props} pcInfo={this.state} />}
          />
          <Route
            path="/past"
            render={(props) => (
              <SystemInfoPast {...props} totalRam={this.state.ramData.total} />
            )}
          />
        </div>
      </Router>
    );
  }
}
