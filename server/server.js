import express from "express"
import { ApolloServer, gql } from 'apollo-server-express';
import connectDB from "./config/connectDB.js";
import dotenv from 'dotenv';
// TypeDefs
import {courseTypeDefs} from "./schemas/courseSchema.js"
import {chapterTypeDefs} from "./schemas/chapterSchema.js"
import {questionTypeDefs} from "./schemas/questionSchema.js"
import {studentTypeDefs} from "./schemas/studentSchema.js"
import {examTypeDefs} from "./schemas/examSchema.js"
import {certificateTypeDefs} from "./schemas/certificateSchema.js"

// Resolvers
import { courseResolvers } from "./resolvers/courseResolver.js";
import { chapterResolver } from "./resolvers/chapterResolver.js";
import {questionResolver} from "./resolvers/questionResolver.js"
import userTypeDefs from "./schemas/userSchema.js";
import userResolvers from "./resolvers/userResolver.js";
dotenv.config();

// Sample type definitions (schema)


async function startServer() {
  const app = express();

  const server = new ApolloServer({ 
    typeDefs: [courseTypeDefs, chapterTypeDefs, questionTypeDefs, studentTypeDefs, examTypeDefs, certificateTypeDefs, userTypeDefs],
    resolvers: [courseResolvers, chapterResolver, questionResolver, userResolvers],context: ({ req }) => {
      const token = req.headers.authorization?.split(" ")[1];
      if (token) {
        try {
          const decoded = jwt.verify(token, JWT_SECRET);
          return { user: decoded };
        } catch (err) {
          console.error("Invalid token");
        }
      }
      return {};
    },});
  await server.start();

  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
connectDB()