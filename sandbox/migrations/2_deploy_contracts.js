var LeaseOnTheBlock = artifacts.require("./LeaseOnTheBlock.sol");

module.exports = function(deployer) {
  deployer.deploy(LeaseOnTheBlock);
};
