const { app, BrowserWindow } = require("electron");
const path = require("node:path");
const { updateElectronApp, UpdateSourceType } = require("update-electron-app");
const { Notification } = require("electron");
const { Tray, Menu, nativeImage } = require("electron");

updateElectronApp({
    //   updateSource: {
    //     type: UpdateSourceType.ElectronPublicUpdateService,
    //     repo: 'github-user/repo'
    //   },
    updateInterval: "5 minutes",
    //   logger: require('electron-log')
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
    app.quit();
}

let myWindow = null;
let tray;
const additionalData = { myKey: "myValue" };
const gotTheLock = app.requestSingleInstanceLock(additionalData);

if (!gotTheLock) {
    app.quit();
} else {
    app.on("second-instance", (event, commandLine, workingDirectory, additionalData) => {
        // Print out data received from the second instance.
        console.log(additionalData);

        // Someone tried to run a second instance, we should focus our window.
        if (myWindow) {
            if (myWindow.isMinimized()) myWindow.restore();
            myWindow.focus();
        }
    });

    const createWindow = () => {
        // Create the browser window.
        myWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
            },
        });

        // and load the index.html of the app.
        myWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

        // // Open the DevTools.
        // myWindow.webContents.openDevTools();
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

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.whenReady().then(() => {
        createWindow();
        showNotification();
        createTray();

        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        app.on("activate", () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow();
            }
        });
    });

    // Quit when all windows are closed, except on macOS. There, it's common
    // for applications and their menu bar to stay active until the user quits
    // explicitly with Cmd + Q.
    app.on("window-all-closed", () => {
        if (process.platform !== "darwin") {
            app.quit();
        }
    });

    // In this file you can include the rest of your app's specific main process
    // code. You can also put them in separate files and import them here.
}
