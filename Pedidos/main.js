const { app, BrowserWindow, ipcMain } = require("electron/main");
const path = require("node:path");

// importar o módulo do banco de dados
const { conectar, desconectar } = require("./database");
//importar o Schema (models)
const Pedidos = require(`${__dirname}/src/Models/Pedidos`);

let win;
const mainWindow = () => {
  win = new BrowserWindow({
    width: 500,
    height: 900,
    
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile(`${__dirname}/src/views/index.html`);
  win.setFullScreen(true)
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

app.on("before-quit", async () => {
  await desconectar();
});

ipcMain.on("send-message", (event, message) => {
  console.log("<<<", message);
  statusConexao();
});

const statusConexao = async () => {
  try {
    await conectar();
    //enviar uma mensagem para a janela (renderer.js) informando o status da conexão e os erros caso ocorram
    win.webContents.send("db-status", "Banco de dados conectado");
  } catch (error) {
    win.webContents.send(`db-status', "Erro de conexão: ${error.message}`);
  }
};

ipcMain.on('get-pedidos', async (event, args) => {
  const pedidosPendentes = await Pedidos.find()
  //console.log(pedidosPendentes);
  event.reply('get-pedidos-feitos', JSON.stringify(pedidosPendentes))
})

//ipcMain.on("buscar-nome", async (event, args) => {
  //let dadoCliente = new Pedidos.find({
    //nome: new RegExp(args, "i")
  //})
 // ipcMain.send("dado-cliente", JSON.stringify(dadoCliente))
//})
 
ipcMain.on("id-cliente", async (event, idCliente) => {
  console.log(idCliente);

  try {
    const pedidoAtualizado = await Pedidos.findByIdAndUpdate(
      idCliente,
      { 
        status: 'pronto' 
      },
      { new: true }
    );

    if (pedidoAtualizado) {
      console.log('Pedido atualizado:', pedidoAtualizado);
      //event.reply("cliente-editado", JSON.stringify(pedidoAtualizado));
    } else {
      console.log('Pedido não encontrado');
      //event.reply("cliente-editado", JSON.stringify({ error: 'Pedido não encontrado' }));
    }
  } catch (error) {
    console.error('Erro ao atualizar pedido:', error);
    //event.reply("cliente-editado", JSON.stringify({ error: error.message }));
  }
})