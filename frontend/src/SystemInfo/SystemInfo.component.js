import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Loader from "react-loader-spinner";

import { CpuInfo, GPUInfo, RamInfo } from "./PartCards";

export default class SystemInfo extends Component {
  render() {
    if (!this.props.pcInfo.loaded) {
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
    const { cpuData, ramData, gpuData } = this.props.pcInfo;
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
