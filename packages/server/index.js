const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`

  type Reg {
    nameFirst: String
    nameLast: String
    kaleidoAuth: String
  }

  type Tenant {
    nameFirst: String
    nameLast: String
    kaleidoAuth: String
    at: Unit
  }

  type Landlord {
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
    listings: [Unit]
    allLandlords: [Landlord]
    allReg: [Reg]
    allUnits: [Unit]
  }
`

const demoReg = [
  {
    nameFirst: 'Zachary',
    nameLast: 'Thielemann',
    kaleidoAuth: 'u0hxptj1ec:yDWjiMnSK-3uo80xJT3lqTso4digUBF8WYWKxgMRqXY'
  }
]

const demoTenant = [
  {
    nameFirst: 'Sam',
    nameLast: 'Leasey',
    kaleidoAuth: 'u0l3mvhe63:jin0rgUmKtWtxGGd1KXiIYOMI7SD--xfcKdC99Z3v4M'
  }
]

const demoLandlord = [
  {
    nameFirst: 'Rich',
    nameLast: 'Landy',
    kaleidoAuth: 'u0kgzv0s21:hP_1iJG-_JROy_PElighBHhA8NtP_cjsSWaOdsb9Y9s',
    units: demoUnits
  }
]

const demoUnits = [
  {
    address: '1200 St. Bernard',
    bed: '2',
    bath: '1.5',
    rentUSD: '500',
    owner: demoLandlord,
    applicants: demoTenant,
    tenant: demoTenant[0],
  }
]


const resolvers = {
  Query: {
    allLandlords: () => demoLandlord,
    allReg: () => demoReg,
    allUnits: () => demoUnits
  }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)

})