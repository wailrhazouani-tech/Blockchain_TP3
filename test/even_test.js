const EvenContract = artifacts.require("EvenContract");

contract("EvenContract", (accounts) => {
  let instance;

  beforeEach(async () => {
    instance = await EvenContract.new();
  });

  it("should return true for an even number (4)", async () => {
    const result = await instance.isEven(4);
    assert.equal(result, true, "4 should be identified as even");
  });

  it("should return false for an odd number (7)", async () => {
    const result = await instance.isEven(7);
    assert.equal(result, false, "7 should be identified as odd");
  });

  it("should return true for zero", async () => {
    const result = await instance.isEven(0);
    assert.equal(result, true, "0 is mathematically even");
  });

  it("should handle a very large even number", async () => {
    const largeEven = "1000000000000000000"; // 1 ETH in Wei
    const result = await instance.isEven(largeEven);
    assert.equal(result, true);
  });
});