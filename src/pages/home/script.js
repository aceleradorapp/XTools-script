const { ipcRenderer  } = require('electron');

const titleElement = document.getElementById('title');
const contentVideoElement = document.getElementById('contentVideo');
const contentLogoElement = document.getElementById('contentLogo');

var file = null;
var update = null;

ipcRenderer.on('set-file', (event, data)=>{
    file = data;
    update = data.update?'':'*';
    
    titleElement.innerHTML = ' Xtool Script | ' + file.name + update;
    removeLogin();    
});

function removeLogin(){
    contentVideoElement.classList.remove('hide');
    contentLogoElement.classList.add('hide');
}