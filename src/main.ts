import url from 'url';
import path from 'path';
import {app, BrowserWindow } from 'electron';

let window: BrowserWindow | null;

const createWindow = () => {
    window = new BrowserWindow({width: 800, height: 600});
    window.webContents.openDevTools(); //TODO: remove this and only show this on Dev mode
    window.loadURL(
        url.format({
            pathname: path.join(__dirname, "index.html"),
            protocol: "file:",
            slashes: true
        })
    );

    window.on("closed", ()=>{
        window = null;
    });
};

//Setting up standard events for the electron process
app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if(process.platform !== "darwin") {
        app.quit();   
    }
});
app.on("activate", () => {
    if(window === null) {
        createWindow();
    }
});
