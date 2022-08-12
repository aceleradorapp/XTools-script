//Client Script
// Client ID: 1
// Client secret: M7vsXadZSuzOKayHxQ5x4XjThQAKimn6FFvO01K9
// const { net } = require('electron');
const path = require('path');
const {dataBase} = require('../services/db');



class Service {
	
	constructor(){
	          
    }    

    create(){

        var body = {
            grant_type : 'password',
            client_id : 1,
            client_secret : 'M7vsXadZSuzOKayHxQ5x4XjThQAKimn6FFvO01K9',
            username : 'andryele@gmail.com',
            password : '12345678',
        };

       

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        

        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            console.log(this.responseText);
        }
        });

        xhr.open("POST", "https://www.aceleradora.app.br/oauth/token");
        xhr.setRequestHeader("body", JSON.stringify(body));

        xhr.send();
                    
    }         
}

module.exports = new Service;