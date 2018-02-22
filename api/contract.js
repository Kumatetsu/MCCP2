var Web3       = require('web3');
var Contract   = require('truffle-contract');

const resContractArtifact = require('../election/build/contracts/ResContract.json');
const resContract         = Contract(resContractArtifact);

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3("http://127.0.0.1:8545");
    web3.eth.getAccounts().then( function(accts){ web3.eth.defaultAccount = accts[0]});
    web3.eth.defaultAccount = '0x627306090abaB3A6e1400e9345bC60c78a8BEf57';
}

resContract.defaults(
    {
        from: web3.eth.defaultAccount,
        gas:3000000
    }
);
resContract.setProvider(web3.currentProvider);

resContract.currentProvider.sendAsync = function () {
    return resContract.currentProvider.send.apply(resContract.currentProvider, arguments);
};

module.exports = resContract;
