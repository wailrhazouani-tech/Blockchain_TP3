// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract PositifNumberContract {
  // We change returns(bool) to returns(string) to distinguish 'nul'
  function estPositif(int number) public pure returns (string memory) {
    if (number > 0) {
      return "positif";
    } else if (number < 0) {
      return "negatif";
    } else {
      return "nul";
    }
  }
}