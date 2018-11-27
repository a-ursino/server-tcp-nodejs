const debug = require("debug")("server");

const ServerFactory = require("./server");
const ClientFactory = require("./client");

const port = 10000;

describe("the server should", () => {
  test("broadcast the messege sent by the client to all the others clients", () => {
    const server = ServerFactory();
    server.listen(port, () => {
      debug("The server started at localhost port:", port);
    });
    const clientOne = ClientFactory(port);
    const clientTwo = ClientFactory(port);
    const clientThree = ClientFactory(port);
    Promise.all([clientTwo.read(), clientThree.read()])
      .then(values => {
        debug(values);
        server.close();
        clientOne.close();
        clientTwo.close();
        clientThree.close();
        expect(values).toEqual(["Hello", "Hello"]);
      })
      .catch(err => {
        debug("There was an error inside the test", err);
      });

    clientOne.send("Hello");
  });
});
