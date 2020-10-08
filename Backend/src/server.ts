import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

const port = 3001;
const app = express();
export const router = express.Router();

// Database Config
require("./database");

app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS
let corsOptions = {
  origin: ["http://localhost:3001"],
  credentials: true,
};
app.use(cors(corsOptions));

// Logger
app.use(morgan("dev"));

let pcDataRoute = require("./pc-data-route/pc-data.route");
router.use(pcDataRoute);

app.use(router);

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
