const sqlite3 = require('sqlite3').verbose();
const path = require('path');

var db = null; 
var urlDataBase = '../db/';

function conect(database){    
    db = new sqlite3.Database(path.join(__dirname, urlDataBase + database));   
    
    _createTables();
}

function _createTables(){
    _createTableClientePassport();
    _createTableUserPassport();
}

async function _createTableClientePassport(){
    return await db.run('CREATE TABLE IF NOT EXISTS client_passport (id INTEGER PRIMARY KEY, client_id INTEGER, client_key TEXT)');
}

async function _createTableUserPassport(){
    return await db.run('CREATE TABLE IF NOT EXISTS user_token (id INTEGER PRIMARY KEY, user_id INTEGER, token TEXT)');
}

function select(query, func){
    db.each(query, func);
    db.close();
}

function insert(query, func){
    db.run(`INSERT INTO user_token(user_id, token) VALUES(?,?)`, [1,'fldsjflasdkjflsdkjfldskafj'], function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
      });

}

async function insertToken(token ,func, user_id=1){
    var exist = null;
    const rows = await db.get('SELECT * FROM user_token WHERE id=1', async (err, row)=>{
        exist = row;
        _createRegistro(user_id);
    });

    function _createRegistro(user_id){
        if(!exist){
            db.run(`INSERT INTO user_token(user_id, token) VALUES(?,?)`, [user_id,token], function(err) {
                if (err) {
                  return console.log(err.message);
                }
                
                func('Insert Success');
              });
        }else{
            db.run('UPDATE user_token SET user_id = ?, token = ? WHERE id = 1',[user_id,token]);
            func('Update Success');
        }
        // return this.lastID
    }    
}

function getTokenUser(func){
    db.get('SELECT * FROM user_token WHERE id=1', (err, row)=>{
        func(row);
    });
}

function removeToken(func){
    db.run('UPDATE user_token SET user_id = ?, token = ? WHERE id = 1',[null,null]);
    func('Logout Success');
}

var dataBase = {
    conect,
    insertToken,
    getTokenUser,
    removeToken
}

module.exports = {
    dataBase
}