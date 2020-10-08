require('dotenv').config();

const mongodb = require('mongodb').MongoClient;
const url = process.env.MONGO_ATLAS;

async function connect() {
    try {
        const client = await mongodb.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('connected MongoDB Atlas')
        
        return client;

    } catch(err) {

        console.log("Error ", err.stack);

    }
}

module.exports = connect;