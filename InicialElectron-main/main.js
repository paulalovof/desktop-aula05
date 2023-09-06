const { app, 
  BrowserWindow,
  Notification
 } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

function novaNotification(){
  if(!Notification.isSupported()){
    console.log("Notificações não são suportadas neste ambiente.");
    return;
  }

  const novaNotification = new Notification({
    title: "Aplicativo aberto",
    subtitle: "Subtitulo",
    body: "O aplicativo foi aberto com sucesso",
    silent: true,
    timeoutType: "default",
  });

  console.log("Exibindo notificação");

  novaNotification.show();
}
