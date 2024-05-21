const jwt = require('jsonwebtoken');

function sing(payload) {
    jwt.sign(payload, 'secretKey', { expiresIn: '1h' })
}

module.exports = {
    sing
}