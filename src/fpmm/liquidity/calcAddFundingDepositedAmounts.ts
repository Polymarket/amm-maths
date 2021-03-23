import { BigNumber, BigNumberish } from "@ethersproject/bignumber";

/**
 * Compute the numbers of outcome tokens that will be added to the market maker after adding `addedFunds` of collateral.
 * @param addedFunds - the amount of collateral being added to the market maker as liquidity
 * @param poolBalances - the market maker's balances of outcome tokens
 */
export const calcAddFundingDepositedAmounts = (addedFunds: BigNumberish, poolBalances: BigNumberish[]): BigNumber[] => {
  if (poolBalances.some(x => BigNumber.from(x).isZero())) {
    throw new Error(
      "Invalid Pool Balances - you must provide a distribution hint for the desired weightings of the pool",
    );
  }

  const poolWeight = poolBalances.reduce((a, b) => (BigNumber.from(a).gt(b) ? a : b));

  const depositAmounts = poolBalances.map(h =>
    BigNumber.from(addedFunds)
      .mul(h)
      .div(poolWeight),
  );

  return depositAmounts;
};
