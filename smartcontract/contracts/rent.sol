pragma solidity ^0.6.0;

contract RentalAgreement {
    /* This declares a new complex type which will hold the paid rents*/
    struct PaidRent {
        uint256 id; /* The paid rent id*/
        uint256 value; /* The amount of rent that is paid*/
    }

    PaidRent[] public paidrents;

    uint256 public createdTimestamp;

    uint256 public rent;
    /* Combination of zip code and house number*/
    string public house;

    address payable public landlord;

    address public tenant;
    enum State {Created, Started, Terminated}
    State public state;

    constructor(uint256 _rent, string memory _house) public {
        rent = _rent;
        house = _house;
        landlord = msg.sender;
        createdTimestamp = block.timestamp;
    }

    modifier require(bool _condition) {
        if (!_condition) revert("");
        _;
    }

    modifier onlyLandlord() {
        if (msg.sender != landlord) revert("");
        _;
    }
    modifier onlyTenant() {
        if (msg.sender != tenant) revert("");
        _;
    }
    modifier inState(State _state) {
        if (state != _state) revert("");
        _;
    }

    /* We also have some getters so that we can read the values
    from the blockchain at any time */
    function getPaidRents() internal view returns (PaidRent[] memory) {
        return paidrents;
    }

    function getHouse() public view returns (string memory) {
        return house;
    }

    function getLandlord() public view returns (address) {
        return landlord;
    }

    function getTenant() public view returns (address) {
        return tenant;
    }

    function getRent() public view returns (uint256) {
        return rent;
    }

    function getContractCreated() public view returns (uint256) {
        return createdTimestamp;
    }

    function getContractAddress() public view returns (address) {
        return address(this);
    }

    function getState() public view returns (State) {
        return state;
    }

    /* Events for DApps to listen to */
    event agreementConfirmed();

    event paidRent();

    event contractTerminated();

    /* Confirm the lease agreement as tenant*/
    function confirmAgreement() public inState(State.Created) require(msg.sender != landlord)
    {
        emit agreementConfirmed();
        tenant = msg.sender;
        state = State.Started;
    }

    function payRent() public payable onlyTenant inState(State.Started) require(msg.value == rent)
    {
        emit paidRent();
        landlord.transfer(msg.value);
        paidrents.push(PaidRent({id: paidrents.length + 1, value: msg.value}));
    }
    /* Terminate the contract so the tenant can’t pay rent anymore,
    and the contract is terminated */
    function terminateContract() public payable onlyLandlord {
        emit contractTerminated();
        landlord.transfer(address(this).balance);
        /* If there is any value on the
               contract send it to the landlord*/
        state = State.Terminated;
    }
}
