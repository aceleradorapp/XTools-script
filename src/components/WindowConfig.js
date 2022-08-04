const path = require('path');

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
    icon: path.join(__dirname, '../assets/image/icons/Xtools-ico-script.png'), 
    darkTheme: true
}

var configmanuScript = {
    width: 1200,
    height:800,  
    autoHideMenuBar: true,   
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        nodeIntegrationInWorker: true
    }, 
    backgroundColor: null,        
    frame: true,
    show: false,
    icon: path.join(__dirname, '../assets/image/icons/Xtools-ico-script.png'),
    darkTheme: true
}

module.exports = {
    configHome,
    configmanuScript
}