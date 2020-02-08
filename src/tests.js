/**
 * Sample browser application which uses a JavaScript library to interact
 * with a Monero daemon using RPC and a Monero wallet using RPC and WASM
 * bindings.
 */
require("monero-javascript");
const assert = require("assert");

/**
 * Run tests when document ready.
 */
document.addEventListener("DOMContentLoaded", function() {
  runTests();
});

/**
 * Run Monero tests.
 */
function runTests() {
  
  // mocha setup
  mocha.setup({
    ui: 'bdd',
    timeout: 3000000
  });
  mocha.checkLeaks();
  
  // test config
  TestUtils.PROXY_TO_WORKER = true; // proxy test wallet and daemon to worker to not lock main browser thread
  TestUtils.FS = require('memfs');  // use in-memory file system needed for tests since running in the browser
  
  // test utilitiles
  //new TestMoneroUtils().runTests();
  
//  // test daemon rpc
//  new TestMoneroDaemonRpc({
//    liteMode: true,             // skips some thorough but lengthy tests
//    testNonRelays: true,
//    testRelays: false,          // creates and relays outgoing txs
//    testNotifications: false,
//    // TODO: test proxyToWorker
//  }).runTests();
//  
//  // test wallet rpc
//  new TestMoneroWalletRpc({
//    liteMode: true, // skips some lengthy but detailed tests
//    testNonRelays: true,
//    testRelays: false,
//    testNotifications: false,
//    testResets: false
//  }).runTests();
//  
//  // test keys-only wallet
//  new TestMoneroWalletKeys({
//    liteMode: false,
//    testNonRelays: true,
//    testRelays: false,
//    testResets: false,
//    testNotifications: false
//  }).runTests();
  
  // test core wallet
  new TestMoneroWalletCore({
    liteMode: false,
    testNonRelays: true,
    testRelays: false,
    testResets: false,
    testNotifications: true,
  }).runTests();
  
  // run tests
  mocha.run();
}