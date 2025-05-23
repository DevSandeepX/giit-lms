import { gql } from 'apollo-server-express';

export const certificateTypeDefs = gql`
   type Certificate {
    _id: ID!
    studentId: ID!
    courseId: ID!
    fileUrl: String!
    uploadedAt: String
  }

  type Query {
    getCertificate(studentId: ID!, courseId: ID!): Certificate
  }

  type Mutation{
    uploadCertificate(studentId: ID!, courseId: ID!, fileUrl: String!): Certificate
  }


`;