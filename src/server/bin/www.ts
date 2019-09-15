#!/usr/bin/env node

import http from "http";
import app from "./app";
import keystorefunc from "../helpers/keyStoreFunctions";
import { AddressInfo } from "net";

const port = 80;
app.set("port", port);
const server = http.createServer(app);

function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    switch (error.code) {
        case "EACCES":
            process.stderr.write(`Port ${port} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            process.stderr.write(`Port ${port} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address() as AddressInfo;
    process.stderr.write(`Listening on port ${addr.port}\n`);
}

keystorefunc.checkDirs().then(() => {
    server.listen(port);
    server.on("error", onError);
    server.on("listening", onListening);
}).catch(() => {
    process.stderr.write(`Failed to create directories for certs\n`);
    process.exit(1);
});
