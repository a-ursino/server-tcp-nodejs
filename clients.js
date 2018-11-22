const ClientsFactory = () => {
  const connectedClient = [];
  return {
    add(client) {
      connectedClient.push(client);
    },
    remove(client) {
      const removed = connectedClient.splice(
        connectedClient.indexOf(client),
        1
      );
      if (removed.length === 0) {
        return false;
      }
      return true;
    },
    broadcast(buffer, filter) {
      connectedClient
        .filter(i => i !== filter)
        .forEach(c => {
          c.write(buffer.toString());
        });
    },
    length() {
      return connectedClient.length;
    }
  };
};

module.exports = ClientsFactory;
