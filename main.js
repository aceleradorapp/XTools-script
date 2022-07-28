const { app, dialog } = require('electron');
const WindowNow = require('./src/components/WindowNow');
// const fs = require('fs');
// const path = require('path');
const { configHome } = require('./src/components/WindowConfig');
const { menu } = require('./src/components/MenuMaster');
var { file, newFile, openFile } = require('./src/components/Storage');

var windowNow = new WindowNow('src/pages/','dark');
var myhome = null;

//inicia todo o sistema
app.whenReady().then(homeWindow.bind(this));

/**
 * Cria menu princial do aplicativo e 
 * recebe os eventos de clique com os dados menu selecionado
 */
menu.create((action)=>{
    if(action == 'novo'){
        createNewFile();
    }else if(action == 'abrir'){
        openFileHandler();
    }
});
menu.block('all', false);
menu.block('Abrir', true);


/**
 * Cria a janela principal do aplicativo,
 * as configurações da janela está no aquivo WindowConfig
 */
function homeWindow(){
    
    myhome = windowNow.create(configHome, 'home',(e)=>{        
        e.show();                   
    }); 

    myhome.on('closed', ()=>{        
        myhome = null;
    });

    
}

/********************************************************* */

function createNewFile(){
    myhome.webContents.send('set-file',file);   
}

async function openFileHandler(){        
    await openFile()
    myhome.webContents.send('set-file', file);
}

