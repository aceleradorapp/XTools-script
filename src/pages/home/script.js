const VideoControl = require('../../components/VideoControl');
const Legends = require('../../components/Legends');
const Service = require('../../services/Service');
const { ipcRenderer, net  } = require('electron');

const titleElement = document.getElementById('title');
const contentVideoElement = document.getElementById('contentVideo');
const contentLogoElement = document.getElementById('contentLogo');
const videoElement = document.getElementById('video');
const btnLogarElement = document.getElementById('btnLogar');



var file = null;
var update = null;
var videoControl = new VideoControl(videoElement);
var legends = new Legends(videoControl);

btnLogarElement.onclick = ()=>{
    Service.create();
   // ipcRenderer.send('send-request', {e:10});    
};

legends.addEventLegendSelected((e)=>{
    ipcRenderer.send('legend-selected', e);
});

ipcRenderer.on('set-file', (event, data)=>{
    file = data;
    legends.loadData(file.data);
    update = data.update?'':'*';     

    titleElement.innerHTML = ' Xtool Script | ' + file.name + update;
    loadVideo(file.urlVideo);
    removeLogin();   
        
});

ipcRenderer.on('set-position-legend',(event, data)=>{
    legends.setPointer(data.idLegend);
    console.log(data.idLegend);
});

function removeLogin(){
    contentVideoElement.classList.remove('hide');
    contentLogoElement.classList.add('hide');
}

function loadVideo(url){    
    videoControl.load(url);
    videoControl.eventsReturn((e)=>{
        if(e.typeEvent== 'video-loaded'){
            legends.start();
        }        
    });
}

