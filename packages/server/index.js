const { ApolloServer, gql } = require('apollo-server')

const {  demoReg,
          demoTenant,
          demoLandlord,
          demoUnits } = require('./demoData')

const typeDefs = gql`

  type User {
    id: ID!
    role: [String]
  }

  type Reg {
    user: User
    nameFirst: String
    nameLast: String
    kaleidoAuth: String
  }

  type Tenant {
    user: User
    nameFirst: String
    nameLast: String
    kaleidoAuth: String
    at: Unit
  }

  type Landlord {
    user: User
    nameFirst: String
    nameLast: String
    kaleidoAuth: String
    units: [Unit]
  }

  type Unit {
    address: String
    bed: Int
    bath: Int
    rentUSD: Int
    owner: Landlord
    applicants: [Tenant]
    tenant: Tenant
  }

  type Query {
    allUsers: [User]
    allLandlords: [Landlord]
    allReg: [Reg]
    allUnits: [Unit]
  }
`
const generateUserModel = ({ user }) => ({
  getAll: () => { 
    if(!user || !user.roles.includes('regulator')) return null
    return fetch('http://localhost:4000/users')
  },
  getById: (id) => {    
    if(!user.id === id) return null
    return fetch(`http://localhost:4000/user/${id}`)
  },
})

const resolvers = {
  Query: {
    allUsers: (context) => {
      if (!context.user || !context.user.roles.includes('regulator')) return null
      return context.models.User.getAll()
    },
    allLandlords: () => demoLandlord,
    allReg: () => demoReg,
    allUnits: () => demoUnits,
  }
}

const server = new ApolloServer({
  typeDefs, 
  resolvers,
  context: ({ req }) => {
    // Note! This example uses the `req` object to access headers,
    // but the arguments received by `context` vary by integration.
    // This means they will vary for Express, Koa, Lambda, etc.!
    //
    // To find out the correct arguments for a specific integration,
    // see the `context` option in the API reference for `apollo-server`:
    // https://www.apollographql.com/docs/apollo-server/api/apollo-server/
 
    // Get the user token from the headers.
    const token = req.headers.authorization || '';
 
    // try to retrieve a user with the token
    const user = getUser(token);
    if (!user) throw new AuthenticationError('you must be logged in'); 

    // add the user to the context
    return { user, models: {
      User: generateUserModel({ user })
    } };
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)

})