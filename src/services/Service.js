const path = require('path');
const {dataBase} = require('../services/db');

const clientId = '1';
const clientSecret = 'M7vsXadZSuzOKayHxQ5x4XjThQAKimn6FFvO01K9';

var access_token = '';
var token_type = null;

class Service {
	
	constructor(){
        dataBase.conect('dbXtools.db');
    }    

    autenticationApi(userName, password,func){  
        
        var urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "password");
        urlencoded.append("username", userName);
        urlencoded.append("password", password);
        urlencoded.append("client_id", clientId);
        urlencoded.append("client_secret", clientSecret);

        var requestOptions = {
            method: 'POST',            
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            body: urlencoded
        };
          
        fetch("https://www.aceleradora.app.br/oauth/token", requestOptions)
            .then(response => response.text())
            .then(result =>   resultRequest(JSON.parse(result)))
            .catch((error) => func({result:JSON.parse(error)}));  
        
            function resultRequest(result){                            

                access_token = result.access_token;
                token_type = result.token_type;

                dataBase.insertToken(result.access_token, (data)=>{
                    func({result:result});
                });
            }
    }    
    
    userAuthenticated(func){   
        dataBase.getTokenUser((row)=>{
            access_token = row.token; 
            
            var requestOptions = {
                async: true,
                crossDomain: true,
                method: 'GET',            
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    "Authorization": "Bearer "+access_token
                },            
            };
              
            fetch("https://www.aceleradora.app.br/api/userAuthenticated", requestOptions)
            .then(response => response.text())
            .then(result =>   resultRequest(JSON.parse(result)))
            .catch((error) => resultRequest(error));  
        
            function resultRequest(result){
                if(result.name=='SyntaxError'){
                    result = {error:'error'};
                }

                dataBase.insertToken(access_token, (data)=>{ }, result.id);

                func(result);
            }
    
        });        
    }

    logoutUser(func){
        dataBase.removeToken((result)=>{
            access_token = '';
            func(result);
        });

        // var requestOptions = {
        //     async: true,
        //     crossDomain: true,
        //     method: 'GET',            
        //     headers: {
        //         'content-type': 'application/x-www-form-urlencoded',
        //         "Authorization": "Bearer "+access_token
        //     },            
        // };
          
        // fetch("https://www.aceleradora.app.br/api/logoutUser", requestOptions)
        // .then(response => response.text())
        // .then(result =>   resultRequest(result))
        // .catch((error) => resultRequest(error));  
    
        // function resultRequest(result){
            
        //     func(result);
        // }
    }
}

module.exports = new Service;