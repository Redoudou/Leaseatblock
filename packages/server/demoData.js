
const demoReg = [
  {
    nameFirst: 'Zachary',
    nameLast: 'Thielemann',
    kaleidoAuth: 'u0hxptj1ec:yDWjiMnSK-3uo80xJT3lqTso4digUBF8WYWKxgMRqXY'
  }
]
const demoLandlord = [
  {
    nameFirst: 'Rich',
    nameLast: 'Landy',
    kaleidoAuth: 'u0kgzv0s21:hP_1iJG-_JROy_PElighBHhA8NtP_cjsSWaOdsb9Y9s',
  }
]

const demoTenant = [
  {
    nameFirst: 'Sam',
    nameLast: 'Leasey',
    kaleidoAuth: 'u0l3mvhe63:jin0rgUmKtWtxGGd1KXiIYOMI7SD--xfcKdC99Z3v4M',
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
    tenant: demoTenant
  },
  {
    address: '1200 St. Bernard',
    bed: '2',
    bath: '1.5',
    rentUSD: '500',
    owner: demoLandlord,
    applicants: demoTenant,
    tenant: null
  }
]



module.exports = {
  demoReg,
  demoTenant,
  demoLandlord,
  demoUnits
}