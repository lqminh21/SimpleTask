const knex = require('../ConnectDB/ConnectDBKnex')

const roleAuthorization = async (req, res, next) => {
    try{
        username = req.body.username
        let result = await knex('Accounts')
                            .select('Roles.id', 'Accounts.username')
                            .innerJoin('Roles','Roles.id','Accounts.roleId')
                            .where('Accounts.username','=',username)
        if(result.length > 0){
            req.role = result[0].id
            next()
        }
    }catch(err){
        throw err
    }
}

module.exports = roleAuthorization










// const connection = require('../ConnectDB/connectDB')

// function roleAuthorization(req, res, next){
//     let sqlRole = `SELECT Roles.id, Accounts.username
//                    FROM Accounts
//                    INNER JOIN Roles 
//                    ON Roles.id = Accounts.roleId AND Accounts.username = '${req.body.username}'`
//     connection.query(sqlRole,(err, result) => {
//         if(err) throw err
//         if(result.length > 0){
//             req.role = result[0].id
//             next()
//         }
//     })
// }

// module.exports = roleAuthorization