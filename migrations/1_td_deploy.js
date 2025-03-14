const Str = require('@supercharge/strings')
// const BigNumber = require('bignumber.js');

var TDErc20 = artifacts.require("ERC20TD.sol");
var ERC20 = artifacts.require("DummyToken.sol"); 
var evaluator = artifacts.require("Evaluator.sol");
var ERC20Contract = artifacts.require("ERC20Contract.sol");


module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {
        // await deployTDToken(deployer, network, accounts); 
        // await deployEvaluator(deployer, network, accounts);
		await setStaticContracts(deployer, network, accounts); 
        // await setPermissionsAndRandomValues(deployer, network, accounts); 
        await deployRecap(deployer, network, accounts); 
		await createERC20(deployer, network, accounts);
    });
};

async function deployTDToken(deployer, network, accounts) {
	TDToken = await TDErc20.new("TD-AMM-101","TD-AMM-101",web3.utils.toBN("20000000000000000000000000000"))
	dummyToken = await ERC20.new("dummyToken", "DTK", web3.utils.toBN("2000000000000000000000000000000"))
	uniswapV2FactoryAddress = "0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f"
	wethAddress = "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6"
}

async function deployEvaluator(deployer, network, accounts) {
	Evaluator = await evaluator.new(TDToken.address, dummyToken.address, uniswapV2FactoryAddress, wethAddress)
}

async function setStaticContracts(deployer, network, accounts) {
	TDToken = await TDErc20.at("0x22E065dAE8e21d31ca04c1695d464D28C7b6014B")
	dummyToken = await ERC20.at("0x2aF483edaE4cce53186E6ed418FE92f8169Ad74E")
	Evaluator = await evaluator.at("0xbF1D55027644401a4d3865536E4d94a0E34F15e6")
}

async function setPermissionsAndRandomValues(deployer, network, accounts) {
	await TDToken.setTeacher(Evaluator.address, true)
	randomSupplies = []
	randomTickers = []
	for (i = 0; i < 20; i++)
		{
		randomSupplies.push(Math.floor(Math.random()*1000000000))
		randomTickers.push(Str.random(5))
		// randomTickers.push(web3.utils.utf8ToBytes(Str.random(5)))
		// randomTickers.push(Str.random(5))
		}

	console.log(randomTickers)
	console.log(randomSupplies)
	// console.log(web3.utils)
	// console.log(type(Str.random(5)0)
	await Evaluator.setRandomTickersAndSupply(randomSupplies, randomTickers);
}

async function deployRecap(deployer, network, accounts) {
	console.log("TDToken " + TDToken.address)
	console.log("dummyToken " + dummyToken.address)
	console.log("Evaluator " + Evaluator.address)
}

async function createERC20(deployer, network, accounts) {
	myERC20 = await ERC20Contract.new("AlexCoin", "Qxiaq", web3.utils.toBN("614618280000000000000000000"))
	// myERC20 = await ERC20Contract.at("0x2B83874DE28aF248B806e0065272Daa3E84C8576")
	console.log("ERC20Address " + myERC20.address)
	console.log("ERC20 created !")
	await Evaluator.submitErc20(myERC20.address)
	console.log("ERC20 Submitted !")
	await Evaluator.ex6b_testErc20TickerAndSupply()
	console.log("Ex6b done !")
	myBalance = await TDToken.balanceOf(accounts[0])
	console.log("BalanceTokens " + myBalance/1000000000000000000)
	console.log()
}

async function swapTokens(deployer, network, accounts) {
	
}


