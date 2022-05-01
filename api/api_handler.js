const fs = require('fs');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');

const Product = require('./product.js');

const resolvers = {
  Query: {
    productList: Product.list,
    product: Product.get,
    productCount: Product.count,
  },
  Mutation: {
    addProduct: Product.add,
    updateProduct: Product.update,
    deleteProduct: Product.delete,
  },
};

/* Initial Server setup */
const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

const bootApp = (app) => {
  const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
  console.log('CORS setting:', enableCors);
  server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
};

module.exports = { bootApp };
