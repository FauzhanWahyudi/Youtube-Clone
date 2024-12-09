const { db } = require("../config/db");

const followTypeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
    
  type Follow {
    _id: ID!,
    followingId: ID!,
    followerId: ID!,
    createdAt: String,
    updatedAt: String,
  }

  type Query {
    follows: [Follow],
  }
`;

const followResolvers = {
  Query: {
    follows: async () => await db.collection("follows").find().toArray(),
  },

  Mutation: {},
};

module.exports = { followTypeDefs, followResolvers };
