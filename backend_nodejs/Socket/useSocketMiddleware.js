

const knex = require('../ConnectDB/ConnectDBKnex')
const connection = require('../ConnectDB/connectDB')
const jwt = require('jsonwebtoken')

const socketMidleware = async (socket, next) => {

    console.log('token: '+socket.handshake.auth.token)
    console.log('username: '+socket.handshake.query.username)

    // const userId = await fetchUserId(socket)

    // console.log(userId, socket.id)
    // const token = socket.handshake.auth.token
    // jwt.verify(token, 'secret', (err, account) => {
    //     if(err) next(new Error('Invalid Account'))
    //     let {username, password} = account
    //     console.log(account)
    // })
    // console.log('host: '+ socket.handshake.headers.host)
    next()
}

const useSocketMiddleware = (io) => {
    io.use(socketMidleware)
}

module.exports = useSocketMiddleware