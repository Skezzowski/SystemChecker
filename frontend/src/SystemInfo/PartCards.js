import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import React from "react";

export const CpuInfo = (props) => {
  const isTempMissing = props.cpuData.temp.main === -1;
  console.log(props.cpuData);
  return (
    <Card style={{ width: "20rem" }}>
      <Card.Img variant="top" src="cpu.jpg" />
      <Card.Body>
        <Card.Title>Cpu</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>
            Model:{" "}
            {props.cpuData.manufacturer +
              " " +
              props.cpuData.brand +
              " " +
              props.cpuData.speed}{" "}
            Ghz
          </ListGroup.Item>
          <ListGroup.Item>Cores: {props.cpuData.physicalCores}</ListGroup.Item>
          <ListGroup.Item variant={isTempMissing ? "danger" : ""}>
            Temp:{" "}
            {isTempMissing
              ? "Administrator credentials needed"
              : props.cpuData.temp.main}
          </ListGroup.Item>
          <ListGroup.Item>
            Current Load: {props.cpuData.currentSpeed.currentload.toFixed(2)} %
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export const RamInfo = (props) => {
  return <p>{props.ramData.used}</p>;
};
