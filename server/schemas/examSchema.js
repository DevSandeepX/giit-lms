// schema/examTypeDefs.js
import { gql } from 'graphql-tag';


export const examTypeDefs = gql`
  # Question type (to be used in exam)
  

  # Answer type for submission
  type Answer {
  questionId: ID!
  selectedAnswer: String!
}

input AnswerInput{
  questionId: ID!
  selectedAnswer: String!
}

  # Exam type (to capture exam submission details)
  type Exam {
    _id: ID!
    studentId: ID!
    courseId: ID!
    answers: [Answer!]!
    score: Int
    submittedAt: String
  }

  # Query to fetch questions for a chapter
  type Query {
    getExamResult(studentId: ID!, courseId: ID!): Exam
  }

  # Mutation to submit an exam
  type Mutation {
    submitExam(studentId: ID!, courseId: ID!, answers: [AnswerInput!]!): Exam
  }
`;


