
'use strict'

const {KeyManagementServiceClient} = require('@google-cloud/kms')

const {listKeyRings} = require('./listKeyRings')
// Instantiates a client
const client = new KeyManagementServiceClient()


const createKeyRing = async () => {
  let projectId = 'leaseontheblock'
  let locationId = 'us-east1'
  let id = 'leaseotb-keyring-dev'
  
  const locationName = client.locationPath(projectId, locationId)

  listKeyRings(locationName).then((resp) => {
    if (resp != undefined) {return 'exists!'}
    console.log(`--> Creating key ring in process ${process.env.NODE_ENV}`)
    console.log(`--> Project ID: ${projectId}`)
    console.log(`--> Location: ${id}`)

    console.log(`Created key ring: ${keyRing.keyRingId}`)
  }).catch(error => {
    console.log(error)
  })
  const [keyRing] = await client.createKeyRing({
    parent: locationName,
    keyRingId: id,
  })

  return keyRing
}

module.exports = {
  createKeyRing: createKeyRing()
}