import express from 'express';
import {ApolloServer, makeExecutableSchema} from 'apollo-server-express';
import {typeDefs} from './data/schema';
import {resolvers} from './data/resolvers';

const app = express();

const schema = makeExecutableSchema({
    typeDefs:typeDefs,
    resolvers:resolvers
});

const server = new ApolloServer({schema:schema});

server.applyMiddleware({app});

app.listen({port:5000},()=> console.log(`El servidor se esta ejecutando http://localhost:5000${server.graphqlPath}`) );