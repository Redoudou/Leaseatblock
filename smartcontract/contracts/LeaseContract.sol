pragma solidity ^0.6.0;

contract Owned {

	address owner;

	constructor() public {
		owner = msg.sender;
	}

	modifier onlyOwner() {
		require(msg.sender == owner, "You do not have permission");
		_;
	}
}

contract LeaseAtBlock is Owned {
    
    enum Stage {
        L,
        O,
        E
    }
    
    struct Landlord {
        address eth;
        string legalName;
        string email;
        string signTerms;
        bool isActive;
    }
    
    struct Tenant {
        address eth;
        string legalName;
        string email;
        string signTerms;
        bool isActive;
        
    }
    
    struct House {
		string addressHouse;
		string type_of_property;
		uint startEpoch;
		uint endEpoch;
		uint monthDuration;
		uint rentAmount;
		uint securityFee;
		uint registerFee;
		bool enrolled;
	}
	
	struct Lease {
		address landlord;
		address tenant;
		string signLandlord;
		string signTenant;
		Stage status;
		bool isCompleted;
	}
	
	House[] houseArray;
	Lease[] leaseArray;
	Tenant[] tenantArray;
	Landlord[] landlordArray;
	
	mapping(address => Tenant) public tenantMapping;
	mapping(address => Landlord) public landlordMapping;
	
	// address of other creator will determine the lease
	mapping(address => Lease) leaseRequestArray;
	
	
	modifier onlyTenant() {
	    require(tenantMapping[msg.sender].isActive, "You are not tenant");
	    _;
	}
	
	modifier onlyLandlord() {
	    require(landlordMapping[msg.sender].isActive);
	    _;
	}
	
	modifier isHomeAccepted(uint _houseId) {
	    require(houseArray[_houseId].enrolled, "House is not exist");
	    _;
	}
	
	function tenantRegister(string memory _legalName, string memory _email, string memory _signTerm) public {
	    Tenant memory newTenant = Tenant(msg.sender, _legalName, _email, _signTerm, false);
	    
	    tenantMapping[msg.sender] = newTenant;
	}
	
	function landlordRegister(string memory _legalName, string memory _email, string memory _signTerm) public {
	    Landlord memory newLandlord = Landlord(msg.sender, _legalName, _email, _signTerm, false);
	    landlordMapping[msg.sender] = newLandlord;
	}
	
    /**************************************************************
                    HCR FUNCIONS
    ***************************************************************/
    
	function acceptTenant(address _tenantAddress) public onlyOwner {
	    tenantMapping[_tenantAddress].isActive = true;
	    tenantArray.push(tenantMapping[_tenantAddress]);
	}
	
	function acceptLandlord(address _landlordAddress) public onlyOwner {
	    landlordMapping[_landlordAddress].isActive = true;
	    landlordArray.push(landlordMapping[_landlordAddress]);
	}
	
	function acceptHouseRequest(uint _houseId) public onlyOwner {
	    houseArray[_houseId].enrolled = true;
	}
	

    /**************************************************************
                    LANDLORD FUNCIONS
    ***************************************************************/
    
    
    function houseRegister(string memory _addressHouse, string memory type_of_property, uint _startEpoch, uint _endEpoch, uint _monthDuration, uint _rentAmount, uint _securityFee, uint _registerFee) 
    public 
    {
	    House memory newHouse = House(_addressHouse, type_of_property, _startEpoch, _endEpoch, _monthDuration, _rentAmount, _securityFee, _registerFee, false);
	    houseArray.push(newHouse);
	}
	
	function landlordCreateLeaseAgreement(address _tenantAddress, string memory _signLandlord) 
    public 
    {
	    Lease memory newLease = Lease(msg.sender, _tenantAddress, _signLandlord, "", Stage.O, false);
	    leaseRequestArray[msg.sender] = newLease;
	}
	
	
	
	
	/**************************************************************
                    TENANT FUNCIONS
    ***************************************************************/
    
    function tenantCreateLeaseAgreement(address _landlordAddress, string memory _signTenant) 
    public 
    {
	    Lease memory newLease = Lease(msg.sender, _landlordAddress, "", _signTenant, Stage.O, false);
	    leaseRequestArray[msg.sender] = newLease;
	}
    
    function acceptLeaseAgreement(address _landlordAddress, string memory _signTerm) 
    public 
    {
	    leaseRequestArray[_landlordAddress].signTenant = _signTerm;
	    leaseRequestArray[_landlordAddress].isCompleted = true;
	    
	    // push to lease array
	    leaseArray.push(leaseRequestArray[_landlordAddress]);
	    // delete lease from request array
	    delete leaseRequestArray[_landlordAddress];
	}


    /**************************************************************
                    GETTING LEASE DATA
    ***************************************************************/
	function getLease(uint _leaseId) public view returns(address, address, string memory, string memory, Stage) {
	    return (leaseArray[_leaseId].landlord, leaseArray[_leaseId].tenant, leaseArray[_leaseId].signLandlord, leaseArray[_leaseId].signTenant, leaseArray[_leaseId].status);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}