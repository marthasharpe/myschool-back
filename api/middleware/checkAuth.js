const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // get token from header, excluding 'Bearer'
        const token = req.headers.authorization.split(" ")[1];
        // decode and verify token
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
}