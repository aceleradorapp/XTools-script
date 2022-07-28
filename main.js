const WindowNow = require('./src/components/WindowNow');
const { app, BrowserWindow } = require('electron');
const { configHome } = require('./src/components/WindowConfig');
const { MenuCreate, MenuBlock, menu } = require('./src/components/MenuMaster');


var myhome = null;

//inicia todo o sistema
app.whenReady().then(homeWindow);

/**
 * Cria menu princial do aplicativo e 
 * recebe os eventos de clique com os dados menu selecionado
 */
menu.create((action)=>{
    console.log(action);
});
menu.block('all', true);


/**
 * Cria a janela principal do aplicativo,
 * as configurações da janela está no aquivo WindowConfig
 */
function homeWindow(){
    myhome = new WindowNow('src/pages/','dark').create(configHome, 'home',(e)=>{
        e.show();
    }); 

    myhome.on('closed', ()=>{        
        myhome = null;
    });
}


