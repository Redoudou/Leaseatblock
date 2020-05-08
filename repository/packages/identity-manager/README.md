# Lease on the Block Key Management System

LeaseOTB provides a Google KMS service to bridge identity from Google OAuth to an exportable Ethereum key pair.  All routes to this service are expected to be pre-authenticated through our app.

### This service requires GCP service account credentials to run, in the form of a .json file in the root path

# API

## Key Ring Creation

>/createKeyRing

Upon the initalization of a new LeaseOTB enviroment, the presiding Security Officer has the authority to create new Google KMS Key Ring.  This key ring stores all user key pairs for that environment.
#

## Key Pair Creation

>/createKeyPair

Accessible to all authenticated Users without a key pair.  Initalizes a new key pair labled with current Node environment.
#

## Transaction Signing

>/signTransaction/[transaction]

Body: Object [transaction]

Signs a trasaction object on behalf of the currently authenticated user, and sends said trasaction to Kaleido Node Endpoint.
#
