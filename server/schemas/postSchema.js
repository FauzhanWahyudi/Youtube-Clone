const redis = require("../config/cache");
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
    author: User
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
    //get all post
    posts: async (parent, args, contextValue) => {
      //authenticate user
      await contextValue.auth();

      //get data from cache (redis)
      let posts = await redis.get("posts");

      //check data in cache
      if (posts) {
        //directly return data if ready
        return JSON.parse(posts);
      }

      //get data from mongodb
      posts = await Post.posts();

      //convert data to string (because redis only store string)
      //and set data to cache
      await redis.set("posts", JSON.stringify(posts));

      return posts;
    },

    //get post by id
    post: async (parent, args, contextValue) => {
      //authenticate user
      await contextValue.auth();

      return await Post.postById(args._id);
    },
  },

  Mutation: {
    //create post
    addPost: async (parent, args, contextValue) => {
      //get authenticated user
      const { user } = await contextValue.auth();

      //assign user id to body authorId
      args.body.authorId = user._id;

      //check if content is inputted
      const { content } = args.body;
      if (!content) {
        throw new Error("Content is required");
      }

      //do create post
      const newPost = await Post.addPost(args.body);

      //delete posts cache after create (to update when fetch posts)
      await redis.del("posts");

      return newPost;
    },

    //add comment to specific post
    addComment: async (parent, args, contextValue) => {
      //get authenticated user
      const { user } = await contextValue.auth();

      //check if content is inputted
      const { content } = args.body;
      if (!content) {
        throw new Error("Content is required");
      }

      args.body.username = user.username;
      return await Post.addComment(args.body);
    },

    //add like to specific post
    addLike: async (parent, args, contextValue) => {
      //get authenticated user
      const { user } = await contextValue.auth();
      args.body.username = user.username;
      return await Post.addLike(args.body);
    },
  },
};

module.exports = { postsTypeDefs, postsResolvers };
