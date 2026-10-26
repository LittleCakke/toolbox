import { app, BrowserWindow, ipcMain, Menu, Tray } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDevelopment = process.env.NODE_ENV === "development";

process.env.APP_ROOT = path.join(__dirname, "..");

export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, ".output/public");

process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
    ? path.join(process.env.APP_ROOT, "public")
    : RENDERER_DIST;

let win: BrowserWindow | null;

const initIPC = (mainWindow: BrowserWindow, t?: Tray) =>
{
    ipcMain.handle("closeApp", (e) =>
    {
        // ...
        let webContents = e.sender;
        let curr = BrowserWindow.fromWebContents(webContents);

        curr?.close();
    });
}

const createWindow = function ()
{
    win = new BrowserWindow({
        width: 1280 + 64,
        height: 720 + 64,
        autoHideMenuBar: true,
        titleBarStyle: "hidden",
        resizable: false,
        frame: false,
        transparent: true,
        webPreferences: {
            sandbox: false,
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(MAIN_DIST, "preload.js")
        }
    });

    //win.webContents.openDevTools();
    win.loadURL("http://localhost:13579");

    initIPC(win);
}


app.whenReady().then(() =>
{
    createWindow();
});

app.on("window-all-closed", () =>
{
    if (process.platform !== "darwin")
        app.quit();
});