const knex = require('../../ConnectDB/ConnectDBKnex')

const verifyAccount = async (account) => {
    let {username, password} = account
    try{
        let result = await knex('Accounts')
                                .select('username','password')
                                .where({username, password})
        if(result.length > 0) return true
        else return false
    }catch(err){
        throw err
    }

}

module.exports = verifyAccount