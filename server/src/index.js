/*const db = require('./mongodb/mongo.db');

db.getList();*/

const { ApolloServer, AuthenticationError } = require('apollo-server');
const typeDefs = require('./schema');
const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');
const resolvers = require('./resolvers');
 

const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    dataSources: () => ({
        launchAPI:  new LaunchAPI(),
        userAPI: new UserAPI()
    }),
    context : ({req}) => {
        /*const token = req.headers.authorization || '';

        if(!token) {
            throw new AuthenticationError( 'You have be logged !!!! ');
        }*/

        return {
            req
        }
    }

 });

server.listen().then(({url}) => {
    console.log(`My 🚀 Server ready at ${url}`);
})