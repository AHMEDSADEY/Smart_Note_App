import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    _id: ID!
    userName: String!
    email: String!
    role: String!
    profilePic: String
    createdAt: String!
    updatedAt: String!
  }

  type Note {
    _id: ID!
    title: String!
    content: String!
    ownerId: User!
    isDeleted: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type PaginatedNotes {
    notes: [Note!]!
    totalCount: Int!
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    currentPage: Int!
    totalPages: Int!
  }

  input NoteFilters {
    userId: ID
    title: String
    createdAfter: String
    createdBefore: String
    isDeleted: Boolean
  }

  input PaginationInput {
    page: Int = 1
    limit: Int = 10
  }

  type Query {
    notes(filters: NoteFilters, pagination: PaginationInput): PaginatedNotes!
  }
`; 