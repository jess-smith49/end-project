const {gql} = require('apollo-server-express')

const typeDefs = gql `
    type User {
        _id: ID
        username: String!
        email: String!
    }

    type Set {
        _id: ID
        setName: String!
        setCard: [card]
    }

    type Card {
        _id: ID
        question: String!
        answer: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query: {
        me: User
        users: [User]
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addSet(setName: String!): User
        addCard(question: String!, answer: String!): User
        removeCard(cardId: ID!): User
    }
`
module.exports = typeDefs;