const { ApolloServer } = require("apollo-server");
const {typeDefs} = require("./graphql/typeDefs.js");
const {resolvers} = require("./graphql/resolvers.js");
require("dotenv").config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`YOUR SERVER RUNNING AT PORT: ${url}`);
});
