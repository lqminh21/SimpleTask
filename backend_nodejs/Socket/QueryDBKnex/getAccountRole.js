const knex = require('../../ConnectDB/ConnectDBKnex')


const getAccountRole = async (username) => {
  
    let result = await knex('Accounts')
                          .select('Roles.roleName', 'Accounts.username')
                          .innerJoin('Roles','Roles.id','Accounts.roleId')
                          .where('Accounts.username','=',username)

    return result[0].roleName
}

module.exports = getAccountRole