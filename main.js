const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Create the browser window.
 
 

let win = new BrowserWindow({ width: 800, height: 800, webPreferences: {
    nodeIntegration: true,	
    preload: __dirname + '/preload.js'
    }
	})
win.loadFile('public/index.html');
win.webContents.openDevTools()

//let contents = win.webContents.getAllWebContents();
//console.log(contents)
}

app.on('ready', createWindow)