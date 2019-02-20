class Room {
  constructor (name) {
    this.name = name;
    this.members = new Map();
    this.history = [];
  }

  broadcastMessage (message) {
    if (!this.members.size) {
      throw new Error('No members to broadcast for');
    } else if (!message) {
      throw new Error('No message to broadcast');
    } else if (typeof message !== 'string') {
      throw new Error(`Message should be a string, but got ${message.toString()}`);
    }

    this.members.forEach(member => member.emit('message', message));
  }

  addEntry (entry) {
    this.history.push(entry);
  }

  getHistory () {
    return this.history.slice();
  }

  addUser (client) {
    this.members.set(client.id, client);
  }

  removeUser (client) {
    this.members.delete(client.id);
  }

  serialize () {
    return {
      name: this.name,
      numMembers: this.members.size
    };
  }
}

module.exports = Room;