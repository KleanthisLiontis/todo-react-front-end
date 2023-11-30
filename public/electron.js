//Minimum stuff needed for electron to work

const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
///////////////////////////////////////////////////

//Desktop window
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            //The following two flags enable the remote process (desktop window)
            //to run code on main process.
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        },
    });
    mainWindow.loadURL(
        isDev
           ? "http://localhost:3000"
           : `file://${path.join(__dirname, 
                                 "../build/index.html")}`
    );
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
}

app.whenReady().then(() => {
    createWindow();
    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0){
           createWindow(); 
        }
    });
});

//This is for macOS
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});