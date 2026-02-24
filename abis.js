// Minimal ABIs for interacting with Data Providers
module.exports = {
    AAVE_DATA_PROVIDER_ABI: [
        "function getReserveData(address asset) external view returns (uint256 unbacked, uint256 accruedToTreasuryScaled, uint256 totalAToken, uint256 totalStableDebt, uint256 totalVariableDebt, uint256 liquidityRate, uint256 variableBorrowRate, uint256 stableBorrowRate, uint256 averageStableBorrowRate, uint256 liquidityIndex, uint256 variableBorrowIndex, uint40 lastUpdateTimestamp)"
    ],
    COMPOUND_CUSDC_ABI: [
        "function supplyRatePerTimestamp() external view returns (uint256)"
    ]
};
