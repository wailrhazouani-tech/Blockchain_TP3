const CryptoConverterContract = artifacts.require("CryptoConverterContract");

module.exports = function (deployer) {
    deployer.deploy(CryptoConverterContract)
}