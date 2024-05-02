const { app, BrowserWindow } = require("electron");
const {conectar, desconectar} = require ('./database')
const path = require("node:path");

let win
const mainWindow = () => {
  win = new BrowserWindow({
    width: 567,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
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
