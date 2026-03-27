const AdditionContract = artifacts.require("AdditionContract");

contract("AdditionContract", (accounts) => {
  let instance;
  const initialNum1 = 10;
  const initialNum2 = 20;

  beforeEach(async () => {
    instance = await AdditionContract.new(initialNum1, initialNum2);
  });

  it("should verify constructor values", async () => {
    const n1 = await instance.number1();
    const n2 = await instance.number2();
    assert.equal(n1.toNumber(), initialNum1);
    assert.equal(n2.toNumber(), initialNum2);
  });

  it("should test addition1", async () => {
    const result = await instance.addition1();
    assert.equal(result.toNumber(), 30);
  });

  it("should test addition2", async () => {
    const result = await instance.addition2(5, 7);
    assert.equal(result.toNumber(), 12);
  });
});