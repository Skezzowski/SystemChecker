const path = require("path");

const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const si = require("systeminformation");

function createWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    frame: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL(
    app.isPackaged
      ? `file://${path.join(__dirname, "../build/index.html")}`
      : "http://localhost:3000"
  );


  if (!app.isPackaged) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
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
