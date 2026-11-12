import { ipcRenderer } from "electron";

const store = {
    get: (key: string) => ipcRenderer.invoke("store:get", key),
    set: (key: string, value: any) => ipcRenderer.invoke("store:set", key, value),
    delete: (key: string) => ipcRenderer.invoke("store:delete", key)
}

declare global
{
    interface Window
    {
        ipcRenderer: typeof ipcRenderer;
        electronStore: typeof store;
    }
}