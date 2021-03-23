import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { calcAddFundingDepositedAmounts } from "./calcAddFundingDepositedAmounts";

/**
 * Compute the numbers of outcome tokens that will be added to the market maker after adding `addedFunds` of collateral.
 * @dev The distribution hint plays the role of the pool's balances so we can just forward this to calcAddFundingSendAmounts
 * @param addedFunds - the amount of collateral being added to the market maker as liquidity
 * @param poolBalances - the market maker's balances of outcome tokens
 */
export const calcInitialFundingDepositedAmounts = (
  addedFunds: BigNumberish,
  distributionHint: BigNumberish[],
): BigNumber[] => {
  if (distributionHint.some(x => BigNumber.from(x).isZero())) {
    throw new Error("Invalid Distribution Hint - can't assign a weight of zero to an outcome");
  }
  return calcAddFundingDepositedAmounts(addedFunds, distributionHint);
};
