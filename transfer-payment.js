const { RippleAPI } = require('ripple-lib');
const assert = require('assert');

const RIPPLE_FROM_ADDRESS = 'r4GL6WvydAB1KJQpUaabGskCXytUARgp9j';
const RIPPLE_TO_ADDRESS = 'rKesKcX948wgmgNvTtxyzvWUe4wVi9nSfd';
const RIPPLE_FROM_SECRET = 'snHTpfzKE1cyb1RuNitB7u6rowDH9';

const api = new RippleAPI({
  //server: 'wss://s1.ripple.com'                 // MAINNET
  server: 'wss://s.altnet.rippletest.net:51233' // XRP Test Net
});

run().catch(error => console.error(error.stack));

async function run() {
  await api.connect();

  // Ripple payments are represented as JavaScript objects
  const payment = {
    source: {
      address: RIPPLE_FROM_ADDRESS,
      maxAmount: {
        value: '10.00',
        currency: 'XRP'
      }
    },
    destination: {
      address: RIPPLE_TO_ADDRESS,
      amount: {
        value: '10.00',
        currency: 'XRP'
      }
    }
  };

  // Get ready to submit the payment
  const prepared = await api.preparePayment(RIPPLE_FROM_ADDRESS, payment, {
    maxLedgerVersionOffset: 5
  });
  // Sign the payment using the sender's secret
  const { signedTransaction } = api.sign(prepared.txJSON, RIPPLE_FROM_SECRET);
  console.log('Signed', signedTransaction)

  // Submit the payment
  const res = await api.submit(signedTransaction);

  console.log('Done', res);
  process.exit(0);
}