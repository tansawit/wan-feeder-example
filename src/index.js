const Web3 = require('web3');
const wan = require('./wan');
const evmConfig = require('./config.evm.json');

async function start() {
  let network = {
    name: 'Wanchain Testnet',
    rpc: 'https://gwan-ssl.wandevs.org:46891',
    bridgeAddress: '0x97917858f167a166b2004d6f5c10268d447e9f43',
    gasPrice: 20,
    type: 'WAN',
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
