import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { calcAddFundingDepositedAmounts } from "./calcAddFundingDepositedAmounts";

/**
 * Compute the new pool balances in the Market Maker after adding `addedFunds` of collateral
 * @param addedFunds - the amount of collateral being added to the market maker as liquidity
 * @param initPoolBalances - the market maker's initial balances of outcome tokens
 */
export const calcPoolBalancesAfterAddFunding = (
  addedFunds: BigNumberish,
  initPoolBalances: BigNumberish[],
): BigNumber[] => {
  const depositedAmounts = calcAddFundingDepositedAmounts(addedFunds, initPoolBalances);

  const updatedBalances = initPoolBalances.map((balance, i) => BigNumber.from(balance).add(depositedAmounts[i]));

  return updatedBalances;
};
