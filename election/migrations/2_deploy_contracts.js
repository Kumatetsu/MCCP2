var Election = artifacts.require("./Election.sol");
var ResContract = artifacts.require("./ResContract.sol")

module.exports = function(deployer) {
  deployer.deploy(Election);
  deployer.deploy(ResContract);
};
