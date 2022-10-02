const connection = require('../../ConnectDB/connectDB')

module.exports = {

    queryRegister: (req, res) => (
        new Promise((resolve, reject) => {
            let username = req.body.username
            let password = req.body.password
            let email = req.body.email

            let sqlWhere = `SELECT * FROM bookManagement_schema.Accounts WHERE username = ? OR email = ?`
            connection.query(sqlWhere,[username,email],(err,results) => {
                if(results.length){
                    if(results.length === 2 || (results[0].username === username && results[0].email === email))    
                        res.send("Username and Email are exist")
                    else{
                        if(results[0].username === username) res.send("Username is exist")
                        else   res.send("Email is exist")
                    }
                }
                else{
                    let sqlInsert = "INSERT INTO bookManagement_schema.Accounts SET ?"
                    connection.query(sqlInsert,{username,password,email},(err,results)=>{
                        if(err) reject(err)
                        resolve(results)
                        
                    })
                }
            })
        })
    ),

    queryLogin: (req, res) => (
        new Promise((resolve,reject) => {

            let username = req.body.username
            let password = req.body.password    
        
            let sql = `SELECT * FROM bookManagement_schema.Accounts WHERE username = ? AND password = ?`
            connection.query(sql,[username,password],(err, results) => {
                if(err) reject(err)
                else if(results.length > 0) resolve(results)
                else res.send({message: "Account or password isn't correct"})
            })
        })
    ),

    queryLogout: (req, res) => (
        new Promise((resolve, reject) => {
            let sql = `UPDATE bookManagement_schema.Accounts SET accessToken = "" WHERE accessToken = "${req.body.token}" `
            connection.query(sql,(err, results) => {
                if(err) reject(err)
                resolve(results)
            })
        })
    ),

    queryGetUserAccounts: (req, res) => (
        new Promise((resolve, reject) => {
            let sql = "SELECT id, username, password, email FROM bookManagement_schema.Accounts WHERE roleId = '2'"
            connection.query(sql,(err, results) => {
                if(err) reject(err)
                resolve(results)
            })
        })
    )
}