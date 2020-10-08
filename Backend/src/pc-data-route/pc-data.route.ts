import express from "express";
import { readdirSync } from "fs";
import pcDataModel from "./pc-data.model";

let router = express.Router();

router.route("/data").post((req, res) => {
  if (
    !req.body ||
    req.body.cpuData.temp === undefined ||
    req.body.cpuData.currentLoad === undefined ||
    req.body.ramData.used === undefined
  ) {
    return res.status(403).json({ msg: "Missing data" });
  }

  const pcData = new pcDataModel({
    cpuTemp: req.body.cpuData.temp,
    cpuLoad: req.body.cpuData.currentLoad,
    ramUsage: req.body.ramData.used,
  });
  console.log(req.body);
  pcData
    .save()
    .then((_) => res.status(200).json({ msg: "Data saved" }))
    .catch((error) => {
      console.log(error);
      res.status(500).json({ msg: "Server error" });
    });
});

router.route("/data").get((req, res) => {
  let numberOfDataNeeded = 0;
  if (req.query && req.query.username) {
    numberOfDataNeeded = (req.query as any).data;
  }
  pcDataModel
    .find()
    .sort("-createdAt")
    .limit(numberOfDataNeeded)
    .then((data) => res.status(200).json(data));
});

module.exports = router;