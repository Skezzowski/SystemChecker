import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Loader from "react-loader-spinner";

import { CpuInfo, GPUInfo, RamInfo } from "./PartCards";

const electron = window.require("electron");

export default class SystemInfo extends Component {
  state = {};

  constructor() {
    super();
    this.initState = this.initState.bind(this);
    this.refreshPartsData = this.refreshPartsData.bind(this);
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

  refreshPartsData() {
    electron.ipcRenderer.invoke("GetChangingData").then((data) => {
      this.setState((state, props) => {
        const newState = { ...state };
        newState.cpuData.temp = data.cpuData.temp;
        newState.cpuData.currentLoad = data.cpuData.currentLoad;
        newState.ramData.used = data.ramData.used;
        return newState;
      });
    });
  }

  componentDidMount() {
    this.initState();
    this.timerId = setInterval(this.refreshPartsData, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    const { cpuData, ramData, gpuData } = this.state;
    if (
      !cpuData ||
      !ramData ||
      !gpuData ||
      cpuData.currentLoad === undefined ||
      cpuData.temp === undefined ||
      ramData.used === undefined
    ) {
      return (
        <Loader
          style={{ position: "fixed", top: "50%", left: "50%" }}
          type="Bars"
          color="#00BFFF"
          height={80}
          width={80}
        />
      );
    }
    return (
      <Container>
        <Row>
          <Col sm>
            <CpuInfo cpuData={cpuData}></CpuInfo>
          </Col>
          <Col sm>
            <RamInfo ramData={ramData}></RamInfo>
          </Col>
          <Col sm>
            <GPUInfo gpuData={gpuData}></GPUInfo>
          </Col>
        </Row>
      </Container>
    );
  }
}
