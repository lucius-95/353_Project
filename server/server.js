const http = require('http');

const app = require('./app');
// Connect server with an app
const server = http.createServer(app);

// Server Listener
server.listen(process.env.SERVER_PORT, () =>
  console.log(`listening on port ${process.env.SERVER_PORT}`)
);
