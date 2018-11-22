const ClientsFactory = require("./clients");

describe("the Clients should", () => {
  test("return 0 with zero client", () => {
    const clients = ClientsFactory();
    expect(clients.length()).toBe(0);
  });
  test("return 1 after we add 1 client", () => {
    const clients = ClientsFactory();
    const socketMock = {};
    clients.add(socketMock);
    expect(clients.length()).toBe(1);
  });
  test("return 2 after we add 2 client", () => {
    const clients = ClientsFactory();
    const socketMock = {};
    clients.add(socketMock);
    clients.add(socketMock);
    expect(clients.length()).toBe(2);
  });
  test("broadcast to the correct client", () => {
    const clients = ClientsFactory();
    const socketMockOne = {
      write: jest.fn()
    };
    const socketMockTwo = {
      write: jest.fn()
    };
    clients.add(socketMockOne);
    clients.add(socketMockTwo);
    const buff = Buffer.from("Hello", "utf8");
    clients.broadcast(buff, socketMockOne);
    expect(clients.length()).toBe(2);
    expect(socketMockOne.write).toBeCalledTimes(0);
    expect(socketMockTwo.write).toBeCalledTimes(1);
  });

  test("return 1 after we add 2 client and remove 1", () => {
    const clients = ClientsFactory();
    const socketMockOne = {};
    const socketMockTwo = {};
    clients.add(socketMockOne);
    clients.add(socketMockTwo);
    clients.remove(socketMockOne);
    expect(clients.length()).toBe(1);
  });
  test("return 0 after we add 2 client and remove 1", () => {
    const clients = ClientsFactory();
    const socketMockOne = {};
    const socketMockTwo = {};
    clients.add(socketMockOne);
    clients.add(socketMockTwo);
    clients.remove(socketMockOne);
    clients.remove(socketMockTwo);
    expect(clients.length()).toBe(0);
  });
  test("return false if we remove two times the same socket", () => {
    const clients = ClientsFactory();
    const socketMockOne = {};
    clients.add(socketMockOne);
    clients.remove(socketMockOne);
    expect(clients.remove(socketMockOne)).toBe(false);
  });
});
