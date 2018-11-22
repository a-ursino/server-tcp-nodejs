const debug = require("debug")("server");

const ServerFactory = require("./server");

const port = 10000;

const server = ServerFactory();

server.listen(port, () => {
  debug("The server started at localhost port:", port);
});
