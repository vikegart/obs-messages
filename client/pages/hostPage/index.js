const socket = io();

const main = document.getElementsByClassName("main")[0];

const TIMER = 12000;
const SCROLLAMOUNT = 10;
const MARQUEE_TIC = 85; //in ms default

const msgArr = ['Мама, я в телевизоре (с) Викентий. jh супер пупер длиное очень, даже да!'];


socket.on('broadcast', message => {
    msgArr.push(message);
});


const processMsg = (timeout) => {
    setTimeout(() => {
        main.innerHTML = '';
        const messageForPrint = msgArr.shift();
        if (messageForPrint) {
            
            const marqueeEl = buildMarquee(messageForPrint);
            main.innerHTML = marqueeEl;
            
            const containerWidth = main.clientWidth;
            const marquee = main.children[0];
            const font = window.getComputedStyle(marquee).font;
            const messageWidth = getTextWidth(messageForPrint, font);

            const msToFinish = (containerWidth + messageWidth) / SCROLLAMOUNT * MARQUEE_TIC;
            processMsg(msToFinish);
        } else {
            processMsg(500);
        }
    }, timeout);
}

const buildMarquee = (message) => {
    return `<marquee loop="1" scrollamount="10">${message}</marquee>`
}

processMsg(100);

function getTextWidth(txt, font) {
    this.element = document.createElement('canvas');
    this.context = this.element.getContext("2d");
    this.context.font = font;
    return this.context.measureText(txt).width;
}
