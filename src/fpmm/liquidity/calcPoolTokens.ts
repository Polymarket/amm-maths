import { BigNumber, BigNumberish } from "@ethersproject/bignumber";

/**
 * Compute the number of liquidity pool tokens that will be sent to the user by the Market Maker
 * after adding `addedFunds` of collateral.
 * @param addedFunds - the amount of collateral being added to the market maker as liquidity
 * @param poolBalances - the market maker's balances of outcome tokens
 * @param poolShareSupply - the total supply of liquidity pool tokens
 */
export const calcPoolTokens = (
  addedFunds: BigNumberish,
  poolBalances: BigNumberish[],
  poolShareSupply: BigNumberish,
): BigNumber => {
  if (BigNumber.from(poolShareSupply).eq(0)) {
    return BigNumber.from(addedFunds);
  }

  const poolWeight = poolBalances.reduce((max, h) => (BigNumber.from(h).gt(max) ? h : max));
  return BigNumber.from(addedFunds)
    .mul(poolShareSupply)
    .div(poolWeight);
};
