const PaymentContract = artifacts.require("PaymentContract");

contract("PaymentContract", (accounts) => {
  let instance;
  const recipient = accounts[1];
  const sender = accounts[2];
  const hacker = accounts[3];

  beforeEach(async () => {
    instance = await PaymentContract.new(recipient);
  });

  it("should accept a payment and increase contract balance", async () => {
    const amount = web3.utils.toWei("1", "ether");
    
    await instance.receivePayment({ from: sender, value: amount });
    
    const balance = await web3.eth.getBalance(instance.address);
    assert.equal(balance, amount, "Contract did not receive the Ether");
  });

  it("should fail if payment is 0 Wei", async () => {
    try {
      await instance.receivePayment({ from: sender, value: 0 });
      assert.fail("Should have reverted");
    } catch (error) {
      assert(error.message.includes("send more than 0 Wei"));
    }
  });

  it("should block non-recipients from withdrawing", async () => {
    await instance.receivePayment({ from: sender, value: web3.utils.toWei("1", "ether") });
    
    try {
      await instance.withdraw({ from: hacker });
      assert.fail("Hacker was able to withdraw!");
    } catch (error) {
      assert(error.message.includes("Recipient address incorrect"));
    }
  });

  it("should allow the recipient to withdraw all funds", async () => {
    const depositAmount = web3.utils.toWei("2", "ether");
    await instance.receivePayment({ from: sender, value: depositAmount });

    const initialRecipientBalance = await web3.eth.getBalance(recipient);
    
    await instance.withdraw({ from: recipient });
    
    const finalContractBalance = await web3.eth.getBalance(instance.address);
    const finalRecipientBalance = await web3.eth.getBalance(recipient);

    assert.equal(finalContractBalance, "0", "Contract should be empty");
    assert(
      Number(finalRecipientBalance) > Number(initialRecipientBalance), 
      "Recipient balance should have increased"
    );
  });
});