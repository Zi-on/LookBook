const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: String
        savedBooks: [Book]!
    }

    type Book {
        bookId: ID
        authors: [String]
        description: String
        title: String
        image: Image
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
       me: User
    }

    type Mutation {
       login(email: String!, password: String!): Auth
       addUser(username: String!, email: String!, password: String!): Auth
       saveBook(userId: ID, author: String!, description: String!, title: String!, image: Image!, link: String): User
       removeBook(bookId: ID!): User
    }
`
module.exports = typeDefs;