import { gql } from 'apollo-server-express';

export const studentTypeDefs = gql`
   type Student {
    _id: ID!
    name: String!
    rollNumber: String!
    enrolledCourses: [Course]
    certificates: [Certificate]
   }

  type Query {
    getStudent(rollNumber: String!): Student
  }

  type Mutation{
    addStudent(name: String!, rollNumber: String!, password: String!): Student
  }


`;