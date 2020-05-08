pragma solidity ^0.6.0


/* util library for inline functions on addresses */

library Address {
  function isContract(address account) internal view returns (bool)  {
    uint256 size;

    assembly { size := extcodesize(account)}

    return size > 0;
  }
}