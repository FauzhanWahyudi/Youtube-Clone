if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { userTypeDefs, userResolvers } = require("./schemas/userSchema");
const { followTypeDefs, followResolvers } = require("./schemas/followSchema");

// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs: [userTypeDefs, followTypeDefs],
  resolvers: [userResolvers, followResolvers],
});

startStandaloneServer(server, { listen: { port: 3000 } }).then(console.log);
