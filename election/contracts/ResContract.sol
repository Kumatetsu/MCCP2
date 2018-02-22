pragma solidity ^0.4.2;

/* Availabilities implementation */
contract ResContract {
    
    enum BookingStatus { REQUESTED, REJECTED, CONFIRMED, CANCELLED  }
    struct Availability {
        address                 _provider;  // address of the provider
        address                 _booker;    // address of the booker
	    uint                    _resourceId ;   // resource id OR bundle id
	        uint                    _type;   // Type of Availability
		    uint                    _minDeposit ; // minimum BTU deposit for booking this resource
		        uint                    _commission ; // commission amount paid to booker in BTU
        uint                    _freeCancelDateTs; // Limit date for a reservation cancellation
        uint                    _startDateTs;   //availability start date timestamps
        uint                    _endDateTs;   //availability end date timestamps
	    BookingStatus           _bookingStatus ; // reservation status
    }

    uint public availabilityCount;
    mapping (uint => Availability) public availabilities;

    //Submit one or multiple availability - production implementation should be off-chain
    function publishAvailability ( uint _type, uint _minDeposit,
                                   uint _commission, uint _freeCancelDateTs, uint _startDateTs, uint _endDateTs,
                                   BookingStatus _bookingStatus)
    public returns (BookingStatus status) 
    {
        availabilities[availabilityCount] = Availability( msg.sender, 0x0, availabilityCount, _type, _minDeposit,
                                                          _commission, _freeCancelDateTs, _startDateTs, _endDateTs,
                                                          _bookingStatus);
        availabilityCount++;
        return _bookingStatus;
    }

    //An overview of all availabilities
    function listAvailabilitiesOverview ()
    public constant returns (uint[], address[], address[], 
                             uint[], uint[], BookingStatus[])
    {
        uint[] memory              keys = new uint[](availabilityCount);
        address[] memory           providers = new address[](availabilityCount);
        address[] memory           bookers = new address[](availabilityCount);
	    uint[] memory              resourceIds = new uint[](availabilityCount);
	        uint[] memory              types = new uint[](availabilityCount);
        uint[] memory              startDateTs = new uint[](availabilityCount);
        uint[] memory              endDateTs = new uint[](availabilityCount);
        BookingStatus[] memory     bookingStatuses = new BookingStatus[](availabilityCount);

        for (uint i = 0 ; i < availabilityCount ; i++) {
            keys[i] = i;
            providers[i] = availabilities[i]._provider;
            bookers[i] = availabilities[i]._booker;
            resourceIds[i] = availabilities[i]._resourceId;
            types[i] = availabilities[i]._type;
            startDateTs[i] = availabilities[i]._startDateTs;
            endDateTs[i] = availabilities[i]._endDateTs;
            bookingStatuses[i] = availabilities[i]._bookingStatus;
        }
        return (keys, providers, bookers,
                resourceIds, types, bookingStatuses);
    }

    //All details from one availability
    function listAvailabilityDetails (uint availabilityNumber)
    public constant returns (uint, uint, uint,
                             uint, BookingStatus)
    {
        uint             minDeposit;
	    uint             commission;
        uint             freeCancelDateTs;
        BookingStatus    bookingStatus;

        minDeposit = availabilities[availabilityNumber]._minDeposit;
        commission = availabilities[availabilityNumber]._commission;
        freeCancelDateTs = availabilities[availabilityNumber]._freeCancelDateTs;
        bookingStatus = availabilities[availabilityNumber]._bookingStatus;
        return (availabilityNumber, minDeposit, commission, freeCancelDateTs, bookingStatus);
    }

    //Request reservation
    function requestReservation (uint availabilityNumber)
    public returns (BookingStatus)
    {
        availabilities[availabilityNumber]._bookingStatus = BookingStatus.REQUESTED;
        return (availabilities[availabilityNumber]._bookingStatus);
    }
}