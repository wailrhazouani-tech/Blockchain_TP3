// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract GestionChainesContract {
  string public message;

  function setMessage(string memory newMessage) public {
    message = newMessage;
  } 
  function getMessage() public view returns (string memory) {
    return message;
  }

  function concatener(string memory a, string memory b) public pure returns (string memory) {
    return string.concat(a, b);
  }
  function concatenerAvec(string memory a) public view returns (string memory) {
    return string.concat(message, a);
  }
  function longueur(string memory chaine) public pure returns (uint) {
    return bytes(chaine).length;
  }
  function comparer(string memory a, string memory b) public pure returns (bool) {
    return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
  }
}
