const socket = io();

const messageInput = document.getElementsByClassName("message-input")[0];
const messageGroup = document.getElementsByClassName("message-group")[0];
const answerGroup = document.getElementsByClassName("answer-group")[0];

const sendButton = document.getElementsByClassName("send-button")[0];
const backwardButton = document.getElementsByClassName("backward-button")[0];

let ready = false;

const onLoginClick = e => {
    const inputValue = messageInput.value;
    if (!inputValue || !inputValue.trim()) return;
    const trimmedMessage = inputValue.replace(/ +(?= )/g,'');
    window.navigator.vibrate && window.navigator.vibrate(1000);
    socket.emit("send", trimmedMessage);
    messageInput.value = '';
    messageGroup.classList.add("hidden");
    answerGroup.classList.remove("hidden");
};

const onLogoutClick = e => {
    messageGroup.classList.remove("hidden");
    answerGroup.classList.add("hidden");
};

sendButton.addEventListener("click", onLoginClick);
backwardButton.addEventListener("click", onLogoutClick);

