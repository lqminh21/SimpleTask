
const knex = require('../ConnectDB/ConnectDBKnex')

const useSocketMiddleware = require('./Middleware/useSocketMiddleware')
const getAccountRole = require('./QueryDBKnex/getAccountRole')


const socketNotify = (io) => {

    const notifyNamespace = io.of('/notify')

    useSocketMiddleware(notifyNamespace)
    
    // io.on('connection', async (socket) => {
    //   console.log('Connected')

    //   socket.on('join room', async (data) => {
    //     let role = await getAccountRole(data.username)
    //     if(role === 'admin') socket.join('admin room')
    //   })

    //   socket.on('login', (data) => {
    //     socket.to('admin room').emit('notifyLogin', data)
    //   })

    //   socket.on('logout', data => {
    //     socket.to('admin room').emit('notifyLogin', data)
    //   })

    //   socket.on('disconnect', ()=> {
    //       console.log(('User disconnect'))
    //     })
    // })

    notifyNamespace.on('connection', async (socket) => {
      console.log('notifyNamespace connected')

      socket.on('join room', async (data) => {

        let {username} = data

        let role = await getAccountRole(username)
        if(role === 'admin'){
          console.log('join room')
          socket.join('admin room')
        }
      })

      socket.on('login', (data) => {
        console.log('login')
        socket.to('admin room').emit('notifyLogin', data)
      })

      socket.on('logout', data => {
        console.log('logout')
        socket.to('admin room').emit('notifyLogin', data)
      })

      socket.on('disconnect', ()=> {
        console.log(('User disconnect'))
      })
    })
}

module.exports = socketNotify
