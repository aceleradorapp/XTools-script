const { ipcRenderer  } = require('electron');

const titleElement = document.getElementById('title');
const containerFramesElement = document.getElementById('containerFrames');
const totalFramesElement = document.getElementById('totalFrames');
const contentFrameElement = document.getElementById('contentFrame');
const btnPointerElement = document.getElementById('btnPointer');
const btnPlayAutoElement = document.getElementById('btnPlayAuto');
const btnAudioEnableElement = document.getElementById('btnAudioEnable');

var file = null;
var update = null;
var framesElements = null;

btnPointerElement.onclick = onclickButtonsHandler;
btnPlayAutoElement.onclick = onclickButtonsHandler;
btnAudioEnableElement.onclick = onclickButtonsHandler;



ipcRenderer.on('set-file', (event, data)=>{
    file = data;
    update = data.update?'':'*';     

    titleElement.innerHTML = ' Roteiro | ' + file.name + update; 

    
    totalFramesElement.innerHTML = 'Total frames: '+file.data.length; 
    
    drawScript();  
    
    selectLegends({id:1});
});

ipcRenderer.on('legend-selected', (event, data)=>{
    selectLegends(data);
});

function drawScript(){
    var tags = '';

    for(var i = 0; i < file.data.length; i++){ 
        tags += createTagsFrames(file.data[i]);
    }

    containerFramesElement.innerHTML = tags;

    
    let btnFrames = document.getElementsByClassName('btn-config');
    for (var index in btnFrames) {
        btnFrames[index].onclick = onclickButtonFrameAction;
    }
}

function createTagsFrames(data){    
    var tag = '';
    data.info == null? data.info = '': data.info;

    
    tag +='<div class="frame" data-id-legend = "'+data.id+'">';
    tag +='     <div class="buttons-config">';
    tag +='         <div class="btn-config" data-name="btnFrame" data-type="edit" data-idFrame="'+(data.id-1)+'"><i class="fa-solid fa-pen-to-square"></i></div>';
    tag +='         <div class="btn-config" data-name="btnFrame" data-type="send" data-idFrame="'+(data.id-1)+'"><i class="fa-solid fa-share-from-square"></i></div>';
    tag +='         <div class="btn-config" data-name="btnFrame" data-type="invert" data-idFrame="'+(data.id-1)+'"><i class="fa-solid fa-shuffle"></i></div>';
    tag +='     </div>';
    tag +='    <div class="number">'+data.id+'.</div>';
    tag +='    <div class="text">';
    tag +=          data.text;
    tag +='    </div>';
    tag +='    <div class="note">';
    tag +=          data.info;
    tag +='    </div>';
    tag +='</div>';
    
    return tag;
}

function selectLegends(data){
    var elementSelected = null;
    framesElements = document.getElementsByClassName('frame');

    for(var i=0; i < framesElements.length; i++){
        var element = framesElements[i];
        element.classList.remove('frame-selected');                

        if(element.getAttribute("data-id-legend") == data.id){
            element.classList.add('frame-selected');
            elementSelected = element;
        }      
    } 
    
    var center = contentFrameElement.clientHeight/2;

    if(elementSelected.getBoundingClientRect().y > center){
        var value = elementSelected.getBoundingClientRect().y - center;
        let option={
            top:contentFrameElement.scrollTop + value,
            left:0,
            behavior:'smooth'
        }
        contentFrameElement.scrollTo(option);
                
    }else if (elementSelected.getBoundingClientRect().y < center){
        var value = center - elementSelected.getBoundingClientRect().y;
        let option={
            top:contentFrameElement.scrollTop - value,
            left:0,
            behavior:'smooth'
        }
        contentFrameElement.scrollTo(option);
    }
}

function onclickButtonsHandler(e){
    let dataButton = {
        action: e.target.getAttribute('data-name'),        
    }

    if(dataButton.action == 'pointer'){

    }else if(dataButton.action == 'playAuto'){

    }else if(dataButton.action == 'audioEnable'){

    }   
}

function onclickButtonFrameAction(e){
    let idFrame = e.currentTarget.getAttribute('data-idFrame');
    let type = e.currentTarget.getAttribute('data-type');
    let frameElent = framesElements[idFrame];

    console.log(type);
}

