const EventEmitter = require('events');

class ChatRoom extends EventEmitter {
    constructor() {
        super();
        this.users = [];
    }

    join(user) {
        this.users.push(user);
        this.emit('join', user);
    }

    leave(user) {
        const index = this.users.indexOf(user);
        if (index !== -1) {
            this.users.splice(index, 1);
            this.emit('leave', user);
        }
    }

    sendMessage(user, message) {
        this.emit('message', user, message);
    }
}

const chatRoom = new ChatRoom();

chatRoom.on('join', (user) => {
    console.log(`${user} has joined the chat room`);
});

chatRoom.on('leave', (user) => {
    console.log(`${user} has left the chat room`);
});

chatRoom.on('message', (user, message) => {
    console.log(`${user}: ${message}`);
});

chatRoom.join('John');
chatRoom.sendMessage('John', 'Hello, world!');
chatRoom.join('Jane');
chatRoom.sendMessage('Jane', 'Hi, John!');
chatRoom.leave('John');
