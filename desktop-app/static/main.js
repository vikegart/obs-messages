"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.app.on('ready', () => {
    const win = new electron_1.BrowserWindow({
        show: false,
        transparent: true,
        frame: false,
        // An electron bug makes the bgcolor white on navigation/reload for #000000 and #00000000
        backgroundColor: '#00ffffff',
        // skipTaskbar: true,
        hasShadow: false,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true
        },
        width: 1920,
    });
    win.loadFile(__dirname + '/html/index.html');
    win.setIgnoreMouseEvents(true);
    win.setAlwaysOnTop(true, "pop-up-menu");
    console.log('initialized app');
    win.on('ready-to-show', () => {
        win.show();
        console.log('showing');
    });
});
