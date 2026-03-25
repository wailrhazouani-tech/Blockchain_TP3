// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./FormeContract.sol";

contract RectangleContract is FormeContract{
  uint public lo;
  uint public la;

  constructor(uint _x, uint _y, uint _lo, uint _la) FormeContract(_x, _y)public {
    lo = _lo;
    la = _la;
  }

  function surface() public override view returns (uint) {
    return lo * la;
  }
  function afficheInfos() public override pure returns (string memory) {
    return "Je suis Rectangle";
  }
  function afficheLoLa() public view returns (uint, uint) {
    return (lo, la);
  }
}
