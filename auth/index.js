const jwt = require('jsonwebtoken');
const config = require('../config')

function sing(payload) {
    return jwt.sign(payload, config.jwt.secretKey, { expiresIn: '1h' })
}

function verify(token) {
    return jwt.verify(token, config.jwt.secretKey);
}

const checkAuth = {
    own: function () {
        const decoded = decodeHeader(req);
        console.log(decoded);

        if (decoded.id !== owner) {
            throw new Error('No puedes hacer esto');
        }
    }
}

function getToken(auth) {
    if (!auth) {
        throw new Error('No existe el Token')
    }

    if (auth.indexOf('Bearer ') === -1) {
        throw new Error('Formato invalido')
    }
    let token = auth.replace('Bearer ', '');
    return token
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;
    return decoded;
}

module.exports = {
    sing,
    checkAuth
}