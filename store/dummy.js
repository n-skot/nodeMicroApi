const db = {
    'user': [
        { id: '1', name: 'ricardo' }
    ]
};

async function list(table) {
    return db[table] ?? [   ]
}

async function get(table, id) {
    let col = await list(table);
    return col.filter(item => item.id === id)[0] ?? null;
}

async function upsert(table, data) {
    if (!db[table]) {
        db[table] = []
    }

    db[table].push(data);

    console.log(db);
    return db[table]

}

async function remove(table, id) {
    let col = await list(table)
    let col2 = col.indexOf(item => item.id === id)[0] ?? null
    return col.splice(col2, 1)
}

async function query(table, querys) {
    let col = await list(table);
    let keys = Object.keys(querys)
    let key = keys[0]
    return col.filter(item => item[key] === querys[key])[0] ?? null;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query
}