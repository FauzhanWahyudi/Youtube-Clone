const { ObjectId } = require("mongodb");
const { db } = require("../config/db");

module.exports = class Follow {
  static collection = db.collection("follows");
  static async addFollowing(body) {
    const createdAt = new Date().toString();
    const updatedAt = new Date().toString();
    const newFollow = {
      ...body,
      followingId: new ObjectId(body.followingId),
      createdAt,
      updatedAt,
    };
    try {
      await Follow.collection.insertOne(newFollow);
      return newFollow;
    } catch (error) {
      console.log("🚀 ~ Follow ~ addFollowing ~ error:", error);
      throw error;
    }
  }

  static async getFollowers(_id) {
    return await Follow.collection
      .aggregate([
        { $match: { followingId: _id } },
        {
          $lookup: {
            from: "users",
            localField: "followerId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: {
            path: "$user",
          },
        },
        {
          $project: {
            user: {
              password: 0,
            },
          },
        },
      ])
      .toArray();
  }
  static async getFollowing(_id) {
    return await Follow.collection
      .aggregate([
        { $match: { followerId: user._id } },
        {
          $lookup: {
            from: "users",
            localField: "followingId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: {
            path: "$user",
          },
        },
        {
          $project: {
            user: {
              password: 0,
            },
          },
        },
      ])
      .toArray();
  }
};
