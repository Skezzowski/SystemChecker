import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import React from "react";
import { formatBytes } from "../Utils";

import "./PartCards.css";

export const CpuInfo = (props) => {
  const isTempMissing = props.cpuData.temp === -1;
  return (
    <Card>
      <Card.Img variant="top" src="cpu.jpg" />
      <Card.Body>
        <Card.Title>CPU Info</Card.Title>
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
            {isTempMissing ? "Administrator rights needed" : props.cpuData.temp}
          </ListGroup.Item>
          <ListGroup.Item>
            Current Load: {props.cpuData.currentLoad.toFixed(2)} %
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export const RamInfo = (props) => {
  return (
    <Card>
      <Card.Img variant="top" src="ram.jpg" />
      <Card.Body>
        <Card.Title>Ram Info</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>
            Total: {formatBytes(props.ramData.total, 0)}
          </ListGroup.Item>
          <ListGroup.Item>
            Used: {formatBytes(props.ramData.used, 2)} (
            {((props.ramData.used / props.ramData.total) * 100).toFixed(2)}%)
          </ListGroup.Item>
          <ListGroup.Item></ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};
