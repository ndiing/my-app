const { app, BrowserWindow, Notification, Tray, Menu, nativeImage } = require("electron");
const path = require("path");
const { updateElectronApp, UpdateSourceType } = require("update-electron-app");

updateElectronApp({
    updateInterval: "5 minutes",
});

if (require("electron-squirrel-startup")) {
    app.quit();
}

let myWindow = null;
let tray = null;
const additionalData = { myKey: "myValue" };
const gotTheLock = app.requestSingleInstanceLock(additionalData);

if (!gotTheLock) {
    app.quit();
} else {
    app.on("second-instance", (event, commandLine, workingDirectory, additionalData) => {
        if (myWindow) {
            if (myWindow.isMinimized()) myWindow.restore();
            myWindow.focus();
        }
    });

    const createWindow = () => {
        myWindow = new BrowserWindow({
            // width: 800,
            // height: 600,
            frame: false,
            webPreferences: {
                preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
            },
        });
        myWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
        // myWindow.webContents.openDevTools();
    };

    const NOTIFICATION_TITLE = "Basic Notification";
    const NOTIFICATION_BODY = "Notification from the Main process";

    function showNotification() {
        new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show();
    }

    function createTray() {
        const icon = nativeImage.createFromDataURL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALBSURBVDiNbZJdSNNRGMZ/5zi36WZlYWZlX0LfYB8DrbCowJXTIooyiKCMoBUG0ZddVDeCXkRWUGBE2I0kiiZmWF5U9GE1iJpzEVSCtD6cuZnTtbn/6UL/auFz9/K8v3Oe854XJlCn17um09u+U6+Vm3zl5qVqJ6za+aHauancpALIiQ5QmqYpxP4R+BSCRgTZgAmYDhziGx2qieVCh754PRdQomX+0qVtAD6XKzHNbDsGlI+0eFFcRbKAr5zgK3FMxmsYu1a0INReoA0gzWRzjoPfECVXrCQAoOrZCNgIsWg0wT9P8LAJRSsggNdEseswgLpHNb8oRILs9LrXfvF4snRzy9HizR2+mXcA0dNv7T9QdfCe7cbh0CjcQDoD7ADATJ8EkYbknM/lSnQ4i09KTTyalDA4C6ClY5n1Z39S6aRQ+O3qgoJE1UA6f+ggjAkAK5cN85YsrwPqHEeOn1GIMoDAQCKzp/SSMb2bwUAPg4GeZUtmUs8g6whjAWAaD4SDixJgq7P4tIKykZCvozF5CyDL+Jl9C9sAWJXSmTsKJ/NQbCMPwOA4cnybUjrMq0gswb4ypWsg1GXMtXyPpGem9gLQFbQMjzSZpvfmlkL3C3OjpkSVVFACCAGeSMxsb60sDwobUctQZPEnOdl7+20GAPEGQ3goWZ4U2ynItNtDWkyWCjSfAVgBoBTXWivLg/q0HQ1FKUG/f04sEhn+y2/zS+K3t1XofmZOzisYXuU+AAQZuplXVDQ32O33xCIRC4DRYm16XFtdAfDu+ZMr7549y9Z7JahGgHCg50TOzl2u9bsL7wa6/R9j0RHYmtR86eyZPWNbFlct0HL1UuQ5nTPCvb89AwH/VP6T0ZJ0/2ltTb77xZNGLSZL9djjJZuvX/+uaWwwJlg+yDiDJoQgzmjqMyUln39aW5MPoClRhRATrv1fEUwY5mvHZNYAAAAASUVORK5CYII=");
        tray = new Tray(icon);

        const contextMenu = Menu.buildFromTemplate([
            {
                label: "Relaunch",
                click: () => {
                    app.relaunch();
                    app.exit(0);
                },
            },
            { type: "separator" },
            {
                label: "Quit",
                click: () => {
                    app.quit();
                },
            },
        ]);

        tray.setToolTip("This is my application.");
        tray.setContextMenu(contextMenu);
    }

    app.whenReady().then(() => {
        createWindow();
        showNotification();
        createTray();

        app.on("activate", () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow();
            }
        });
    });

    app.on("window-all-closed", () => {
        if (process.platform !== "darwin") {
            app.quit();
        }
    });
}
