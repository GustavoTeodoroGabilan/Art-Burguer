const { app, BrowserWindow } = require("electron");
const {conectar, desconectar} = require ('./database')
const path = require("node:path");

let win
const mainWindow = () => {
  win = new BrowserWindow({
    width: 500,
    height: 900,
    resizable: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration:true,
      contextIsolation:false,
    },
  });

  win.loadFile(`${__dirname}/src/views/index.html`)
};

app.whenReady().then(() => {
  mainWindow(); //criar a janela
  // executa a função para verificar o status de conexão

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
