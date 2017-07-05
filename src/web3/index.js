import {
  PARITY_URL,
  CONTRACT_ADDRESS,
} from '../common'

var Web3 = require('web3');
var VertogasJSON = require('./VertogasRegistrar.json');

const parityProvider = PARITY_URL
const web3 = new Web3(new Web3.providers.HttpProvider(parityProvider));

const contractAddress = CONTRACT_ADDRESS
const VertogasContract = web3.eth.contract(VertogasJSON.abi)
const VertogasInstance = VertogasContract.at(contractAddress)

const defaultSender = 	web3.eth.accounts[0]
const defaultSenderPassword = '000000'

const formatDate = (date) => {
  const jsonDate = (new Date(date)).toJSON();
  return jsonDate.slice(0, 10) + ' ' + jsonDate.slice(11, 19)
  
};

const vertogas = (vertogasInstance=VertogasInstance, sender=defaultSender) => {
  const unlockAccount = (password=defaultSenderPassword) => {
    const unlocked = web3.personal.unlockAccount(sender, password);
    return unlocked
  }

  const getTransactionReceipt = (txHash, callback) => {
    web3.eth.getTransactionReceipt(txHash, (error, receipt) => {
      if (error) {
        throw error;
      } else if (!!receipt) {
        // Transaction hash
        console.log(`Transaction has been mined in block ${receipt.blockNumber}!!`);
        callback(receipt)
      } else {
        console.log(`Transaction pending...`);
        setTimeout(function () {
          getTransactionReceipt(txHash, callback);
        }, 1000);
      };
	  });
  }

  const getNewCertificateLogs = function(receipt, callback) {
    const blockNumber = receipt.blockNumber
    const block = web3.eth.getBlock(blockNumber)
    const event = vertogasInstance.NewCertificate(null, {
      fromBlock: blockNumber,
      toBlock: blockNumber,
    })
    event.get((error, logs) => {
      callback({
        certifID: logs[0].args.certifID,
        metaData: logs[0].args.metaData,
        owner: logs[0].args.owner,
        timestamp: formatDate(block.timestamp * 1000 - 7200),
      })
    });
  }

  const newCertificate = (metadata, owner, callback) => {
    if (unlockAccount()) {
      vertogasInstance.newCertificate.sendTransaction(
        metadata, owner, {from: sender, gas: 100000, gasPrice: 20000000000}, (error, txHash) => {
          if (!error) {
            console.log("Transaction sent! TxHash :", txHash)
            getTransactionReceipt(txHash, (receipt) => {getNewCertificateLogs(receipt, callback)});
          } else {
            throw error;
          }
        }
      );
    }
  }

  const getClaimLogs = function(receipt, callback) {
    const blockNumber = receipt.blockNumber
    const block = web3.eth.getBlock(blockNumber)
    const event = vertogasInstance.Claim(null, {
      fromBlock: blockNumber,
      toBlock: blockNumber,
    })
    event.get((error, logs) => {
      callback({
        certifID: logs[0].args.certifID,
        claimer: logs[0].args.from,
        timestamp: formatDate(block.timestamp * 1000 - 7200),
      })
    });
  }

  const claim = (certificateId, callback) => {
    if (unlockAccount()) {
      vertogasInstance.claim.sendTransaction(
        certificateId, {from: sender, gas: 100000, gasPrice: 20000000000}, (error, txHash) => {
          if (!error) {
            console.log("Transaction sent! TxHash :", txHash)
            getTransactionReceipt(txHash, (receipt) => {getClaimLogs(receipt, callback)});
          } else {
            throw error;
          }
        }
      );
    }
  }

  return {
    newCertificate,
    claim,
  }
}

module.exports = vertogas;

