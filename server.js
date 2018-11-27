const Net = require("net");
const debug = require("debug")("server");
const ClientsFactory = require("./clients");

const serverFactory = () => {
  const clients = ClientsFactory();

  const server = new Net.Server();

  server.on("connection", clientSocket => {
    clients.add(clientSocket);
    debug("New connection from client n°", clients.length());

    clientSocket.on("data", chunk => {
      clients.broadcast(chunk, clientSocket);
      debug("New message from client. Broadcast it:", chunk.toString());
    });

    clientSocket.on("error", err => {
      clients.remove();
      debug("Client socket error:", err);
    });

    clientSocket.on("end", () => {
      clients.remove(clientSocket);
      debug(
        "Closing connection with the client. Clients alive",
        clients.length()
      );
    });
  });

  server.on("error", err => {
    if (err.code === "EADDRINUSE") {
      debug("Address in use, retry.");
      server.close();
    }
    debug("Server Error", err);
  });
  return {
    listen(port, fn) {
      server.listen(port, fn);
    },
    close() {
      server.close();
    }
  };
};
module.exports = serverFactory;
