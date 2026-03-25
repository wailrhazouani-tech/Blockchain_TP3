// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ArraysContract {
    uint[] public numbers;

  constructor(uint[] memory _numbers) public {
    numbers = _numbers;
  }

  function addNumber(uint _number) public {
    numbers.push(_number);
  }
  function getElement(uint index) public view returns (uint) {
    require(index < numbers.length, "!! Index does not exist !!");
    return numbers[index];
  }
  function getArray() public view returns (uint[] memory) {
    return numbers;
  }
  function sumArray() public view returns (uint) {
    uint sum = 0;
    for (uint i = 0; i < numbers.length; i++) {
      sum += numbers[i];
    }
    return sum;
  }
}
