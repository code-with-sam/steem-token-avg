const req = require('request');
const rp = require('request-promise-native');
const steem = require('steem');
const schedule = require('node-schedule');

const ACCOUNT_NAME = ''
const ACCOUNT_WIF = ''
const TRADE_AMOUNT = '10.000 STEEM'
const MINIMUM_BALANCE = 0
const ETH_ADDRESS = '0xe4266B174aF95720F40b658143F9ac45ef1cA15d'
const tradeHour = 23
const tradeMinute = 06

const api = steem.api.setOptions({ url: 'wss://rpc.buildteam.io' });

// EVERY DAY TRANSFER at 10:30am 10SBD TO ETH IF over 20 in account

let scheduledTime = `${tradeMinute} ${tradeHour} * * *`
let timer = schedule.scheduleJob(scheduledTime, () => {
    sbdToEth()
})

// ---------------------------------------------------------
// DONT EDIT BELOW THIS LINE
// ---------------------------------------------------------


function steemToEth(){

  getCurrentBalance()
      .then(data => checkAmounts(data, 'steem'))
      .then(data => {
          getTradeAddress('steem', 'eth', ETH_ADDRESS).then( data => {
            let json = JSON.parse(data)
            sendTransfer(TRADE_AMOUNT, json.inputAddress, json.inputMemo)
          })
      })
      .catch(data => {
        console.log(data)
      })
}

function sbdToEth(){
  getCurrentBalance()
      .then(data => checkAmounts(data, 'sbd'))
      .then(data => {
          getTradeAddress('sbd', 'eth', ETH_ADDRESS).then( data => {
            let json = JSON.parse(data)
            console.log(TRADE_AMOUNT, json.inputAddress, json.inputMemo)
            // sendTransfer(TRADE_AMOUNT, json.inputAddress, json.inputMemo)
          })
      })
      .catch(data => {
        console.log(data)
      })
}




function checkAmounts(balance, tokenType){
  return new Promise( (resolve, reject) => {
      let value = balance[tokenType].split('.')
      value = parseInt(value[0])
      console.log(value)
      if (value >= MINIMUM_BALANCE){
        resolve(value)
      } else {
        reject('NOT ABOVE MUNIMUM ACCOUNT ACCOUNT BALANCE')
      }
  });
}

// Get balance
function getCurrentBalance(){
    return new Promise( (resolve, reject) => {
        steem.api.getAccounts([ACCOUNT_NAME], (err, result) => {
            let balance = {
              sbd: result[0].sbd_balance,
              steem: result[0].balance
            }
            resolve(balance)
        })
    });
}


function getTradeAddress(inputType, outputType, outputAddress){
  //  e.g 'steem', 'eth', ETH_ADDRESS

  let data = {
    'inputCoinType' : inputType,
    'outputCoinType' : outputType,
    'outputAddress' : outputAddress,
    'refundAddress': ACCOUNT_NAME,
    'refundMemo': 'AUTO TRADE FROM AVG_BOT: REFUND'
    }

  return rp.post( {
    url: 'https://blocktrades.us:443/api/v2/simple-api/initiate-trade/',
    form : data,
    method: 'POST'
  })
}

function sendTransfer(amount, to, memo) {
  return new Promise( (resolve, reject) => {

    steem.broadcast.transfer(ACCOUNT_WIF, ACCOUNT_NAME, to, amount, memo, (err, result) => {
      if (err) throw err
      console.log(result)
      resolve(result);
    });
  })
}
