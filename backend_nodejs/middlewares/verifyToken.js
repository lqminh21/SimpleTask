const jwt = require('jsonwebtoken');

    function verifyToken(req, res, next) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) return res.sendStatus(401)

        jwt.verify(token, 'secret', (err, account) => {

            if (err) return res.sendStatus(403)
            req.account = account
            next()
        })
    }

module.exports = verifyToken