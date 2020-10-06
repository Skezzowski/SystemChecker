import React, { Component } from "react";
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
        <CpuInfo cpuData={cpuData}></CpuInfo>
        <RamInfo ramData={ramData}></RamInfo>
      </div>
    );
  }
}
