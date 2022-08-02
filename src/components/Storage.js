/* REFERENCIA PATH
const notes = '/users/joe/notes.txt';

path.dirname(notes); // /users/joe
path.basename(notes); // notes.txt
path.extname(notes); // .txt
*/

const { app, dialog } = require('electron');
const fs = require('fs');
const path = require('path');


var file = {
    type:'novo',
    name:'novo-arquivo.scp',
    data:null,
    saved: false,
    update:true,
    path: app.getAppPath('documents')+'/novo-arquivo.scp',
    urlVideo:null,
    pathVideo:null,
    nameVideo:null
}

function newFile(){
    var fileNew = {
        type:'novo',
        name:'novo-arquivo.scp',
        data:null,
        saved: false,
        update:true,
        path: app.getAppPath('documents')+'/novo-arquivo.scp',
        urlVideo:null,
        pathVideo:null,
        nameVideo:null
    }

    file = fileNew;
}

async function openFile(){    

    let options = {
        defaultPath: file.path, 
        filters: [
            { name: "scp", extensions: ["scp"] }
        ],
    }    

    let dialogFile = await dialog.showOpenDialog(options);

    if(dialogFile.canceled == true){
        return;
    }    
          
    openFileData(dialogFile);

    return file;
}

function openFileData(dialogFile){
    
    let data = JSON.parse(readFile(dialogFile.filePaths[0]));          
   
    file.type = 'abrir';
    file.name = path.basename(dialogFile.filePaths[0]),
    file.data = data.data;
    file.saved =  true;
    file.update = true;
    file.path =  dialogFile.filePaths[0];
    file.urlVideo = path.dirname(dialogFile.filePaths[0]) +'\\'+ data.nameVideo;
    file.pathVideo = data.pathVideo;
    file.nameVideo = data.nameVideo;
}

function readFile(filePath){ 
    try {
        return fs.readFileSync(filePath, 'utf8')
    } catch (error) {
        console.log(error);
        return '';
    }
}

module.exports = {
    file,
    openFile
}
