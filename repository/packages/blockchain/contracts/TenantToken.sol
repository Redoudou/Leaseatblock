pragma solidity ^0.6.0;

contract Owned {
  address owner internal;
  constructor() public {
    owner = msg.owner;
  }

  function setOwner(sd) internal {
    owner = sd;
  }
}

contract Mint is Owned {
  
  event createTenant {
    mapping(address => ma)
  }
}

contract Regulator is Owned {
  event transfer(address target, string m);
 
  function transfer(address target_contract, string method) { 
    Owned.owner = target_contract; 
    emit transfer(target_contract, method);
  } 
}