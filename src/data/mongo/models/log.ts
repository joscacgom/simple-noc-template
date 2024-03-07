import mongoose from "mongoose";
import { LogLevel } from "../../../domain/useCases/entities/LogEntity";

const logSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        enum: LogLevel,
        default: LogLevel.LOW,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    origin: String,
});

export const Log = mongoose.model("Log", logSchema);