import { gql } from 'graphql-tag';


export const questionTypeDefs = gql`
  type Question {
    _id: ID!
    questionText: String!
    options: [String!]!
    correctAnswer: Int!
    chapterId: ID!
    createdAt: String
  }

  input BulkUploadQuestionsInput {
    questionText: String!
    options: [String!]!
    correctAnswer: Int!
  }

  type UploadResponse {
    success: Boolean!
    message: String!
  }

  extend type Query {
    getQuestions: [Question]
    getQuestionsByChapter(chapterId: ID!): [Question]
    getQuestionsByCourse(courseId: ID!): [Question]
  }

  extend type Mutation {
    addQuestion(questionText: String!, options: [String!]!, correctAnswer: Int!, chapterId: ID!): Question
    bulkUploadQuestions(chapterId: ID!, questions: [BulkUploadQuestionsInput]!): UploadResponse!
    updateQuestion(questionId: ID!, questionText: String, options: [String!], correctAnswer: Int): Question
    deleteQuestion(questionId: ID!): Boolean
  }
`;
