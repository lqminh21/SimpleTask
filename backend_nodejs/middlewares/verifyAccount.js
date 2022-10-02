const knex = require('../ConnectDB/ConnectDBKnex')

const verifyAccount = async (req, res, next) => {
    
    try{
        let username = req.account.username
        let password = req.account.password
    
        let results = await knex('Accounts').select('username', 'password').where({
            username: username,
            password: password
        })
        if(results.length > 0)  next()
        else res.status(401).send({message: "Account Invalid !"})
    }catch(err){
        throw err
    }
}

module.exports = verifyAccount





// const connection = require('../ConnectDB/connectDB')

// const verifyAccount = (req, res, next) => {
    
//     let username = req.account.username
//     let password = req.account.password

//     let sql = `SELECT * FROM bookManagement_schema.Accounts WHERE username = ? AND password = ?`
//     connection.query(sql,[username,password],(err, results) => {
//         if(err) throw err
//         if(results.length > 0) next()
//         else res.status(401).send("Account Invalid !")
//     })
// }

// module.exports = verifyAccount