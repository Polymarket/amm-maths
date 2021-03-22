import { BigNumber } from "@ethersproject/bignumber";
import { calcAddFundingSendAmounts } from "./calcAddFundingSendAmounts";

/**
 * Compute the new pool balances in the Market Maker after adding `addedFunds` of collateral
 * @param addedFunds - the amount of collateral being added to the market maker as liquidity
 * @param initPoolBalances - the market maker's initial balances of outcome tokens
 * @param poolShareSupply - the total supply of liquidity pool tokens
 */
export const calcPoolBalancesAfterAddFunding = (
  addedFunds: BigNumber,
  initPoolBalances: BigNumber[],
  poolShareSupply: BigNumber,
): BigNumber[] | null => {
  if (poolShareSupply.eq(0)) {
    return null;
  }

  const sendAmounts = calcAddFundingSendAmounts(addedFunds, initPoolBalances, poolShareSupply);

  if (sendAmounts === null) return null;

  const updatedBalances = initPoolBalances.map((balance, i) => balance.add(addedFunds).sub(sendAmounts[i]));

  return updatedBalances;
};
