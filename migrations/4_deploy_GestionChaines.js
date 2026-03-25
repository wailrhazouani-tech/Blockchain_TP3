const GestionChainesContract = artifacts.require("GestionChainesContract");

module.exports = function( deployer) {
    deployer.deploy(GestionChainesContract)
}