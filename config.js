require('dotenv').config();

module.exports = {
    api: {
        port: process.env.PORT ?? 3000
    },
    jwt: {
        secretKey: process.env.JWT_SECRET
    }
}