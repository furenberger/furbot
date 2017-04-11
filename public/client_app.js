/**
 * Created by ryanfurness on 4/8/17.
 */
// the following line could also be: "var socket = io('ws://<URL>:<PORT_Number>?botmasterUserId=wantedUserId');"
// if you know you will be communicating with a server different from the one that served you the page you are on.
// this only works because the socket.io library assumes with this syntax that the socket.io server
// lives at the same address as the server that served this page (this should mostly be your case)
let d = new Date();
let n = d.getTime(); //n should be a username...
let socket = io('?botmasterUserId=BILLY' + n);

// just get the html elements we will be needing by ID
let form = document.getElementById('form');
let textInput = document.getElementById('text-input');
let messages = document.getElementById('messages');

form.onsubmit = function(event) {
    // just making sure the page isn't refreshed
    event.preventDefault();
    // don't do anything if there is no text
    if (!textInput.value) {
        return;
    }
    // Add the user message to the web page
    messages.insertAdjacentHTML('beforeend',
        `<li class="user-message">${textInput.value}</li>`);
    // create a botmaster compatible message from the text input by the user
    const message = {
        text: textInput.value,
    };
    // send the message over the webSocket
    socket.send(message);
    // finally, clear the user textInput field
    textInput.value = '';
};

socket.on('message', function(botmasterMessage){
    let textMessage = botmasterMessage.message.text;

    messages.insertAdjacentHTML('beforeend',
        `<li class="botmaster-message">${textMessage}</li>`);
});
