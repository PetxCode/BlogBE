"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mainApp_1 = require("./mainApp");
const db_1 = require("./config/db");
dotenv_1.default.config();
const readPort = process.env.MY_PORT;
const port = parseInt(readPort);
const app = (0, express_1.default)();
(0, mainApp_1.mainApp)(app);
const server = app.listen(process.env.PORT || port, () => {
    (0, db_1.db)();
});
process.on("uncaughtException", (error) => {
    console.log("Shutting down server because of uncaughtException Error");
    console.log(error);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("Shutting down server because of unhandledRejection Error");
    console.log(reason);
    server.close(() => {
        process.exit(1);
    });
});
