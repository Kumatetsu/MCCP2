const resContract = require('../contract.js');

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
                    'key' : result[0][i].c[0],
                    'provider': result[1][i],
                    'booker': result[2][i],
                    'type' : result[4][i].c[0],
                    'resourceId': result[3][i].c[0],
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

    app.get('/listAvailabilityDetails', function(req, res) {
        availabilityContract.listAvailabilityDetails(0)
        .then( (result) => {
            res.send(result);
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
