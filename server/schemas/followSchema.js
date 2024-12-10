const { db } = require("../config/db");
const Follow = require("../models/follow");

const followTypeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
    
  type Follow {
    _id: ID!,
    followingId: ID!,
    followerId: ID!,
    createdAt: String,
    updatedAt: String,
    user: User,
  }

  type Query {
    follows: [Follow],
  }
  
  input FollowingInput{
    followingId: ID!,
  }

  type Mutation{
    addFollowing(body: FollowingInput!): Follow,
  }
`;

const followResolvers = {
  Query: {
    follows: async () => await Follow.collection.find().toArray(),
  },

  Mutation: {
    addFollowing: async (parent, args, contextValue) => {
      const { user } = await contextValue.auth();
      args.body.followerId = user._id;
      if (!args.body.followingId) {
        throw new Error("FollowingId is required");
      }
      if (!args.body.followerId) {
        throw new Error("FollowerId is required");
      }
      return await Follow.addFollowing(args.body);
    },
  },
};

module.exports = { followTypeDefs, followResolvers };
