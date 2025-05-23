import { gql } from 'graphql-tag';


export const chapterTypeDefs = gql`
 type Chapter {
    _id: ID!
    courseId: ID!
    title: String!
    createdAt: String
  }

  type Query {
    getChapters(courseId: ID!): [Chapter]
    getChapterById(chapterId: ID!): Chapter
  }

  type Mutation{
    addChapter(courseId: ID!, title: String!): Chapter
    updateChapter(chapterId: ID!, title: String!): Chapter
    deleteChapter(chapterId: ID!): Boolean
  }


`;