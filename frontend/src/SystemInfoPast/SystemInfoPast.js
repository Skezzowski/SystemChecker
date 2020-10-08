import React, { Component } from "react";
import { Container, Row, Card, Form, Button } from "react-bootstrap";
import Loader from "react-loader-spinner";
import { VictoryChart, VictoryArea, VictoryAxis } from "victory";

import { getSystemPastData } from "../AppAPI";
import { Error } from "../Util/Error";

const Chart = (props) => {
  return (
    <div>
      <VictoryChart
        style={{
          background: {
            fill: "blue",
          },
        }}
      >
        <VictoryArea data={props.data} style={{ data: { fill: "tomato" } }} />
        <VictoryAxis></VictoryAxis>
        <VictoryAxis
          dependentAxis
          tickCount={10}
          domain={{ y: [0, 100] }}
        ></VictoryAxis>
      </VictoryChart>
    </div>
  );
};

export default class SystemInfoPast extends Component {
  state = { serverError: false, data: [] };
  input = { value: 0 };
  numberError = false;

  constructor() {
    super();
    this.askForSystemData.bind(this);
  }

  componentDidMount() {
    this.askForSystemData(0);
  }

  askForSystemData(amount) {
    if (amount < 0) {
      this.numberError = true;
      return;
    }
    this.numberError = false;
    getSystemPastData(amount)
      .then((data) => {
        const cpuLoadData = data.map((d) => d.cpuLoad.toFixed(2));
        const cpuTemp = data.map((d) => d.cpuTemp);
        const ramLoad = data.map(
          (d) => (d.ramUsed / this.props.totalRam) * 100
        );
        this.setState({ cpuLoadData, cpuTemp, ramLoad });
      })
      .catch((err) => this.setState({ serverError: true }));
  }

  render() {
    const { cpuLoadData, cpuTemp, ramLoad } = this.state;

    if (this.state.serverError) {
      return <Error msg="Server Unreachable"></Error>;
    }
    if (
      cpuLoadData === undefined ||
      cpuTemp === undefined ||
      ramLoad === undefined ||
      !this.props.totalRam
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
      <div>
        <Form
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            margin: "20px",
          }}
        >
          <Form.Control
            type="number"
            style={{ width: "20%" }}
            isInvalid={this.numberError}
            ref={(c) => (this.input = c)}
            placeholder="0"
          />
          <Button
            style={{ marginLeft: "10px" }}
            variant="primary"
            type="submit"
            onClick={() => this.askForSystemData(this.input.value)}
          >
            Submit
          </Button>
        </Form>
        <Container>
          <Row>
            <Card style={{ width: "30rem" }}>
              <Card.Header>
                <Card.Title>CPU Load</Card.Title>
                <Chart data={cpuLoadData}></Chart>
              </Card.Header>
            </Card>
            <Card style={{ width: "30rem" }}>
              <Card.Header>
                <Card.Title>CPU temperature</Card.Title>
                <Chart data={cpuTemp}></Chart>
              </Card.Header>
            </Card>
            <Card style={{ width: "30rem" }}>
              <Card.Header>
                <Card.Title>RAM Load</Card.Title>
                <Chart data={ramLoad}></Chart>
              </Card.Header>
            </Card>
          </Row>
        </Container>
      </div>
    );
  }
}
