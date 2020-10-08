import React from "react";
import { Alert } from "react-bootstrap";

export const Error = (props) => {
  return (
    <Alert variant={"danger"} className={"error"}>
      {props.msg}
    </Alert>
  );
};
