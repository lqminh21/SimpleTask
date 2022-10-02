
const knex = require('../../ConnectDB/ConnectDBKnex')

module.exports = {

    getUserAccount: async (req, res) => {
        try{
            let results = await knex('Accounts').select('id', 'username', 'password', 'email').where({roleId: 2})
            res.status(200).send(results)
        }catch(err){
            throw err
        }
    },

    postAdd: async (req,res)=>{
        try{

            let result = await knex('Accounts').insert({
                username: req.body.username, 
                password: req.body.password,
                email: req.body.email,
                roleId: 2
            })
            if(result) res.status(200).send({mesage: "Create successfully !"})

        }catch(err){
            res.send(err)
        }
    },

    delete: async (req,res)=>{
        try{

            let result = await knex('Accounts')
                                    .where({id: req.params.id})
                                    .del()
                                    .catch(err => {
                                        res.send({isErr: true, message: 'Delete fail !'})
                                        throw err
                                    })
            if(result) res.status(200).send({isErr: false ,mesage: "Delete successfully !"})

        }catch(err){
            res.send({isErr: true, message: 'Delete fail !'})
        }
    },

    putUpdate: async (req,res)=>{
        try{
            
            let result = await knex('Accounts').where({id: req.params.id}).update({
                username: req.body.username, 
                password: req.body.password,
                email: req.body.email,
            })
            if(result) res.status(200).send({mesage: "Update successfully !"})
            
        }catch(err){
            throw err
        }
    }
}












// const connection = require('../../ConnectDB/connectDB')
// const jwt = require('jsonwebtoken')
// const QueryUserAccountsDB = require('../UserAccountsModal/queryUserAccountsDB')

// module.exports = {

//     getUserAccount: async (req, res) => {
//         try{
//             let result = await QueryUserAccountsDB.queryGetUserAccounts(req, res)
//             res.status(200).send(result)
//         }catch(err){
//             throw err
//         }
//     },

//     postAdd: async (req,res)=>{
//         try{

//             let result = await QueryUserAccountsDB.queryAdd(req, res)
//             if(result)  res.sendStatus(200)

//         }catch(err){
//             res.send(err)
//         }
//     },

//     delete: async (req,res)=>{
//         try{

//             let result = await QueryUserAccountsDB.queryDelete(req, res)
//             if(result)  res.sendStatus(200)

//         }catch(err){
//             res.send(err)
//         }
//     },

//     putUpdate: async (req,res)=>{
//         try{
            
//             let result = await QueryUserAccountsDB.queryUpdate(req, res)
//             if(result) res.sendStatus(200)
            
//         }catch(err){
//             res.send(err)
//         }
//     }
// }
