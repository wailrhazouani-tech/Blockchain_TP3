const EvenContract = artifacts.require("EvenContract");

module.exports = function(deployer) {
    deployer.deploy(EvenContract)
}