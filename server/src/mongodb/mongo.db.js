const connect = require('./mongodb.connect');
const dbName = 'merch';

async function getList() {

    const client = await connect()

    const db = client.db(dbName);

    const list  = db.collection('products');

    const result = await list.find({}).toArray();
    
    console.log(result)

    return result;
}   

module.exports = {
    getList
}