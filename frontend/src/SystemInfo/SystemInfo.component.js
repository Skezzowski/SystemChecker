import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";

import { CpuInfo, RamInfo } from "./PartCards";

const electron = window.require("electron");

export default class SystemInfo extends Component {
  state = {};

  constructor() {
    super();
    this.refreshPartsData = this.refreshPartsData.bind(this);
  }

  refreshPartsData() {
    electron.ipcRenderer.invoke("GetCpuData").then((data) => {
      this.setState({ cpuData: data });
    });
    electron.ipcRenderer.invoke("GetRamData").then((data) => {
      this.setState({ ramData: data });
    });
  }

  componentDidMount() {
    this.timerId = setInterval(this.refreshPartsData, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    const { cpuData, ramData } = this.state;
    if (!cpuData || !ramData) {
      return <div></div>;
    }
    return (
      <div>
        <Container>
          <Row>
            <Col sm>
              {" "}
              <CpuInfo cpuData={cpuData}></CpuInfo>
            </Col>
            <Col sm>
              {" "}
              <RamInfo ramData={ramData}></RamInfo>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
