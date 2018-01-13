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
getTradeAddress().then( data => {
  console.log(data)
})
function getTradeAddress(){
  let data = {
    "inputCoinType" : "sbd",
    "outputCoinType" : "eth",
    "outputAddress" : "0xe4266B174aF95720F40b658143F9ac45ef1cA15d"
    }


  return rp.post( {
    url: 'https://blocktrades.us:443/api/v2/simple-api/initiate-trade/',
    form : data,
    method: 'POST'
  })
}
