const user = {
    name: "john",
    welcomeMessage: function () {
        console.log(`hello ${this.name}`);
    }
}

user.welcomeMessage()
user.name = "kate"
user.welcomeMessage()

