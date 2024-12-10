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
    post(_id: ID!): Post
  }

  input PostForm {
    content: String!,
    tags: [String],
    imgUrl: String,
    authorId: ID!,
  }

  input CommentForm {
    postId:String!,
    content: String!,
  }

    input LikeForm {
    postId:String!,
  }

  type Mutation{
    addPost(body:PostForm!):Post
    addComment(body:CommentForm!):Comment
    addLike(body:LikeForm):Like
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
    post: async (parent, args) => {
      return await Post.getPostById(args._id);
    },
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
    addComment: () => {},
    addLike: async (parent, args, contextValue) => {
      const { user } = await contextValue.auth();
      args.body.username = user.username;
      return await Post.addLike(args.body);
    },
  },
};

module.exports = { postsTypeDefs, postsResolvers };
