const {  Menu } = require('electron');

var clickMenuHandler;
var menuTemp;

function _menuCreate(){
    menuTemp = Menu.buildFromTemplate(menuObj);
    Menu.setApplicationMenu(menuTemp);
}

function MenuCreate(MenuHandler){
    clickMenuHandler = MenuHandler.bind(this);
    _menuCreate();
}

function MenuBlock(name=null, enabled){
    menuObj.forEach((menuPrincipal,a)=>{

        menuPrincipal.submenu.forEach((item,b)=>{ 
            if(name == 'All' || name == 'all' || name == null){
                menuTemp.getMenuItemById(item.id).enabled = enabled;
            }else if(item.label == name){
                menuTemp.getMenuItemById(item.id).enabled = enabled;
            }
        });
    }); 
}

function setMenuObject(menuObject){
    menuTemp = menuObject;
    _menuCreate();
}


const menuObj = [
                {            
                    label:'Arquivo',
                    submenu:[                        
                        {
                            id:1,
                            label:'Abrir',
                            enabled: true,
                            click(){
                                clickMenuHandler('abrir');
                            }
                        },                        
                        { 
                            type: 'separator' 
                        },
                        {
                            id:2,
                            label:'Exportar legenda',
                            enabled: false,
                            click(){
                                clickMenuHandler('exportar-legenda');
                            }
                        },                        
                        { 
                            type: 'separator' 
                        },
                        {
                            id:3,
                            label:'Compilar dados',
                            enabled: false,
                            click(){
                                clickMenuHandler('compilar-dados');
                            }
                        },
                        { 
                            type: 'separator' 
                        },
                        {
                            id:4,
                            label:'Logout',
                            enabled: false,
                            click(){
                                clickMenuHandler('Logout');
                            }
                        },
                        { 
                            type: 'separator' 
                        },
                        {
                            id:100,
                            label:'Fechar',
                            role:process.platform === 'darwin' ? 'close' : 'quit'
                        }
                    ]
                },
                {                        
                    label:'Ferramentas',            
                    submenu:[
                        {
                            id:11,
                            label:'Controle',
                            enabled: false, 
                            click(){
                                clickMenuHandler('controle');
                            }                 
                        },
                        {
                            id:12,
                            label:'Roteiro',
                            enabled: false, 
                            click(){
                                clickMenuHandler('roteiro');
                            }                                      
                        }
                    ]
                }
];

const menu = {
    create:MenuCreate,
    block:MenuBlock,
    setMenuObject
}

module.exports = {
    menu
}

