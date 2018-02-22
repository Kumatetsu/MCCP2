const resContract = require('../contract.js'),
      Web3        = require('web3');

var availabilityContract;
resContract.deployed().then(function (instance){
    availabilityContract = instance;
});

module.exports = function (app) {
    app.get('/viewAvailabilities', function(req, res) {
        availabilityContract.listAvailabilitiesOverview()
        .then( (result) => {
            var contracts = [];
            var length = result[0].length;

            for (i = 0; i < length; i++) {
                var tmp = {
                    'key' :            result[0][i].c[0],
                    'provider':        result[1][i],
                    'booker':          result[2][i],
                    'type' :           result[4][i].c[0],
                    'resourceId':      result[3][i].c[0],
                    'bookingStatuses': result[5][i].c[0]
                };
                contracts.push(tmp);
            }

            res.json(contracts);
        })
        .catch ((err) => {
            console.log(err);
        })
    });

    app.get('/availability/:nbr', function(req, res) {
        var id = req.params.nbr;

        availabilityContract.listAvailabilityDetails(id)
        .then( (result) => {
            console.log(Web3);
            var availability = {
                'id': result[0].c[0],
                'min_deposit': result[1].c[0],
                'commission': result[2].c[0],
                'freeCancelDate': result[3].c[0],
                'bookingStatus': result[4].c[0],
                'metaDataLink': Web3.utils.toUtf8(result[5])
            };
            console.log (availability);
            res.send(availability);
        })
        .catch ((err) => {
            console.log(err);
        })
    });

    app.post('/addAvailability', function(req, res) {
        console.log (req);
        availabilityContract.publishAvailability(0, 0, 0, 0, 0, 0, 0, "test")
        .then( (result) => {
            res.send(result);
        }).catch ((err) => {
            console.log(err);
        })
    });
};
