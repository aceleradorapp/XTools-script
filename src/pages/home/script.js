const VideoControl = require('../../components/VideoControl');
const { ipcRenderer  } = require('electron');

const titleElement = document.getElementById('title');
const contentVideoElement = document.getElementById('contentVideo');
const contentLogoElement = document.getElementById('contentLogo');
const videoElement = document.getElementById('video');

var file = null;
var update = null;
var videoControl = new VideoControl(videoElement);

ipcRenderer.on('set-file', (event, data)=>{
    file = data;
    update = data.update?'':'*';     

    titleElement.innerHTML = ' Xtool Script | ' + file.name + update;
    loadVideo(file.urlVideo);
    removeLogin();    
});

function removeLogin(){
    contentVideoElement.classList.remove('hide');
    contentLogoElement.classList.add('hide');
}

function loadVideo(url){    
    videoControl.load(url);
    videoControl.eventsReturn((e)=>{
        console.log(e);
    });
}