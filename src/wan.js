const Web3 = require('web3');
const WanTx = require('wanchainjs-tx');

function signTxWan(nonce, data, prvKey, to, chainId) {
  const txParams = {
    Txtype: '0x01',
    nonce: nonce,
    gasPrice: '0x2a600b9c00',
    gas: '0x0f4240',
    to,
    value: '0x00',
    data: data,
    chainId: chainId,
  };

  const privateKey = Buffer.from(prvKey, 'hex');
  const tx = new WanTx(txParams);
  tx.sign(privateKey);
  const serializedTx = tx.serialize();
  return '0x' + serializedTx.toString('hex');
}

async function updateWanBridge(network, evmConfig) {
  let web3 = new Web3(new Web3.providers.HttpProvider(network.rpc));
  let contract = new web3.eth.Contract(
    evmConfig.contracts.STDREFERENCEPROXY,
    evmConfig.wallet.WALLET_ADDRESS
  );
  let encodedData = contract.methods.relay(['BTC'], [123], [12345678], [10]).encodeABI();

  let nonce = await web3.eth.getTransactionCount(evmConfig.wallet.WALLET_ADDRESS);

  const rawTx = signTxWan(
    nonce,
    encodedData,
    evmConfig.wallet.WALLET_PRIVATE_KEY,
    network.stdReferenceBasicAddress,
    3
  );
  const receipt = await web3.eth.sendSignedTransaction(rawTx);
  return receipt;
}

module.exports = {
  updateWanBridge,
};
