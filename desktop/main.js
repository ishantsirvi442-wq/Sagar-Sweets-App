const { app, BrowserWindow, shell, Menu } = require("electron");

const APP_URL = "https://ishantsirvi442-wq.github.io/Sagar-Sweets-App/";

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 980,
    minHeight: 680,
    title: "Sagar Sweets Inventory",
    autoHideMenuBar: true,
    backgroundColor: "#f7f4ef",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  win.loadURL(APP_URL);

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https://") || url.startsWith("mailto:")) shell.openExternal(url);
    return { action: "deny" };
  });

  win.webContents.on("will-navigate", (event, url) => {
    if (!url.startsWith(APP_URL) && !url.startsWith("https://ishantsirvi442-wq.github.io/")) {
      event.preventDefault();
      if (url.startsWith("https://") || url.startsWith("mailto:")) shell.openExternal(url);
    }
  });
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
