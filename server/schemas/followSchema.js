const { ObjectId } = require("mongodb");
const { db } = require("../config/db");
const Follow = require("../models/follow");
const User = require("../models/user");

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

      //check input
      if (!args.body.followingId) {
        throw new Error("FollowingId is required");
      }

      //convert following id to ObjectId
      args.body.followingId = new ObjectId(args.body.followingId);

      //check if user id same as followingId
      if (args.body.followingId.toString() === user._id.toString()) {
        throw new Error("You can't follow yourself");
      }

      //check if user with _id = following id is found
      const followingUser = await User.collection.findOne({
        _id: args.body.followingId,
      });
      if (!followingUser) throw new Error("User not found");

      //check if user already follow
      const follow = await Follow.collection.findOne({
        followerId: user._id,
        followingId: args.body.followingId,
      });
      if (follow) throw new Error("You already follow user");

      //assign user id to be body.follower id
      args.body.followerId = user._id;

      //create new follow and return new follow
      return await Follow.addFollowing(args.body);
    },
  },
};

module.exports = { followTypeDefs, followResolvers };
