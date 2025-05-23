// graphql/queries/getQuestions.js
import { gql } from '@apollo/client';

export const GET_QUESTIONS = gql`
  query GetQuestions {
    getQuestions {
      _id
      questionText
      options
      correctAnswer
      chapterId
    }
  }
`;

export const GET_QUESTIONS_BY_CHAPTER = gql`
  query GetQuestionsByChapter($chapterId: ID!) {
    getQuestionsByChapter(chapterId: $chapterId) {
      _id
      questionText
      options
      correctAnswer
    }
  }
`;

export const GET_QUESTIONS_BY_COURSE = gql`
  query GetQuestionsByCourse($courseId: ID!) {
    getQuestionsByCourse(courseId: $courseId) {
      _id
      questionText
      options
      correctAnswer
    }
  }
`;