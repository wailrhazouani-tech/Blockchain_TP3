const ArraysContract = artifacts.require("ArraysContract");

module.exports = function(deployer) {
    deployer.deploy(ArraysContract, [1, 2, 3]);
}