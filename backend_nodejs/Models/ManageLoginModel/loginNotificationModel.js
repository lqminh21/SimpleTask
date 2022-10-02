
module.exports = {
    postLogin: (io) => {
        io.on('connection', (socket) => {
            console.log('User connect')
            console.log(socket)
            socket.on('disconnect', ()=> {
                console.log(('User disconnect'))
            })
        })
    }
}

