const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        return res.status(401).send('Token not provided');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);
        req.user = decoded;
        console.log('Decoded user:', decoded); 
        next();
    } catch (error) {
        console.error('Token verification error:', error); 
        res.status(400).send('Invalid token');
    }
};
