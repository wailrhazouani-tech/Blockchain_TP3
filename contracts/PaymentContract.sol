// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract PaymentContract {
  address public recipient;

  constructor(address _recipient) public {
    recipient = _recipient;
  }

  // ADD THIS FUNCTION
  function setRecipient(address _newRecipient) public {
    recipient = _newRecipient;
  }

  function receivePayment() public payable {
    require(msg.value > 0, "Send more than 0");
  }

  function withdraw() public {
    require(msg.sender == recipient, "Only recipient can withdraw");
    payable(recipient).transfer(address(this).balance);
  }
}