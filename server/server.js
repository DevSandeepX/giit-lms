import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import express from 'express';
import connectDB from './config/connectDB.js';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

dotenv.config();

// Import typeDefs
import { courseTypeDefs } from './schemas/courseSchema.js';
import { chapterTypeDefs } from './schemas/chapterSchema.js';
import { questionTypeDefs } from './schemas/questionSchema.js';
import { studentTypeDefs } from './schemas/studentSchema.js';
import { examTypeDefs } from './schemas/examSchema.js';
import { certificateTypeDefs } from './schemas/certificateSchema.js';
import userTypeDefs from './schemas/userSchema.js';

// Import resolvers
import { courseResolvers } from './resolvers/courseResolver.js';
import { chapterResolver } from './resolvers/chapterResolver.js';
import { questionResolver } from './resolvers/questionResolver.js';
import userResolvers from './resolvers/userResolver.js';

const JWT_SECRET = process.env.JWT_SECRET;

async function startServer() {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());

  const server = new ApolloServer({
    typeDefs: [
      courseTypeDefs,
      chapterTypeDefs,
      questionTypeDefs,
      studentTypeDefs,
      examTypeDefs,
      certificateTypeDefs,
      userTypeDefs
    ],
    resolvers: [
      courseResolvers,
      chapterResolver,
      questionResolver,
      userResolvers
    ],
  });

  await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
          try {
            const decoded = jwt.verify(token, JWT_SECRET);
            return { user: decoded };
          } catch (err) {
            console.error('Invalid token');
          }
        }
        return {};
      }
    })
  );

  const PORT = process.env.PORT || 3500;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

connectDB();
startServer();
