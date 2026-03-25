const PaymentContract = artifacts.require("PaymentContract");

module.exports = function(deployer, network, account) {
    deployer.deploy(PaymentContract, account[0])
}