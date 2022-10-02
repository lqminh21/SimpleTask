const connection = require('../../ConnectDB/connectDB')
const jwt = require('jsonwebtoken')
const QueryDB = require('../AuthenticationModel/queryDB')
const knex = require('../../ConnectDB/ConnectDBKnex')

module.exports = {

    postRegister: async (req,res) => {
        try{

            let result = await QueryDB.queryRegister(req, res)

            if(result)  res.send("Register succeed")

        }catch(err) { throw err }
    },

    postLogin: async (req,res) => {
        try {
            let { username, password } = req.body

            let result = await knex('Accounts')
                                    .select('*')    
                                    .where({username, password})
                                    .catch(err => {
                                        res.status(401).send({message: 'Login fail'})
                                        throw err
                                    })
            
            let role = req.role === 1 ? "admin" : "user"

            const accessToken = jwt.sign(({ username, password}),'secret')

            await knex('Accounts')
                        .update({accessToken})
                        .where({username, password})
                        .catch(err => {
                            res.status(401).send({message: 'Login fail'})
                            throw err
                        })

            res.status(200).send({accessToken, role, resUsername: username})
            
        }catch(err){
            res.status(401).send({message: 'Login fail'})
            throw err
        }
        // try{

        //     let account = await QueryDB.queryLogin(req, res)

        //     let username = account[0].username
        //     let password = account[0].password

        //     let role = req.role === 1 ? "admin" : "user"

        //     const accessToken = jwt.sign(({ username, password}),'secret')

        //     let sqlUpdateToken = `UPDATE bookManagement_schema.Accounts SET accessToken = '${accessToken}'   
        //                           WHERE username = '${username}' AND password = '${password}'`

        //     connection.query(sqlUpdateToken,(err, result) => {
        //         if(err) throw err
        //         res.json({accessToken, role, username})
        //     })

        // }catch(err){ throw err } 
    },

    postLogout: async (req, res) => {
        try{
            let result = await QueryDB.queryLogout(req, res)
            if(result)  res.sendStatus(200)
        }catch(err) { throw err }
    }
}
