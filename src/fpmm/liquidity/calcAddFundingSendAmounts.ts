import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { calcAddFundingDepositedAmounts } from "./calcAddFundingDepositedAmounts";

/**
 * Compute the numbers of outcome tokens that will be sent to the user by the market maker after adding `addedFunds` of collateral.
 * @param addedFunds - the amount of collateral being added to the market maker as liquidity
 * @param poolBalances - the market maker's balances of outcome tokens
 */
export const calcAddFundingSendAmounts = (addedFunds: BigNumberish, poolBalances: BigNumberish[]): BigNumber[] => {
  const depositAmounts = calcAddFundingDepositedAmounts(addedFunds, poolBalances);

  const sendAmounts = depositAmounts.map(depositAmount => BigNumber.from(addedFunds).sub(depositAmount));

  return sendAmounts;
};
