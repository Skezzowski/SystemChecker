const path = require("path");

const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const si = require("systeminformation");

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle("GetCpuBaseData", async () => {
  const cpuBase = await si.cpu();
  const result = {
    manufacturer: cpuBase.manufacturer,
    brand: cpuBase.brand,
    speed: cpuBase.speed,
    physicalCores: cpuBase.physicalCores,
  };

  return result;
});

ipcMain.handle("GetRamBaseData", async () => {
  const result = await si.mem();
  return { total: result.total };
});

ipcMain.handle("GetGPUBaseData", async () => {
  const gpuData = await si.graphics();
  return gpuData;
});

ipcMain.handle("GetChangingData", async () => {
  const cpuTemp = await si.cpuTemperature();
  const cpuLoad = await si.currentLoad();
  const cpuData = {
    temp: cpuTemp.main,
    currentLoad: cpuLoad.currentload,
  };

  const ramDataRaw = await si.mem();
  const ramData = { total: ramDataRaw.total, used: ramDataRaw.used };

  return { ramData: ramData, cpuData: cpuData };
});
