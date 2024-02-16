const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const authHeaders = req.headers.authorization;
        if (authHeaders && authHeaders.split(' ')[1]) {
            const token = authHeaders.split(' ')[1];
            if (!token) {
                res.status(401).json({ message: 'Not Authorization' })
            }

            const decoded = jwt.verify(token, process.env.JWTSECRET);
            req.body.userId = decoded.payload.id;

            next();
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports = {
    auth
}