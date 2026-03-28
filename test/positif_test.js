const PositifNumberContract = artifacts.require("PositifNumberContract");

contract("PositifNumberContract", (accounts) => {
  let instance;

  beforeEach(async () => {
    instance = await PositifNumberContract.new();
  });

  it("should return true for a positive number (10)", async () => {
    const result = await instance.estPositif(10);
    assert.equal(result, true, "10 should be positive");
  });

  it("should return true for zero", async () => {
    const result = await instance.estPositif(0);
    assert.equal(result, true, "0 should be considered positive/neutral");
  });

  it("should return false for a negative number (-5)", async () => {
    const result = await instance.estPositif(-5);
    assert.equal(result, false, "-5 should not be positive");
  });

  it("should handle large negative numbers", async () => {
    const result = await instance.estPositif(-1000000);
    assert.equal(result, false);
  });
});