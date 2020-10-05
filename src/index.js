const wan = require('./wan');
const evmConfig = require('./config.evm.json');

async function start() {
  let network = {
    name: 'Wanchain Testnet',
    rpc: 'https://gwan-ssl.wandevs.org:46891',
    stdReferenceBasicAddress: '0xB1F51B47Af26cE24d3596F4231CcFC848b8bfe43',
  };
  let response = await wan.updateWanBridge(network, evmConfig);
  console.log(response);
}

(async () => {
  console.log('===== 🚀 Feeder Starting =====');
  try {
    await start();
    console.log('===== 🌟 Feeder Success =====');
  } catch (e) {
    console.log('===== 😭 Feeder Error =====');
    console.log(e);
  }
})();
