const {buildSchema} = require ('graphql');

/* Defining Our GraphQl Schema */

module.exports = buildSchema(`
      type TestData {
        text:String!
        views:Int!
      }
      type RootQuery {
        hello:TestData
    }
      schema {
          query:RootQuery
      }
`);