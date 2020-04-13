const Kit = require('@celo/contractkit')

const kit = Kit.newKit('https://alfajores-forno.celo-testnet.org')

async function awaitWrapper(anAddress){
    let goldtoken = await kit.contracts.getGoldToken()
    let balance = await goldtoken.balanceOf(anAddress)
    console.log(balance.toString())
}

module.exports = {
  awaitWrapper()
}