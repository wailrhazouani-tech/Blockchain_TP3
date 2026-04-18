const ArraysContract = artifacts.require("ArraysContract");

module.exports = function(deployer) {
    deployer.deploy(ArraysContract, [0, 0, 0]);
}