// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract EvenContract {
  function isEven(uint number) public pure returns (bool) {
    return number % 2 == 0;
  }
}
