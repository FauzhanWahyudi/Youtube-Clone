const { db } = require("../config/db");

module.exports = class Post {
  static collection = db.collection("posts");
  static async posts() {
    //get data from mongodb
    return await Post.collection
      .aggregate([
        {
          //lookup to join post with user
          $lookup: {
            from: "users",
            localField: "authorId",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $unwind: {
            path: "$author",
          },
        },
        {
          //sort date descending
          $sort: { createdAt: -1 },
        },
      ])
      //convert object instance to array
      .toArray();
  }
  static async postById(_id) {
    // console.log(_id);
    try {
      const post = await Post.collection
        .aggregate([
          { $match: { _id: new ObjectId(_id) } },
          {
            $lookup: {
              from: "users",
              localField: "authorId",
              foreignField: "_id",
              as: "author",
            },
          },
        ])
        .toArray();
      return post[0];
    } catch (error) {
      console.log("🚀 ~ Post ~ getPostById ~ error:", error);
      throw error;
    }
  }

  static async addPost(body) {
    const newPost = {
      ...body,
      authorId: new ObjectId(authorId),
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };
    try {
      await Post.collection.insertOne(newPost);
      return newPost;
    } catch (error) {
      console.log("🚀 ~ Post ~ addPost ~ error:", error);
      throw error;
    }
  }

  static async addLike(body) {
    try {
      const { postId, username } = body;
      const newLike = {
        username,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      };
      const { likes } = await Post.collection.findOne({
        _id: new ObjectId(postId),
      });
      if (likes && likes.some((like) => like.username === username)) {
        throw new Error("Can't like same the post");
      }

      await Post.collection.updateOne(
        { _id: new ObjectId(postId) },
        {
          $push: {
            likes: newLike,
          },
        }
      );
      return newLike;
    } catch (error) {
      console.log("🚀 ~ Post ~ addLike ~ error:", error);
      throw error;
    }
  }

  static async addComment(body) {
    try {
      const { postId, username, content } = body;
      const newComment = {
        content,
        username,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      };
      await Post.collection.updateOne(
        { _id: new ObjectId(postId) },
        {
          $push: {
            comments: newComment,
          },
        }
      );
      return newComment;
    } catch (error) {
      console.log("🚀 ~ Post ~ addComment ~ error:", error);
      throw error;
    }
  }
};
