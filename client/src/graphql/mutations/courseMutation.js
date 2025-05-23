import { gql } from '@apollo/client';

export const ADD_COURSE = gql`
  mutation AddCourse($title: String!, $description: String!, $image: String) {
    addCourse(title: $title, description: $description, image: $image) {
      _id
      title
      description
      image
    }
  }
`;


export const DELETE_COURSE = gql`
  mutation DeleteCourse($courseId: ID!) {
    deleteCourse(courseId: $courseId) 
  }
`;

export const UPDATE_COURSE = gql`
  mutation UpdateCourse($courseId: ID!, $title: String!, $description: String!, $image: String) {
    updateCourse(courseId: $courseId, title: $title, description: $description, image: $image) {
      title
      description
      image
    }
  }
`;