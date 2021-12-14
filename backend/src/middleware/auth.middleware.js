const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (request, response, next) => {
    if(request.method === 'OPTIONS') return next();

    try {
        const token = request.authorization.split(' ')[1];
        if(!token) return response.status(401).json({message: 'Not authorize'});
        const decoded = jwt.verify(token,  process.env.JWT_SECRET);
        request.user = decoded;
        next();
    } catch (error) {
        response.status(401).json({message: 'Not authorize'});
    }
}