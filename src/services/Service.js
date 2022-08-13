//Client Script
// Client ID: 1
// Client secret: M7vsXadZSuzOKayHxQ5x4XjThQAKimn6FFvO01K9
// const { net } = require('electron');
const path = require('path');
const {dataBase} = require('../services/db');

const clientId = '1';
const clientSecret = 'M7vsXadZSuzOKayHxQ5x4XjThQAKimn6FFvO01K9';
const access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNDg2MmExODUxNDIxNjMxNGJjZWExMzNkMTI0OGY2OTVhNDM1OTZhZmEzZmM5NDViNjRkNGI2Y2QxYmUwNzkxZTM2Y2IxZDI3M2Y0NmY3NzciLCJpYXQiOjE2NjAzMzg2MzIuNjYyMTY4LCJuYmYiOjE2NjAzMzg2MzIuNjYyMTcyLCJleHAiOjE2OTE4NzQ2MzIuNjA1MjgsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.weKU0M5C3VOIJDefWnwZFoCCyddYrcpJj7gIy7PzXE_Gy2pimtpsEEZXLRRGaR_nyPBIUno2c07VAEE7IHm7yx0WB41yC1a2uVr7A0j6iYlw9tUyjkg0wWlSsYPtLKj1Hr_JMw7jTCMlYOXQWeN-MOKuVv0eSlaogBVY9zJ3LtX-iTFua4pSZkmx-gxLFGyh68CpUShQ0jkPh51etOJ5koTfC3Hvaq5VQcnWkj3z_zEoI2dOOsQn-BpJEO-sShHOPcjjkMlpq2qo38Wm8XVfZBsuC8MNq7gFPp7EuLBjW3tQfB4XvSqn2pHkWQ6T_6tOnWVKLX6quhFSaoGUUAH6mUL5uf79ukVIpMWO9jikid_j_QkfrlrKCdm6jHJk5MUj02lgTZx-Bs_9jDXyr3oDudGhT7QmJRxW_ubAGPFkMHydQw_E6GcoZ_Z-P3OZHGREok3zXT2i5ewvoUzh346h8KNjMxP0E0q5by6l60wHv9D_YT9joQQ2PwRWbSjtO2i4qEj-ZsyYxF-fYVEQuru6VjAUGY6arEXF8w4XVLuwTCGI_vBeVhp5AMo1nI37xp855BbjQt0AlW2Dj81u3AcQX415fiRXM2iZMep-c2mySNV-lnQgYChUX0WP_MyXgmZ5PDz95xGBCv4gWYoAew1iXg91tNZ5Ywr18LwiY9hAYus';
const token_type = null;

class Service {
	
	constructor(){
	          
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
                access_token = result.token;
                token_type = result.token_type;

                func({result:result})
            }
    }    
    
    userAuthenticated(func){        

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
            func(result);
        }

        
    }
}

module.exports = new Service;