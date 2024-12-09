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
  
  input FollowingInput{
    followingId: ID!,
    followerId: ID!,
  }

  type Mutation{
    addFollowing(body: FollowingInput!): Follow,
  }
`;

const followResolvers = {
  Query: {
    follows: async () => await db.collection("follows").find().toArray(),
  },

  Mutation: {
    addFollowing: async (parent, args) => {
      if (!args.followingId) {
        throw new Error("FollowingId is required");
      }
      if (!args.followerId) {
        throw new Error("FollowerId is required");
      }
      const createdAt = new Date().toString();
      const updatedAt = new Date().toString();
      const newFollow = {
        ...args.body,
        createdAt,
        updatedAt,
      };
      await db.collection("follows").insertOne(newFollow);
      return newFollow;
    },
  },
};

module.exports = { followTypeDefs, followResolvers };
