const CryptoConverterContract = artifacts.require("CryptoConverterContract");

contract("CryptoConverterContract", (accounts) => {
  let instance;

  beforeEach(async () => {
    instance = await CryptoConverterContract.new();
  });

  it("should convert 1 Ether to its Wei equivalent", async () => {
    const etherAmount = 1;
    // 1 Ether = 1,000,000,000,000,000,000 Wei
    const expectedWei = web3.utils.toWei("1", "ether");

    const result = await instance.etherEnWei(etherAmount);

    assert.equal(result.toString(), expectedWei, "Conversion to Wei failed");
  });

  it("should convert Wei back to 1 Ether", async () => {
    const weiAmount = web3.utils.toWei("1", "ether");
    const expectedEther = 1;

    const result = await instance.weiEnEther(weiAmount);

    assert.equal(result.toNumber(), expectedEther, "Conversion to Ether failed");
  });

  it("should handle large amounts (e.g., 50 Ether)", async () => {
    const etherAmount = 50;
    const resultInWei = await instance.etherEnWei(etherAmount);
    
    // We use web3.utils.fromWei to check the reverse logic
    const backToEther = web3.utils.fromWei(resultInWei, "ether");
    
    assert.equal(backToEther, "50", "Large amount conversion failed");
  });
});