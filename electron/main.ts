import { app, BrowserWindow, ipcMain, Menu, Tray } from "electron";
import Store from "electron-store";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDevelopment = process.env.NODE_ENV === "development";

Store.initRenderer();
const store = new Store({
    name: "user-config"
});

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

        // 获取用户配置`关闭应用时操作`
        // let closeOp = store.get("closeOp");
        // if (closeOp === "close")
        curr?.close();
    });

    ipcMain.handle("store:get", (e, k: string) =>
    {
        return store.get(k);
    });

    ipcMain.handle("store:set", (e, k: string, v: any) =>
    {
        store.set(k, v);
    });

    ipcMain.handle("store:delete", (e, k: string) =>
    {
        return store.get(k);
    });
}

const createWindow = function ()
{
    console.log(process.env.APP_ROOT)
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
            contextIsolation: true,
            preload: path.join(MAIN_DIST, "preload.js")
        }
    });

    win.webContents.openDevTools();
    win.loadURL("http://localhost:13579");

    // let closeOp = store.get("closeOp");
    // if (!closeOp)
    //     store.set("closeOp", "ask");
    console.log(RENDERER_DIST);

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