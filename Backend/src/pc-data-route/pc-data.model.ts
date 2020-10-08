import mongoose from "mongoose";

const pcDataSchema = new mongoose.Schema(
  {
    ramUsage: { type: Number, required: true },
    cpuTemp: { type: Number, required: true },
    cpuLoad: { type: Number, required: true },
  },
  { timestamps: true }
);

export interface IPcData extends mongoose.Document {
  ramUsage: number;
  cpuTemp: number;
  cpuLoad: number;
}

export default mongoose.model<IPcData>("pcData", pcDataSchema);
