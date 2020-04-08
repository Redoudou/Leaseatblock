// var SimpleStorage = artifacts.require("./SimpleStorage.sol");

// module.exports = function(deployer) {
//   deployer.deploy(SimpleStorage);
// };

var BillOfSale = artifacts.require("./BillOfSale.sol");
module.exports = function(deployer) {
  deployer.deploy(BillOfSale);
};
