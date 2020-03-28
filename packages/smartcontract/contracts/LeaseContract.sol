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
    
    uint BIN = 0;
    
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
        address landlord;
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
		string signHCR;
		uint BIN;
		Stage status;
		bool isCompleted;
	}
	
	Tenant[] tenantArray;
	Landlord[] landlordArray;
	
	mapping(address => Tenant) public tenantMapping;
	mapping(address => Landlord) public landlordMapping;
	mapping(address => House) public houseRegisterArray;
	mapping(uint => House) public houseArray;
	mapping(uint => Lease) public leaseArray;
	
	// address of other creator will determine the lease
	mapping(uint => Lease) leaseRequestArray;
	
	
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
	
	function acceptHouseRequest(address _addressOfLandlord) public onlyOwner {
	    require(houseRegisterArray[_addressOfLandlord].enrolled == false, "House register is not found");
	    houseRegisterArray[_addressOfLandlord].enrolled = true;
	    houseArray[BIN] = houseRegisterArray[_addressOfLandlord];
	    BIN++;
	}
	
	function HCRsignLeaseAgreement(uint _BIN, string memory _signHCRterm) 
    public 
    {
	    leaseRequestArray[_BIN].signHCR = _signHCRterm;
	    leaseRequestArray[_BIN].isCompleted = true;
	    
	    leaseArray[_BIN] = leaseRequestArray[_BIN];
	  
	    delete leaseRequestArray[_BIN];
	    
	}
	

    /**************************************************************
                    LANDLORD FUNCIONS
    ***************************************************************/
    
    
    function houseRegister(string memory _addressHouse, string memory type_of_property, uint _startEpoch, uint _endEpoch, uint _monthDuration, uint _rentAmount, uint _securityFee, uint _registerFee) 
    public 
    {
	    House memory newHouse = House(msg.sender, _addressHouse, type_of_property, _startEpoch, _endEpoch, _monthDuration, _rentAmount, _securityFee, _registerFee, false);
	    houseRegisterArray[msg.sender] = newHouse;
	}
	
	function landlordSignLeaseAgreement(uint _BIN, string memory _signLandlord) 
    public 
    {
	    leaseRequestArray[_BIN].signLandlord = _signLandlord;
	    
	}

	/**************************************************************
                    TENANT FUNCIONS
    ***************************************************************/
    
    function applyToHouse(uint _BIN, string memory _signTenant) 
    public 
    {
        address landlord = houseArray[_BIN].landlord;
	    Lease memory newLease = Lease(landlord, msg.sender, "", _signTenant, "", _BIN, Stage.O, false);
	    leaseRequestArray[_BIN] = newLease;
	}
    
    function tenantSignLeaseAgreement(uint _BIN, string memory _signTerm) 
    public 
    {
	    leaseRequestArray[_BIN].signTenant = _signTerm;
	}
	


    /**************************************************************
                    GETTING LEASE DATA
    ***************************************************************/
	function getLease(uint _leaseId) public view returns(address, address, string memory, string memory, Stage) {
	    return (leaseArray[_leaseId].landlord, leaseArray[_leaseId].tenant, leaseArray[_leaseId].signLandlord, leaseArray[_leaseId].signTenant, leaseArray[_leaseId].status);
	}
	
	
	
	
	
}