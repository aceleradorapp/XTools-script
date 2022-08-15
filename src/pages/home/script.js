const VideoControl = require('../../components/VideoControl');
const Legends = require('../../components/Legends');
const NotificationModal = require('../../components/NotificationModal');
const Service = require('../../services/Service');
const { ipcRenderer, net  } = require('electron');
const { message } = require('../../components/Messages');
 
const titleElement = document.getElementById('title');
const contentVideoElement = document.getElementById('contentVideo');
const contentLogoElement = document.getElementById('contentLogo');
const videoElement = document.getElementById('video');
const formLoginElement = document.getElementById('formLogin');
const userActiveElement = document.getElementById('userActive');
const nameUserLogElement = document.getElementById('nameUserLog');
const messageWelcomeElement = document.getElementById('messageWelcome');

const btnLogarElement = document.getElementById('btnLogar');
const btLogoutElement = document.getElementById('btLogout')
const idEmailElement = document.getElementById('idEmail');
const idPassordElement = document.getElementById('idPassord');


var file = null;
var update = null;
var videoControl = new VideoControl(videoElement);
var legends = new Legends(videoControl);

var notificationModal = new NotificationModal('windows-notification');

btnLogarElement.onclick = ()=>{
    let email = idEmailElement.value;
    let password = idPassordElement.value;
    
    Service.autenticationApi(email, password,(data)=>{
        let status = 'ok';

        verifyAuthenticatedUser();

        if(data.result.error){
            status = 'error';
            AuthorizationError(data.result);
        }        
    });   
};

btLogoutElement.onclick = ()=>{
    Service.logoutUser((result)=>{
        console.log(result);
        verifyAuthenticatedUser();
    });
};

legends.addEventLegendSelected((e)=>{
    ipcRenderer.send('legend-selected', e);
});

ipcRenderer.on('init-show',(event, data)=>{
    
   verifyAuthenticatedUser();
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

function verifyAuthenticatedUser(){

    Service.userAuthenticated((data)=>{
        if(data.name){
            nameUserLogElement.innerText  = data.name;
            messageWelcomeElement.innerText = message.welcome();
            userAutenticate('ok');
        }else{
            userAutenticate('error')
        }
        
    });
}

function userAutenticate(result){
    let status = 'ok';

    if(result=='error'){
        status = 'error'
        formLoginElement.classList.remove('hide');
        userActiveElement.classList.add('hide');
    }else{
        formLoginElement.classList.add('hide');
        userActiveElement.classList.remove('hide');        
    }

    ipcRenderer.send('authenticated', {status:status});
}

function removeLogin(){
    contentVideoElement.classList.remove('hide');
    contentLogoElement.classList.add('hide');
}

function AuthorizationError(error){
    notificationModal.show('Atenção', 'Usuário ou senha incorreto.',(e)=>{
        console.log(e);
    },'OK','cancelar',true, false,'?');
}

function loadVideo(url){    
    videoControl.load(url);
    videoControl.eventsReturn((e)=>{
        if(e.typeEvent== 'video-loaded'){
            legends.start();
        }        
    });
}

