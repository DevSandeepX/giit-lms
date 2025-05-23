// graphql/mutations/addQuestion.js
import { gql } from '@apollo/client';

export const ADD_QUESTION = gql`
  mutation AddQuestion($questionText: String!, $options: [String!]!, $correctAnswer: Int!, $chapterId: ID!) {
    addQuestion(questionText: $questionText, options: $options, correctAnswer: $correctAnswer, chapterId: $chapterId) {
      _id
      questionText
      options
      correctAnswer
      chapterId
    }
  }
`;


export const BULK_UPLOAD_QUESTIONS = gql`
  mutation BulkUploadQuestions($chapterId: ID!, $questions: [BulkUploadQuestionsInput!]!) {
    bulkUploadQuestions(chapterId: $chapterId, questions: $questions) {
      success
      message
    }
  }
`;
