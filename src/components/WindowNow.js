const {  BrowserWindow, nativeTheme } = require('electron');


class WindowNow {
	
	constructor(urlPages, theme='dark'){
	    this._mainWindow = null;
        this._urlPages = urlPages;
        this._nativeTheme = theme;
        this._funcComplete = null;        
    }    

    create(config, page, functionComplete){

        let conf = config;
        this._funcComplete = functionComplete;

        conf.webPreferences = {
            nodeIntegration: true,
            contextIsolation: false,
            nodeIntegrationInWorker: true
        }

        this._mainWindow = new BrowserWindow( conf ); 

        this._mainWindow.loadFile(this._urlPages+'/'+page+'/index.html');

        this._mainWindow.on('ready-to-show', () => {       
            this._funcComplete(this._mainWindow);               
        });

        nativeTheme.themeSource = this._nativeTheme;

        return this._mainWindow;
    }    
}

module.exports = WindowNow;