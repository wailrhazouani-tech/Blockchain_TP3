const PositifNumberContract = artifacts.require("PositifNumberContract");

module.exports = function(deployer) {
    deployer.deploy(PositifNumberContract)
}