const net = require("net");
const debug = require("debug")("server");

const ClientFactory = (port = 10000, address = "127.0.0.1") => {
  const client = new net.Socket();
  client.connect(
    port,
    address,
    () => {
      debug("Connected");
    }
  );

  client.on("close", () => {
    debug("Connection closed");
  });

  return {
    send(message) {
      client.write(message);
    },
    read() {
      return new Promise(resolve => {
        client.on("data", data => {
          resolve(data.toString());
        });
      });
    },
    close() {
      client.destroy();
    }
  };
};

module.exports = ClientFactory;
