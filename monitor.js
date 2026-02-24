const { ethers } = require('ethers');
const { AAVE_DATA_PROVIDER_ABI, COMPOUND_CUSDC_ABI } = require('./abis');

// Configuration
const RPC_URL = "https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY";
const provider = new ethers.JsonRpcProvider(RPC_URL);

// Contract Addresses (Mainnet)
const USDC_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eb48";
const AAVE_DATA_PROVIDER = "0x7B4EBb5123fF3d2ec7D69ed250725027FEE24062";
const COMPOUND_USDC_MARKET = "0xc3d688B66703497DAA19211EEdff47f25384cdc3";

async function getRates() {
    try {
        // 1. Fetch Aave V3 Liquidity Rate
        const aaveProvider = new ethers.Contract(AAVE_DATA_PROVIDER, AAVE_DATA_PROVIDER_ABI, provider);
        const aaveData = await aaveProvider.getReserveData(USDC_ADDRESS);
        const aaveAPY = (Number(aaveData.liquidityRate) / 10**27) * 100;

        // 2. Fetch Compound V3 Supply Rate
        const compoundMarket = new ethers.Contract(COMPOUND_USDC_MARKET, COMPOUND_CUSDC_ABI, provider);
        const compRatePerSec = await compoundMarket.supplyRatePerTimestamp();
        const compAPY = (Math.pow(1 + (Number(compRatePerSec) / 10**18), 31536000) - 1) * 100;

        console.log(`--- Yield Report ---`);
        console.log(`Aave V3 USDC APY: ${aaveAPY.toFixed(2)}%`);
        console.log(`Compound V3 USDC APY: ${compAPY.toFixed(2)}%`);

        if (aaveAPY > compAPY + 0.5) {
            console.log("Action: Recommendation to move funds to Aave.");
        } else if (compAPY > aaveAPY + 0.5) {
            console.log("Action: Recommendation to move funds to Compound.");
        } else {
            console.log("Action: No significant yield delta. Holding position.");
        }
    } catch (error) {
        console.error("Error fetching rates:", error);
    }
}

// Check rates every 60 seconds
setInterval(getRates, 60000);
getRates();
