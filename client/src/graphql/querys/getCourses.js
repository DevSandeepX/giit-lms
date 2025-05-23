import { gql } from '@apollo/client';

export const GET_COURSES = gql`
  query GetCourses {
    getCourses {
      _id
      title
      description
      image
    }
  }
`;




export const GET_COURSE_BY_ID = gql`
  query GetCourseById($courseId: ID!) {
    getCourseById(courseId: $courseId) {
      _id,
    title,
    description,
    image, 
    chapters {
      title
    }
    }
  }
`;




