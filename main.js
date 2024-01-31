const electron = require('electron');
const{app, BrowserWindow}= electron;
app.disableHardwareAcceleration();


let win ;
app.on('ready',()=>{

    win = new BrowserWindow({
        maxHeight:500,
        maxWidth:453,
        
        webPreferences:{
            nodeIntegration:true,
            contextIsolation:false
        }
    })

    win.loadFile('index.html')

})