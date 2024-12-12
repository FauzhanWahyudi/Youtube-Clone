if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { userTypeDefs, userResolvers } = require("./schemas/userSchema");
const { followTypeDefs, followResolvers } = require("./schemas/followSchema");
const { postsTypeDefs, postsResolvers } = require("./schemas/postSchema");

// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs: [userTypeDefs, followTypeDefs, postsTypeDefs],
  resolvers: [userResolvers, followResolvers, postsResolvers],
});

startStandaloneServer(server, {
  listen: { port: 3000 },
  context: ({ req, res }) => {
    const auth = async () => {
      const { authorization } = req.headers;
      // console.log("🚀 ~ auth ~ authorization:", authorization);
      if (!authorization) throw new Error("Invalid token");

      const [type, token] = authorization.split(" ");
      // console.log("🚀 ~ auth ~ token:", token);
      // console.log("🚀 ~ auth ~ type:", type);

      if (!type || !token) {
        throw new Error("Invalid token");
      }
      try {
        const { _id } = verifyToken(token);
        const user = await User.findById(_id);
        if (!user) throw new Error("Invalid token");
        return { user };
      } catch (error) {
        console.log("🚀 ~ auth ~ error:", error);
        throw new Error("Invalid token");
      }
    };
    return { auth };
  },
}).then(console.log);
