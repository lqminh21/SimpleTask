const CONFIG = require('../EnvironmentVariables/config.json')

const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : CONFIG.DATABASE.HOST,
      port : CONFIG.DATABASE.PORT,
      user : CONFIG.DATABASE.USER,
      password : CONFIG.DATABASE.PASSWORD,
      database : CONFIG.DATABASE.DB_NAME
    },
    log: {
        warn(message) {
        },
        error(message) {
        }
      }
  });

module.exports = knex 

// const knex = require('knex')({
//   client: 'mysql2',
//   connection: {
//     host : 'localhost',
//     port : 3306,
//     user : 'root',
//     password : 'Minh2121.',
//     database : 'bookManagement_schema'
//   },