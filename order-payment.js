'use strict';
const RippleAPI = require('ripple-lib').RippleAPI;

const api = new RippleAPI({
  //server: 'wss://s1.ripple.com'                 // MAINNET
  server: 'wss://s.altnet.rippletest.net:51233' // XRP Test Net
});


api.connect().then(() => {
  /* begin custom code ------------------------------------ */
  const myAddress = 'r4GL6WvydAB1KJQpUaabGskCXytUARgp9j';

  console.log('Ordering account of: ', myAddress);
  const order = {
    "direction": "buy",
    "quantity": {
      "currency": "USD",
      "counterparty": "rMH4UxPrbuMa1spCBR98hLLyNJp4d8p4tM",
      "value": "10.1"
    },
    "totalPrice": {
      "currency": "XRP",
      "value": "2"
    },
    "passive": true,
    "fillOrKill": true
  };
return api.prepareOrder(myAddress, order)

}).then(info => {
  console.log(info);
  console.log('getAccountInfo done');

  /* end custom code -------------------------------------- */
}).then(() => {
  return api.disconnect();
}).then(() => {
  console.log('done and disconnected.');
}).catch(console.error);
