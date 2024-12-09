const { ObjectId } = require("mongodb");
const { db } = require("../config/db");
const { hashPassword, comparePassword } = require("../helpers/hash");
const isEmail = require("is-email");
const { signToken } = require("../helpers/jwt");

class User {
  static collection = db.collection("users");

  static async findAll() {
    try {
      return await User.collection.find().toArray();
    } catch (error) {
      console.log("🚀 ~ User ~ findAll ~ error:", error);
    }
  }

  static async findById(_id) {
    try {
      return await User.collection.findOne({ _id: new ObjectId(_id) });
    } catch (error) {
      console.log("🚀 ~ User ~ findById ~ error:", error);
    }
  }

  static async addUser(body) {
    try {
      const users = await User.findAll();
      let user = null;

      const { username, email, password } = body;
      //check username
      if (!username) {
        throw new Error("Username is required");
      }
      //check if username is unique
      user = users.find((user) => user.username === username);
      if (user) {
        throw new Error("Username already registered");
      }

      //check email
      if (!email) {
        throw new Error("Email is required");
      } else if (!isEmail(email)) {
        throw new Error("Invalid email password");
      }
      //check if email is unique
      user = users.find((user) => user.email === email);
      if (user) {
        throw new Error("Email already registered");
      }

      //check password
      if (!password) {
        throw new Error("Password is required");
      }
      if (password.length < 5) {
        throw new Error("Password at least 5 character");
      }

      const newUser = {
        ...body,
        password: hashPassword(body.password),
      };
      await User.collection.insertOne(newUser);
      return { newUser };
    } catch (error) {
      console.log("🚀 ~ User ~ addUser ~ error:", error);
    }
  }

  static async login(body) {
    try {
      const { username, password } = body;
      if (!username) {
        throw new Error("Username is required");
      }
      if (!password) {
        throw new Error("Password is required");
      }
      const user = await User.collection.findOne({ username });
      // console.log("user", user);
      if (!user) {
        console.log("🚀 ~ User ~ login ~ s:", s);
        throw new Error("Invalid username/password");
      }
      const isValidatePassword = comparePassword(password, user.password);
      if (!isValidatePassword) {
        throw new Error("Invalid username/password");
      }

      const access_token = signToken(String(user._id));
      return { access_token };
    } catch (error) {
      console.log("🚀 ~ User ~ login ~ error:", error);
    }
  }
  static async search(body) {
    try {
      const { name, username } = body;
      console.log(body);
      const users = await User.collection
        .find({
          $or: [
            { name: { $regex: name, $options: "i" } },
            { username: { $regex: username, $options: "i" } },
          ],
        })
        .toArray();
      return users;
    } catch (error) {
      console.log("🚀 ~ User ~ search ~ error:", error);
    }
  }
}

module.exports = User;
