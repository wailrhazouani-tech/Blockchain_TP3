const ArraysContract = artifacts.require("ArraysContract");

contract("ArraysContract", (accounts) => {
  let instance;
  const initialArray = [10, 20, 30];

  beforeEach(async () => {
    instance = await ArraysContract.new(initialArray);
  });

  it("should initialize with correct elements", async () => {
    const array = await instance.getArray();
    assert.equal(array.length, 3);
    assert.equal(array[0].toNumber(), 10);
    assert.equal(array[2].toNumber(), 30);
  });

  it("should add a new number to the array", async () => {
    await instance.addNumber(40);
    const array = await instance.getArray();
    assert.equal(array.length, 4);
    assert.equal(array[3].toNumber(), 40);
  });

  it("should return a specific element by index", async () => {
    const element = await instance.getElement(1);
    assert.equal(element.toNumber(), 20);
  });

  it("should fail when getting an invalid index", async () => {
    try {
      await instance.getElement(99);
      assert.fail("Should have thrown an error");
    } catch (error) {
      assert(error.message.includes("Index does not exist"));
    }
  });

  it("should calculate the correct sum of the array", async () => {
    const sum = await instance.sumArray();
    assert.equal(sum.toNumber(), 60); // 10 + 20 + 30
  });

  it("should update sum after adding a number", async () => {
    await instance.addNumber(40);
    const sum = await instance.sumArray();
    assert.equal(sum.toNumber(), 100); // 60 + 40
  });
});