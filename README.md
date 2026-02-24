# DeFi Yield Aggregator Bot

A high-performance automated tool for yield farmers. This bot monitors lending rates on Ethereum and Layer 2s, comparing returns between different protocols to ensure your capital is always earning the highest possible interest.

## Features
* **Multi-Protocol Monitoring:** Fetches real-time supply rates from Aave V3 and Compound V3.
* **Smart Rebalancing:** Logic to determine if the gas cost of moving funds is offset by the increase in APY.
* **Flash Loan Ready:** Architected to support flash loans for zero-collateral rebalancing (requires specific provider integration).
* **Gas-Aware Execution:** Uses EIP-1559 gas estimation to prevent overpaying for transactions during spikes.

## Prerequisites
* Node.js v18+
* RPC Provider (Alchemy, Infura, or QuickNode)
* Funds deposited in a supported lending protocol

## Setup
1. `npm install`
2. Configure `env.json` with your wallet and RPC details.
3. Run the monitor: `node monitor.js`
