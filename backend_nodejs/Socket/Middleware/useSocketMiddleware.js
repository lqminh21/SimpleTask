
const CONFIG = require('../../EnvironmentVariables/config.json')

const knex = require('../../ConnectDB/ConnectDBKnex') 
const jwt = require('jsonwebtoken')

const verifyAccount = require('../QueryDBKnex/verifyAccount')

const verifyTokenMid = async (socket, next) => {

    let token = socket.handshake.auth.token

    jwt.verify(token, CONFIG.TOKEN_KEY.SECRET_KEY, async (err, account) => {
        try{
            if(err) next(new Error('Account invalid'))
            socket.account = account
            next()
        }catch(err){
            next(new Error('Account invalid'))
        }
    })

}

const verifyAccountMid = async (socket, next) => {
    let account = socket.account
    try{
        let valid = await verifyAccount(account)
        if(valid)   next()
        else    next(new Error('Account invalid'))
    }catch(err){
        next(new Error('Account invalid'))
    }

}

const useSocketMiddleware = (notifyNamespace) => {
    notifyNamespace.use(verifyTokenMid)
    notifyNamespace.use(verifyAccountMid)
}

module.exports = useSocketMiddleware