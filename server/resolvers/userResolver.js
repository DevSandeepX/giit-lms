// schema/resolvers.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = "sandeep@8756";

const userResolvers = {
  Query: {
    me: (_, __, { user }) => {
      return user;
    },
  },
  Mutation: {
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) throw new Error("User not found");

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid password");

      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: "1d",
      });

      return {
        token,
        user,
      };
    },
  },
};

export default userResolvers;
