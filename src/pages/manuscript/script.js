const { ipcRenderer  } = require('electron');
const {CDEditor} = require("../../components/Editor");

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

var invertTextPosition = 1;
var modeSelectFrame = false;

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

function updateFile(){
    ipcRenderer.send('update-file', file);
}

function sendPositionLegend(id){
    ipcRenderer.send('send-position-legend', {idLegend:id});
}

function drawScript(){
    var tags = '';

    for(var i = 0; i < file.data.length; i++){ 
        tags += createTagsFrames(file.data[i]);
    }

    containerFramesElement.innerHTML = tags;

    
    let btnFrames = document.getElementsByClassName('btn-config-frame');
    for (var index in btnFrames) {
        btnFrames[index].onclick = onclickButtonFrameAction;
    }
}

function createTagsFrames(data){    
    var tag = '';
    data.info == null? data.info = '': data.info;

    var btInvert = '';
    if(data.textOld){
        var btInvert = '<button class="btn-config-frame btn-menu btn-color-frame" data-name="btnFrame" data-type="invert" data-idFrame="'+(data.id-1)+'"><i class="fa-solid fa-arrows-rotate"></i></button>' 
    }
    
    tag +='<div class="frame" data-id-legend = "'+data.id+'">';
    tag +='     <div class="buttons-config">';
    tag +='         <div class="btn-config btn-config-frame" data-name="btnFrame" data-type="edit" data-idFrame="'+(data.id-1)+'"><i class="fa-solid fa-pen-to-square"></i></div>';
    tag +='         <div class="btn-config btn-config-frame" data-name="btnFrame" data-type="send" data-idFrame="'+(data.id-1)+'"><i class="fa-solid fa-message"></i></div>';
    tag +='         <div class="btn-config btn-config-frame hide" data-name="btnFrame" data-type="invert" data-idFrame="'+(data.id-1)+'"><i class="fa-solid fa-shuffle"></i></div>';
    tag +='     </div>';
    tag +='    <div class="number">'+data.id+'.'+btInvert+'</div>';
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
        element.onclick = clickFrameHandler;               

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

function clickFrameHandler(e){
    let idElement = e.target.parentElement.getAttribute("data-id-legend");

    if(modeSelectFrame){
        sendPositionLegend({idLegend:idElement});
    }    
}

function onclickButtonsHandler(e){
    let dataButton = {
        action: e.currentTarget.getAttribute('data-name'),        
    }

    let buttonElement = e.currentTarget;

    if(dataButton.action == 'pointer'){
        modeSelectFrame = !modeSelectFrame;
        if(modeSelectFrame){
            buttonElement.classList.add('btn-selected');
            addClickFrame();
        }else{
            buttonElement.classList.remove('btn-selected');
            removeClickFrame()
        }
    }else if(dataButton.action == 'playAuto'){

    }else if(dataButton.action == 'audioEnable'){

    }   
}

function onclickButtonFrameAction(e){
    let option={
        top:contentFrameElement.scrollTop,
        left:0,
        behavior:'smooth'
    }
    
    let idFrame = parseInt(e.currentTarget.getAttribute('data-idFrame'));
    let type = e.currentTarget.getAttribute('data-type');    

    if(type=='edit'){
        editText(idFrame);
    }else if(type=='send'){
        
    }else if(type=='invert'){
        invertText(idFrame);
    }            

    contentFrameElement.scrollTo(option);     
}

function editText(idFrame){
    var editor = new CDEditor('editBox',file.data[idFrame].text);
    const btSalveElement = document.getElementById('btSalve');
    const btCancelElement = document.getElementById('btCancel');
    
    btSalveElement.onclick = ()=>{
        var text = editor.save();
        file.data[idFrame].textOld = file.data[idFrame].text;
        file.data[idFrame].text = text;

        drawScript(); 
        selectLegends(file.data[idFrame]);  

        updateFile();
    }

    btCancelElement.onclick = ()=>{
        editor.cancel();
        editor = null;
    }
}

function invertText(idFrame){
    if(!file.data[idFrame].textOld){
        return;
    }

    if(invertTextPosition == 1){
        invertTextPosition = 2
        file.data[idFrame].textOldTemp = file.data[idFrame].text;
        file.data[idFrame].text = file.data[idFrame].textOld;
    }else{
        invertTextPosition = 1
        file.data[idFrame].text = file.data[idFrame].textOldTemp;
        file.data[idFrame].textOldTemp = null;
    }

    drawScript(); 
    selectLegends(file.data[idFrame]);
}

function addClickFrame(){
    framesElements = document.getElementsByClassName('frame');

    for(var i=0; i < framesElements.length; i++){
        var element = framesElements[i];
        element.classList.add('framePoionter');     
    }
}

function removeClickFrame(){
    framesElements = document.getElementsByClassName('frame');

    for(var i=0; i < framesElements.length; i++){
        var element = framesElements[i];
        element.classList.add('framePoionter');     
    }
}

