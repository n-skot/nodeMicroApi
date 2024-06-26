const { sing } = require('../../../auth');
const bcrypt = require('bcrypt')

TABLE = 'auth'

module.exports = function (injectedStore) {
    let store = injectedStore;

    if (!store) {
        store = require('../../../store/dummy');
    }

    async function login(username, password) {
        const data = await store.query(TABLE, { username: username})
        return bcrypt.compare(password, data.password)
            .then(sonIguales => {
                if (sonIguales) {
                    return sing(data);
                } else {
                    throw new Error('Informacion invalida');
                }
            })
    }

    async function upsert(data) {
        authData = {
            id: data.id
        }

        if (data.username) {
            authData.username = data.username
        }

        if (data.password) {
            authData.password = await bcrypt.hash(data.password, 10);
        }

        return store.upsert(TABLE, authData)

    }
    return {
        upsert,
        login
    }
}