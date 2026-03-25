// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract PaymentContract {
  address public recipient;

  constructor(address _recipient) public {
    recipient = _recipient;
  }

  function receivePayment() public payable {
    require(msg.value > 0, "!!!!!!!!!! You should send more than 0 Wei !!!!!!!!!!");
  }
  function withdraw() public {
    require(msg.sender == recipient, "!!!!!!!!!! Recipient address incorrect !!!!!!!!!!");
    payable(recipient).transfer(address(this).balance);
  }
}
