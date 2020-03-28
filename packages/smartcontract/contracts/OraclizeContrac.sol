pragma solidity ^0.6.0;
import "github.com/oraclize/ethereum-api/oraclizeAPI_0.4.sol";

contract ConversionContract is usingOraclize {

    uint price;
    event LogNewOraclizeQuery(string message);

    function getConversionRate() public view returns(uint) {
       return price;
    }

    function __callback(bytes32 _myid, string _result) public {
        require (msg.sender == oraclize_cbAddress(), "");
        price = parseInt(_result);
    }

    function fetchLatestPrice() external payable {

        if (oraclize_getPrice("URL") > this.balance)
           emit LogNewOraclizeQuery("Oraclize query was NOT sent, please add some ETH to cover for the query fee");
        else {
            emit LogNewOraclizeQuery("Oraclize query was sent, standing by for the answer..");
            emit oraclize_query("URL","json(https://api.coinbase.com/v2/prices/ETH-INR/buy).data.amount");
       }
    }
}