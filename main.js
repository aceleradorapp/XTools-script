const WindowNow = require('./src/components/WindowNow');
const Service = require('./src/services/Service');
const { app, ipcMain, net } = require('electron');
const { configHome, configmanuScript } = require('./src/components/WindowConfig');
const { menu } = require('./src/components/MenuMaster');
var { file, openFile } = require('./src/components/Storage');

var windowNow = new WindowNow('src/pages/','light');
var myhome = null;
var myManuScript = null;

//inicia todo o sistema
app.whenReady().then(homeWindow.bind(this));

/**
 * Cria menu princial do aplicativo e 
 * recebe os eventos de clique com os dados menu selecionado
 */
menu.create((action)=>{
    if(action == 'abrir'){
        openFileHandler();
    }else if(action == 'roteiro'){       
        manuscriptWindow();
    }
});

menu.block('all', false);
// menu.block('Abrir', true);
// menu.block('Fechar', true);


/**
 * Cria a janela principal do aplicativo,
 * as configurações da janela está no aquivo WindowConfig
 */
function homeWindow(){
    
    myhome = windowNow.create(configHome, 'home',(e)=>{        
        e.show();  
        e.webContents.send('init-show', {id:1, clientSecret:'dsdsad'})                                
    },true); 

    myhome.on('closed', ()=>{        
        if(myManuScript){
            myManuScript.close();
        }
        myhome = null;
    });
 
}

/**
 * Cria a janela de legendas do aplicativo,
 * as configurações da janela está no aquivo WindowConfig
 */
 function manuscriptWindow(){
   
    myManuScript = windowNow.create(configmanuScript, 'manuscript',(e)=>{        
        e.show();          
        myManuScript.webContents.send('set-file', file);
        menu.block('Roteiro', false);                         
    }, true); 

    myManuScript.on('closed', ()=>{        
        myManuScript = null;
        menu.block('Roteiro', true);
    });
}

/********************************************************* */

async function openFileHandler(){        
    await openFile();    
    myhome.webContents.send('set-file', file);
    menu.block('Roteiro', true);
}

/********************************************************* */

ipcMain.on('legend-selected', (event, data)=>{ 
    if(myManuScript){
        myManuScript.webContents.send('legend-selected',data);
    }             
});

ipcMain.on('update-file', (event, data)=>{
    file = data;    
});

ipcMain.on('send-position-legend', (event, data)=>{
    myhome.webContents.send('set-position-legend',data);       
});

ipcMain.on('authenticated', (event, data)=>{
    if(data.status=='ok'){
        menu.block('Abrir', true);
        menu.block('Logout', true);
        menu.block('Fechar', true);
    }    
});

