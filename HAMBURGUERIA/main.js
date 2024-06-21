const { app, BrowserWindow, ipcMain } = require("electron/main");
const path = require("node:path");

// importar o módulo do banco de dados
const { conectar, desconectar } = require("./database");
//importar o Schema (models)
const Lanches = require(`${__dirname}/src/Models/Lanches`);
const Pedidos = require(`${__dirname}/src/Models/Pedido`)

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

//-------------------------------------------------------------------------------------------------------
ipcMain.on("get-lanches", async (event, args) => {
  const opcoesLanches = await Lanches.find({categoria: new RegExp("Combos", "i")}); //.find faz a busca e como o "select no mysql"
  //passo 3(slide) enviar ao renderer(view) as tarefas pendentes
  event.reply("get-options", JSON.stringify(opcoesLanches)); //JSON.stringify converte para o JSON
});

ipcMain.on("filtrar-lanches", async(event, categoria) => {
  try {
    const lancheDados = await Lanches.find({
      categoria: new RegExp(categoria, "i"), //i ignore(letras maiuscula/minuscula)
    });
    console.log(lancheDados);
    event.reply("lanche-filtrado", JSON.stringify(lancheDados));
  } catch (error) {
    console.log(error);
  }
})

ipcMain.on("buscar-lanche", async (event, args) => {
  try {
    const lancheDados = await Lanches.find({
      nome: new RegExp(args, "i"), //i ignore(letras maiuscula/minuscula)
    });
    console.log("--------------------------------------")
    console.log(lancheDados)
    event.reply("lanche-data", JSON.stringify(lancheDados));
  } catch (error) {
    console.log(error);
  }
});

//--------------------------------------ADD PEDIDO------------------------------------
ipcMain.on('novo-pedido', async (event, args) => {
})

ipcMain.on('get-dados-lanche', async(event, args) => {
  const lancheEscolhido = await Lanches.find({
    nome: new RegExp(args, "i")
  })
  console.log("-----------------------------------------------")
  console.log(lancheEscolhido)
  event.reply("dadosLanche-selecionado", JSON.stringify(lancheEscolhido))
})

ipcMain.on("envia-array-pedidos", async(event, args) => {
  event.reply("recebe-array-pedidos", args)
})

ipcMain.on("recarregar", () => {
  win.reload()
})


ipcMain.on("nome-cliente", async (event, args) =>{
  let novoCliente = new Pedidos(args)
  await novoCliente.save()

})