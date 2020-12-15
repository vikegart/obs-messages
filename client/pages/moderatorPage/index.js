const socket = io();

const main = document.getElementsByClassName("main")[0];

const TIMER = 12000;

const msgArr = ['Мама, я в телевизоре (с) Викентий.'];


socket.on('broadcast', message => {
    msgArr.push(message);
});


const processMsg = (timeout) => {
    setTimeout(() => {
        main.innerHTML = '';
        const messageForPrint = msgArr.shift();
        if (messageForPrint){
            const marqueeEl = buildMarquee(messageForPrint);
            main.innerHTML = marqueeEl;
            processMsg(TIMER);
        } else {
            processMsg(500);
        }
    }, timeout);
}

const buildMarquee = (message) => {
    return `<marquee loop="1" scrollamount="10">${message}</marquee>`
}

processMsg(100);


const moderateList = document.getElementsByClassName("moderate")[0];
const msgToApprove = [];
const processApprove = (timeout) => {
    setTimeout(() => {
        moderateList.innerHTML = '';
        const messageForModerate = msgToApprove.shift();
        if (messageForModerate){
            const moderateEl = buildModerate(messageForModerate);
            moderateList.innerHTML = moderateEl;
        } else {
            processApprove(500);
        }
    }, timeout);
}

processApprove(100);

const approveMsg = (message) => {
    socket.emit('approved', message);
    processApprove(100);
}

const rejectMsg = () => {
    processApprove(100);
}
socket.on('to_approve', message => {
    msgToApprove.push(message);
});

const buildModerate = (message) => {
    return `<div>
        ${message}
        <button onclick="approveMsg('${message}')">✅</button>
        <button onclick="rejectMsg()">❌</button>
    </div>`
}


