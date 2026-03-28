const RectangleContract = artifacts.require("RectangleContract");

contract("RectangleContract", (accounts) => {
  let instance;
  const initialX = 10;
  const initialY = 20;
  const initialLo = 5;
  const initialLa = 4;

  beforeEach(async () => {
    instance = await RectangleContract.new(initialX, initialY, initialLo, initialLa);
  });

  it("should initialize inherited coordinates correctly", async () => {
    const x = await instance.x();
    const y = await instance.y();
    assert.equal(x.toNumber(), initialX);
    assert.equal(y.toNumber(), initialY);
  });

  it("should initialize length and width correctly", async () => {
    const dimensions = await instance.afficheLoLa();
    assert.equal(dimensions[0].toNumber(), initialLo);
    assert.equal(dimensions[1].toNumber(), initialLa);
  });

  it("should calculate the surface (lo * la)", async () => {
    const area = await instance.surface();
    assert.equal(area.toNumber(), 20); // 5 * 4
  });

  it("should return the correct overridden info string", async () => {
    const info = await instance.afficheInfos();
    assert.equal(info, "Je suis Rectangle");
  });

  it("should allow moving the shape (inherited function)", async () => {
    await instance.deplacerForme(100, 200);
    const x = await instance.x();
    const y = await instance.y();
    assert.equal(x.toNumber(), 100);
    assert.equal(y.toNumber(), 200);
  });
});