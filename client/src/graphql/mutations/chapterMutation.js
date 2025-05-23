import { gql } from '@apollo/client';

export const ADD_CHAPTER = gql`
  mutation AddChapter($courseId:ID!,$title: String!) {
    addChapter(courseId:$courseId, title: $title) {
      title
    }
  }
`;



export const DELETE_CHAPTER = gql`
  mutation DeleteChapter($chapterId: ID!) {
    deleteChapter(chapterId: $chapterId)
  }
`;

export const UPDATE_CHAPTER = gql`
  mutation UpdateChapter($chapterId: ID!, $title: String!) {
    updateChapter(chapterId: $chapterId, title: $title) {
      _id
      title
    }
  }
`;