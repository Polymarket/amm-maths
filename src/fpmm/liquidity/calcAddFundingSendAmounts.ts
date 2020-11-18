import { BigNumber } from "@ethersproject/bignumber";

/**
 * Compute the number of outcomes that will be sent to the user by the Market Maker
 * after adding `addedFunds` of collateral.
 * @param addedFunds - the amount of collateral being added to the market maker as liquidity
 * @param poolBalances - the market maker's balances of outcome tokens
 * @param poolShareSupply - the total supply of liquidity pool tokens
 */
export const calcAddFundingSendAmounts = (
  addedFunds: BigNumber,
  poolBalances: BigNumber[],
  poolShareSupply: BigNumber,
): BigNumber[] | null => {
  if (poolShareSupply.eq(0)) {
    return null;
  }

  const poolWeight = poolBalances.reduce((a, b) => (a.gt(b) ? a : b));

  const sendAmounts = poolBalances.map(h => {
    const remaining = addedFunds.mul(h).div(poolWeight);
    return addedFunds.sub(remaining);
  });

  return sendAmounts;
};
