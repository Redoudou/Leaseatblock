const express = require('express')
const got = require('got')
const jwt = require('jsonwebtoken')

const {createKeyRing} = require('./google-kms/createKeyRing')

require('dotenv').config()

const app = express()

let certs
let aud

async function certificates() {
  if (!certs) {
    let response = await got('https://www.gstatic.com/iap/verify/public_key')
    certs = JSON.parse(response.body)
  }
  return certs
}

async function getMetadata(itemName) {
  const endpoint = 'http://metadata.google.internal'
  const path = '/computeMetadata/v1/project/'
  const url = endpoint + path + itemName

  let response = await got(url, {
    headers: {'Metadata-Flavor': 'Google'},
  })
  return response.body
}

async function audience() {
  if (!aud) {
    let project_number = await getMetadata('numeric-project-id')
    let project_id = await getMetadata('project-id')

    aud = '/projects/' + project_number + '/apps/' + project_id
  }

  return aud
}

async function validateAssertion(assertion) {
  if (!assertion) {
    return {}
  }
  // Decode the header to determine which certificate signed the assertion
  const encodedHeader = assertion.split('.')[0]
  const decodedHeader = Buffer.from(encodedHeader, 'base64').toString('utf8')
  const header = JSON.parse(decodedHeader)
  const keyId = header.kid

  // Fetch the current certificates and verify the signature on the assertion
  const certs = await certificates()
  const payload = jwt.verify(assertion, certs[keyId])

  // Check that the assertion's audience matches ours
  const aud = await audience()
  if (payload.aud !== aud) {
    throw new Error('Audience mismatch. {$payload.aud} should be {$aud}.')
  }

  // Return the two relevant pieces of information
  return {
    email: payload.email,
    sub: payload.sub,
  }
}

let email = 'None'

app.get('/authenticate', async (req, res) => {
  const assertion = req.header('X-Goog-IAP-JWT-Assertion')
  try {
    const info = await validateAssertion(assertion)
    email = info.email
  } catch (error) {
    console.log(error)
  }
  res
    .status(200)
    .send(`Hello ${email}`)
    .end();
});

app.post('/createKeyRing/', async (req, res) => {

  createKeyRing.then((resp) => {
    console.log(`Key ring created - ${resp.keyRingId}`)
  }).catch((error) => {
    console.log(error)
    res.status(500).send(`Key Create Fail - ${error}`).end()
  })

  res
    .status(200)
    .send(`Created key ring in environment ${process.env.NODE_ENV}`)
    .end()
})

app.post('/createKey', async (req, res) => {
  try {
    const keyPair = await createKeyPair ()
    console.log(`Key pair create for account ${email}`)
  } catch (error) {
    console.log(error)
  }
})

// Start the server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})