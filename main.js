const { app, BrowserWindow } = require('electron');
const createWindow = () => {
  const win = new BrowserWindow({
    width: 730,
    height: 941,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  })

  win.loadFile('./renderer/calendar.html')
}

app.whenReady().then(() => {
  createWindow()
});