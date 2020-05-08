const {KeyManagementServiceClient} = require('@google-cloud/kms')

const client = new KeyManagementServiceClient()


const listKeyRings = async (locationName) => {

  const [keyRings] = await client.listKeyRings({
    parent:locationName,
  })

  for (const keyRing of keyRings) {
    console.log(keyRing.name)
  }

  return keyRings[0]
}

module.exports = {
  listKeyRings: listKeyRings()
}
