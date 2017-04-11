const changeText = {
    type: 'outgoing',
    name: 'change-text',
    controller: (bot, update, message, next) => {
        console.log(message); // this is a full valid messenger object/ OutgoingMessage object
        //You could update the text here
        //message.message.text = "Hello you!";
        next();
    }
};

module.exports = {
    changeText,
};