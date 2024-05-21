const nanoid = require('nanoid')
const authData = require('../auth')
const TABLE = 'user';

module.exports = function (injectedStore) {
    let store = injectedStore;

    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLE)
    }

    function get(id) {
        return store.get(TABLE, id)
    }

    function post(body) {
        const user = {
            user: body.name
        }

        if (body.id) {
            user.id = body.id
        } else {
            user.id = nanoid()
        }

        if (body.password || body.username) {
            authData.upsert({
                id: user.id,
                username: body.username,
                password: body.password,
            })
        }
        return store.upsert(TABLE, user)
    }

    function remove(id) {
        return store.remove(TABLE, id)
    }

    return {
        list,
        get,
        post,
        remove
    }
}