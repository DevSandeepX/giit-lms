import { gql } from 'apollo-server-express';

export const courseTypeDefs = gql`
  type Chapter {
    _id: ID!
    title: String!
    courseId: ID!
    createdAt: String
  }

  type Course {
    _id: ID!
    title: String!
    description: String
    image: String
    createdAt: String
    chapters: [Chapter!]!  # 👈 Nested field
  }

  type Query {
    getCourses: [Course]
    getCourseById(courseId: ID!): Course
  }

  type Mutation {
    addCourse(title: String!, description: String!, image: String): Course
    updateCourse(courseId: ID!, title: String!, description: String!, image: String): Course
    deleteCourse(courseId: ID!): Boolean
  }
`;
