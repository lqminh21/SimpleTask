
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server, {
  cors: {
    origin: '*',
    credentials: true
  }
})

const path = require('path')
const fs = require('fs')

const cors = require("cors")

const morgan = require('morgan')

const CONFIG = require('./EnvironmentVariables/config.json')

const route = require('./Routes/routes')

const socketNotify = require('./Socket/socketNotify')

const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  node: 'https://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'ZlVtKrD3ihjz5D0sY88h'
  }
})

// client.ping({
//   requestTimeout: 3000, //ms
// },
// (err, res, sta) => {
//   if(err){
//       return console.error(`Error connect:::`, err);
//   }
//   console.log(`isOkay::: connect`);
// }
// )

client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: Infinity,
  // undocumented params are appended to the query string
  hello: "elasticsearch!"
}, function (error) {
  if (error) {
    console.log(error)
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

  app.use(express.urlencoded({
      extended: true
  }))

  app.use(express.json())

  app.use('/',cors())

  //Static file
  app.use(express.static('public'))

  //Using for POST METHOD
  app.use(express.urlencoded({
    extended: true
  }))
  app.use(express.json())

  app.use(cors());

  // let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

  // app.use(morgan('dev', { stream: accessLogStream }))

  app.use(morgan('dev'))

  //Routes
  route(app)


  // useSocketMiddleware(io)
  socketNotify(io)

  server.listen(CONFIG.SERVER.HOST,() => console.log(`Listening at http://localhost:${CONFIG.SERVER.HOST}`))