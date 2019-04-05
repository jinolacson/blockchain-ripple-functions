'use strict';
const RippleAPI = require('ripple-lib').RippleAPI;
var keypairs = require('ripple-keypairs');

const api = new RippleAPI({
  //server: 'wss://s1.ripple.com'                 // MAINNET
  server: 'wss://s.altnet.rippletest.net:51233' // XRP Test Net
});

api.connect().then(() => { 
    /* begin custom code ------------------------------------ */
    return api.generateAddress();
}).then(address_info => {
    console.log("Secret: " + address_info.secret);
    console.log("Address: " + address_info.address);
    var keypair = keypairs.deriveKeypair(address_info.secret);
    var privateKey = keypair.privateKey;
    console.log("Private key: " + privateKey);
    var publicKey = keypair.publicKey;
    console.log("Public key: " + publicKey);
    var address = keypairs.deriveAddress(keypair.publicKey);
    console.log("Address: " + address);
    /* end custom code -------------------------------------- */
}).then(() => {
    return api.disconnect();
}).then(() => {
    console.log('done and disconnected.');
}).catch(console.error);