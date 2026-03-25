// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract AdditionContract {
  uint public number1;
  uint public number2;

  constructor(uint _number1, uint _number2) public {
    number1 = _number1;
    number2 = _number2;
  }

  function addition1() public view returns (uint){
    return number1 + number2;
  }

  function addition2(uint n1, uint n2) public pure returns (uint){
    return n1 + n2;
  }

}
