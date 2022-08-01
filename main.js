const WindowNow = require('./src/components/WindowNow');
const { app, ipcMain } = require('electron');
const { configHome, configmanuScript } = require('./src/components/WindowConfig');
const { menu } = require('./src/components/MenuMaster');
var { file, openFile } = require('./src/components/Storage');

var windowNow = new WindowNow('src/pages/','dark');
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
menu.block('Abrir', true);
menu.block('Fechar', true);
menu.block('Roteiro', true);


/**
 * Cria a janela principal do aplicativo,
 * as configurações da janela está no aquivo WindowConfig
 */
function homeWindow(){
    
    myhome = windowNow.create(configHome, 'home',(e)=>{        
        e.show();                   
    }); 

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
    }); 

    myManuScript.on('closed', ()=>{        
        myManuScript = null;
    });

    myManuScript.webContents.send('set-file', file);
 
}

/********************************************************* */

async function openFileHandler(){        
    await openFile();    
    myhome.webContents.send('set-file', file);
}

/********************************************************* */

ipcMain.on('legend-selected', (event, data)=>{ 
    if(myManuScript){
        myManuScript.webContents.send('legend-selected',data);
    }             
});

