import { gql } from '@apollo/client';

export const GET_COURSES_WITH_CHAPTERS = gql`
  query GetCourses {
    getCourses {
      _id
      title
      description
      image
      chapters {
        _id
        title
        courseId
      }
    }
  }
`;
