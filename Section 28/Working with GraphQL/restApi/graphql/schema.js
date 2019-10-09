const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Post {
        _id: ID!
        title: String!
        content: String!
        imageUrl: String!
        creator: User!
        createdAt: String!
        updatedAt: String!
    }

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        status: String!
        posts: [Post!]!
    }

    input UserInputData {
        email: String!
        name: String!
        password: String!
    }

    type RootQuery {
        hello: String
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

/**
 * we can do also createUser(email:String,password:String) / or we can bundle an object like in our example
 */


/**
 * Query
 */

// module.exports = buildSchema(`
//       type TestData {
//         text:String!
//         views:Int!
//       }
//       type RootQuery {
//         hello:TestData
//     }
//       schema {
//           query:RootQuery
//       }
// `);