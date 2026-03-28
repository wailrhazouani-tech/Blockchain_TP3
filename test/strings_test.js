const GestionChainesContract = artifacts.require("GestionChainesContract");

contract("GestionChainesContract", (accounts) => {
  let instance;

  beforeEach(async () => {
    instance = await GestionChainesContract.new();
  });

  it("should set and get the message correctly", async () => {
    await instance.setMessage("Hello Web3");
    const msg = await instance.getMessage();
    assert.equal(msg, "Hello Web3");
  });

  it("should concatenate two strings", async () => {
    const result = await instance.concatener("Hello ", "World");
    assert.equal(result, "Hello World");
  });

  it("should concatenate with the stored message", async () => {
    await instance.setMessage("Solidity");
    const result = await instance.concatenerAvec(" is fun");
    assert.equal(result, "Solidity is fun");
  });

  it("should return the correct length of a string", async () => {
    const len = await instance.longueur("Truffle");
    assert.equal(len.toNumber(), 7);
  });

  it("should compare two strings correctly", async () => {
    const isSame = await instance.comparer("apple", "apple");
    const isDifferent = await instance.comparer("apple", "orange");
    
    assert.equal(isSame, true, "Same strings should return true");
    assert.equal(isDifferent, false, "Different strings should return false");
  });
});