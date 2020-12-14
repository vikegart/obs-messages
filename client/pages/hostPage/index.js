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
