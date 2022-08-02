const { ipcRenderer  } = require('electron');

const titleElement = document.getElementById('title');
const containerFramesElement = document.getElementById('containerFrames');
const totalFramesElement = document.getElementById('totalFrames');
const contentFrameElement = document.getElementById('contentFrame');

var file = null;
var update = null;

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
}

function createTagsFrames(data){    
    var tag = '';
    data.info == null? data.info = '': data.info;

    
    tag +='<div class="frame" data-id-legend = "'+data.id+'">';
    tag +='     <div class="buttons-config">';
    tag +='         <div class="btn-config"><i class="fa-solid fa-pen-to-square"></i></div>';
    tag +='         <div class="btn-config"><i class="fa-solid fa-share-from-square"></i></div>';
    tag +='         <div class="btn-config"><i class="fa-solid fa-shuffle"></i></div>';
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
    var frames = document.getElementsByClassName('frame');
    var elementSelected = null;

    for(var i=0; i < frames.length; i++){
        var element = frames[i];
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

