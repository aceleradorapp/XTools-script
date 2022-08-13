const VideoControl = require('../../components/VideoControl');
const Legends = require('../../components/Legends');
const Service = require('../../services/Service');
const { ipcRenderer, net  } = require('electron');

const titleElement = document.getElementById('title');
const contentVideoElement = document.getElementById('contentVideo');
const contentLogoElement = document.getElementById('contentLogo');
const videoElement = document.getElementById('video');
const formLoginElement = document.getElementById('formLogin');
const userActiveElement = document.getElementById('userActive');
const nameUserLogElement = document.getElementById('nameUserLog');

const btnLogarElement = document.getElementById('btnLogar');
const idEmailElement = document.getElementById('idEmail');
const idPassordElement = document.getElementById('idPassord');


var file = null;
var update = null;
var videoControl = new VideoControl(videoElement);
var legends = new Legends(videoControl);

btnLogarElement.onclick = ()=>{
    let email = idEmailElement.value;
    let password = idPassordElement.value;

    Service.userAuthenticated((data)=>{
        if(data.name){
            nameUserLogElement.innerText  = data.name;
            userAutenticate('ok');
        }else{
            userAutenticate('error')
        }
        
    });
    
    // Service.autenticationApi(email, password,(data)=>{
    //     let status = 'ok';

    //     if(data.result.error){
    //         status = 'error'
    //         formLoginElement.classList.remove('hide');
    //         userActiveElement.classList.add('hide');
    //     }else{
    //         formLoginElement.classList.add('hide');
    //         userActiveElement.classList.remove('hide');
    //     }

    //     ipcRenderer.send('authenticated', {status:status});
    // });   
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

function userAutenticate(result){
    if(result=='error'){
        status = 'error'
        formLoginElement.classList.remove('hide');
        userActiveElement.classList.add('hide');
    }else{
        formLoginElement.classList.add('hide');
        userActiveElement.classList.remove('hide');
    }
}

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

