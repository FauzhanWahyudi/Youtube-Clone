const { ObjectId } = require("mongodb");
const { db } = require("../config/db");
const Post = require("../models/post");

const postsTypeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
    
    
  type Comment {
    content: String!,
    username: String!,
    createdAt: String,
    updatedAt: String,
  }

  type Like {
    username: String!,
    createdAt: String,
    updatedAt: String,
  }

  type Post {
    _id: ID!,
    content: String!,
    tags: [String],
    imgUrl: String,
    authorId: ID!,
    comments: [Comment],
    likes: [Like],
    createdAt: String,
    updatedAt: String,
    author: [User]
  }

  type Query {
    posts: [Post]  
  }

  input PostForm {
    content: String!,
    tags: [String],
    imgUrl: String,
    authorId: ID!,
  }

  type Mutation{
    addPost(body:PostForm!):Post
  }
`;

const postsResolvers = {
  Query: {
    posts: () =>
      Post.collection
        .aggregate([
          {
            $lookup: {
              from: "users",
              localField: "authorId",
              foreignField: "_id",
              as: "author",
            },
          },
          {
            $sort: { createdAt: -1 },
          },
        ])
        .toArray(),
  },

  Mutation: {
    addPost: async (parent, args, contextValue) => {
      const { user } = await contextValue.auth();

      args.body.authorId = user._id;
      const { content } = args.body;
      if (!content) {
        throw new Error("Content is required");
      }
      return await Post.addPost(args.body);
    },
  },
};

module.exports = { postsTypeDefs, postsResolvers };
