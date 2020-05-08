pragma solidity ^0.6.0;

contract Owned {
  address owner;

  constructor() public {
    owner = msg.owner;
  }
   
  function setOwner(address newOwner) internal {
    owner = newOwner  
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "You do not have permission to edit this listing");
  }
}



contract Lease is Owned {

  uint BIN = 0

  struct Landlord {
    address eth;
    string legalName;
    string idHash;
    bool isConfirmed;
  }

  struct Regulator {
    address eth;
    string legalName;
    string idHash;
    bool isConfirmed;
  }

  struct Tenant {
    address eth;
    string legalName;
    string idHash;
    bool isConfirmed;
  }
}

contract MigrateOwner is Lease {

  event Migrate(string _message);
  address public newOwner;

  function change(uint owner, uint previousOwner) public {
    if (Lease.Stage == s1) {
      newOwner = Lease.Landlord.eth
    }
    if (Lease.Stage == s2) {
      newOwner = Lease.Tenant.eth
    }
    if (Lease.Stage == s3) {
      newOwner = Lease.Regulator.eth
    }
    Lease.Owner.setOwner(newOwner);
  }

}