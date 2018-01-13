// 1. set ammount
// getTradeAddress() then
// send set ammount sbd to trade address if in wallet

// 2.
// claim and rewards from steem
// checks account over limit e.g 20 sbd
//  takes 50% for eth
//  takes 25% for litecoin
//  takes 25% for steem

const req = require('request');
const rp = require('request-promise-native');
const steem = require('steem');


const ACCOUNT_NAME = ''
const ACCOUNT_WIF = ''
const TRADE_AMOUNT = '0.100 STEEM'
const MINIMUM_BALANCE = 10


// InitiateTradeModel1 {
// inputCoinType (string): the type of coin which the user wishes to trade,
// outputCoinType (string): the type of coin the user wishes to receive as a result of the trade,
// outputAddress (string): the output address where the converted funds should be sent,
// outputMemo (string, optional): the memo to be sent with all outputs to this address (on blockchains that support memos),
// refundAddress (string, optional): the nickname of the refund address where unconverted funds should be sent. Refunds are currently processed manually.,
// refundMemo (string, optional): the memo to be sent with all outputs to this refund address (on blockchains that support memos),
// inputAddressType (string, optional): the type of input address to use, either "unique_address" or "shared_address_with_memo". If you do not supply this parameter, the default for the input wallet will be used. Generally, the default will be what want.,
// sessionToken (string, optional): the token identifying the session. If missing, a new user ID will be created
// }



// Get balance
function getCurrentBalance(){
    return new Promise( (resolve, reject) => {
        steem.api.getAccounts([ACCOUNT_NAME], function(err, result) {
            let balance = {
              'sbd': result[0].sbd_balance,
              'steem': result[0].balance
            }
            resolve(balance)
        })
    });
}

// getTradeAddress().then( data => {
//   console.log(data.inputAddress)
//   console.log(data.inputMemo)
// })
steem.api.setOptions({ url: 'wss://rpc.buildteam.io' });

getCurrentBalance().then(data => console.log(data))

// sendSbd(TRADE_AMOUNT, '', 'TEST SEND VIA SCRIPT').then( data => {
//   console.log(data)
// })

function getTradeAddress(){
  // returns
  // {"inputAddress":"blocktrades","inputMemo":"17a6816b-c303-4aa5-9851-4331b3d19051","inputCoinType":"sbd","outputAddress":"0xe4266B174aF95720F40b658143F9ac45ef1cA15d","outputCoinType":"eth","refundAddress":null,"flatTransactionFeeInInputCoinType":"0.204"}
  //

  let data = {
    'inputCoinType' : 'sbd',
    'outputCoinType' : 'eth',
    'outputAddress' : '0xe4266B174aF95720F40b658143F9ac45ef1cA15d',
    'refundAddress': 'sambillingham',
    'refundMemo': 'AUTO TRADE FROM AVG_BOT: REFUND'
    }

  return rp.post( {
    url: 'https://blocktrades.us:443/api/v2/simple-api/initiate-trade/',
    form : data,
    method: 'POST'
  })
}

function sendSbd(amount, to, memo) {
  return new Promise( (resolve, reject) => {

    steem.broadcast.transfer(ACCOUNT_WIF, ACCOUNT_NAME, to, amount, memo, (err, result) => {
      if (err) throw err

      resolve(result);
    });
  })
}
