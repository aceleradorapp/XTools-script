const { ipcRenderer  } = require('electron');

const titleElement = document.getElementById('title');
const containerFramesElement = document.getElementById('containerFrames');

var file = null;
var update = null;

ipcRenderer.on('set-file', (event, data)=>{
    file = data;
    update = data.update?'':'*';     

    titleElement.innerHTML = ' Roteiro | ' + file.name + update;  

    drawScript();
});

ipcRenderer.on('legend-selected', (event, data)=>{
    selectLegends(data);
});

function drawScript(){
    var tags = '';

    for(var i = 0; i < file.data.length; i++){ 

        tags += createTagsFrames(file.data[i]);
    }

    // console.log(tags);
    containerFramesElement.innerHTML = tags;
}

function createTagsFrames(data){    
    var tag = '';
    data.info == null? data.info = '': data.info;

    
    tag +='<div class="frame" data-id-legend = "'+data.id+'">';
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

    for(var i=0; i < frames.length; i++){
        var element = frames[i];
        element.classList.remove('frame-selected');

        if(element.getAttribute("data-id-legend") == data.id){
            element.classList.add('frame-selected');
        }
        // console.log(element.getAttribute("data-id-legend"));
    }    
}

