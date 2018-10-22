#!/usr/bin/env node

const http = require('http');
const app = require('./app');
const keystorefunc = require('../helpers/keyStoreFunctions');


const port = 80;
app.set('port', port);
const server = http.createServer(app);


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      console.error(`Port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`Port ${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  console.log(`Listening on port ${addr.port}`);
}

keystorefunc.checkDirs().then(() => {
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
}).catch(() => {
  console.error('Failed to create directories for certs');
});
