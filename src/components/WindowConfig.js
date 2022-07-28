
var configHome = {
    width: 1200,
    height:800,     
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        nodeIntegrationInWorker: true
    }, 
    backgroundColor: null,        
    frame: true,
    show: false,
    icon: __dirname+'/src/assets/image/icons/Xtools-ico-nano.png',
    darkTheme: true
}

module.exports = {
    configHome
}