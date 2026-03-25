const RectangleContract = artifacts.require("RectangleContract");

module.exports = function (deployer) {
    deployer.deploy(RectangleContract, 10, 20, 5, 4)
}