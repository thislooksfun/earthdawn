import { app, BrowserWindow } from 'electron'

const Config = require('electron-config');
const config = new Config();

let win

function createWindow() {
  let opts = {
    width: 800,
    height: 600,
  };
  Object.assign(opts, config.get('winBounds'))
  win = new BrowserWindow(opts)

  win.loadFile('dist/index.html')

  win.webContents.openDevTools()

  win.on('close', () => {
    config.set('winBounds', win.getBounds())
  })

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})