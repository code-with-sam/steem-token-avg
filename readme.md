# Steem-token-diversifier

This tool aims to automatically diversiy your steem and sbd into other tokens using steem js, blocktrades api and node scheduler.

Set daily or weekly schedules that will transfer set ammounts into a different token via blocktrades. For example you may wish to transfer 10 steem backed dollars to litecoin everyday if you have over 10 in your account.

The example set out in this tool is 'Everyday at 10:30am transfer 10SBD to the equivilent in ETH if there is over 10SBD to send'

All you need to do is fill int he variables provided 

```
const ACCOUNT_NAME = 'accountname'
const ACCOUNT_WIF = 'activekeygoesinhere'
const TRADE_AMOUNT_STEEM = '10.000 STEEM'
const TRADE_AMOUNT_SBD = '10.000 SBD'
const MINIMUM_BALANCE = 10
const ETH_ADDRESS = '0xe4266B174aF95720F40b658143F9ac45ef1cA15d'
const tradeHour = 10
const tradeMinute = 30
```

This tool uses Node.js, clone the repo then run the file.

```
git clone git@github.com:code-with-sam/steem-token-avg.git
cd steem-token-avg/
node tool.js
```
Make sure to edit the default settings in tool.js before running or it will error out.

it is recommended to run this script in the background with a tool such as ```forever``` or ```nodemon```
