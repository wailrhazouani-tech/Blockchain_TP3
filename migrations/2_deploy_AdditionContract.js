const AdditionContract = artifacts.require("AdditionContract");

module.exports = function (deployer) {
  deployer.deploy(AdditionContract, 0, 0);
};
