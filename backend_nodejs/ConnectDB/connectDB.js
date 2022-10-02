
const mysql = require('mysql2')

let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Minh2121.',
    database : 'bookManagement_schema'
})

connection.connect(function(err){
    if(err) throw err
    console.log("Database connected")
})

module.exports = connection