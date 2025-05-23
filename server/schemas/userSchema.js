// schema/typeDefs.js
import { gql } from 'graphql-tag';


const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    password:String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload!
  }
`;

export default userTypeDefs;
