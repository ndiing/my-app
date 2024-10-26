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
            width: 800,
            height: 600,
            webPreferences: {
                preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
            },
        });
        myWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
        // myWindow.webContents.openDevTools();
        myWindow.removeMenu();
    };

    const NOTIFICATION_TITLE = "Basic Notification";
    const NOTIFICATION_BODY = "Notification from the Main process";

    function showNotification() {
        new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show();
    }

    function createTray() {
        const icon = nativeImage.createFromDataURL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAwAAAAMABMHffXgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHoSURBVDiNvZNNaBNBGIaf2WRN1mRTE9MUiSKNkkNRMK1YEC8q9KJCEe+iRyvoQQQFNaH4g5ee2oMgIhS8KcWLePEiiEICUky9aP0posb8srv53/FQtokkrZ58L8N877zP98HMCCklfZWZO4mQ1wCQYprRc4/7HRM9gLdzh7HlHeCAUzL9MSr6SNHTrkyHontn+gPSs6MIeRshJhyzqkUphsepeyJ46jmC+ddo5tfnSHGFsanMGqD27NID79DwaUAANDxhClvHqW7egdosE8y/wWd86G4s7WruoXIweUZIKfl2c09d1UObfGOTGLHjmP5duNoWWwpp9MoSQtqdZKOELGWRLaPhOrbgcTtG7ftHVswwVlklbrwibL1D2K1Oz5aJXcoirZXVvdu3unTPNbD0CDMYx3iZwh3QCIwcwqW6scvvkeYn6JrE0R8A9cciO5+cAsDIgfl5kW374yDbPUFHyroOIFvNDcN/BfyL/h/AXufFKwDqwGB2o/BCRnBhXqHW7NSEqmfXAIPnXyR8uxNJNRC2+gEKJlyftPGqgKpbQh9OKhPzCei6xtDZpykgVbx/4lY99+Vis5LXHG/5l0DTfDXhj8woR+9d7Yb3/kaAVEopRdN3qz+Xp4b2xcAbmVWObL8MN3pe0m9iTLjpQdFwPQAAAABJRU5ErkJggg==");
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
