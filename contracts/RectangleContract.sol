// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./FormeContract.sol";

contract RectangleContract is FormeContract {
  uint public lo; // length
  uint public la; // width

  constructor(uint _x, uint _y, uint _lo, uint _la) FormeContract(_x, _y) public {
    lo = _lo;
    la = _la;
  }

  // New function to update dimensions
  function changeDimensions(uint _newLo, uint _newLa) public {
    lo = _newLo;
    la = _newLa;
  }

  function surface() public override view returns (uint) {
    return lo * la; 
  }

  function afficheInfos() public override pure returns (string memory) {
    return "I am a Rectangle"; 
  }

  function afficheLoLa() public view returns (uint, uint) {
    return (lo, la);
  }
}