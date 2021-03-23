import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";

/**
 * Computes the market maker's balances of outcome tokens after a trade
 *
 * @dev It is recommended to use the methods `computeBalanceAfterSharePurchase` and `computeBalanceAfterShareSale` instead of this
 *
 * @param initialPoolBalances - the market maker's balances of outcome tokens before the trade
 * @param outcomeIndex - the index of the outcome token being bought
 * @param investmentAmountAfterFees - the amount of collateral being converted into outcome tokens (i.e. post fees)
 * @param sharesBoughtAmount - the amount of outcome tokens being removed from the market maker
 */
export const computeBalanceAfterTrade = (
  initialPoolBalances: BigNumberish[],
  outcomeIndex: number,
  investmentAmount: BigNumberish,
  sharesRemovedAmount: BigNumberish,
): BigNumber[] => {
  if (outcomeIndex < 0 || outcomeIndex >= initialPoolBalances.length) {
    throw new Error(`Outcome index '${outcomeIndex}' must be between 0 and '${initialPoolBalances.length - 1}'`);
  }

  // By default we treat a trade as a purchase of shares, sales can be treated as a purchase of a negative number of shares.
  const newPoolBalances = initialPoolBalances.map((h, i) =>
    BigNumber.from(h)
      .add(investmentAmount)
      .sub(i === outcomeIndex ? sharesRemovedAmount : Zero),
  );

  if (newPoolBalances.some(balance => balance.lte(0))) {
    throw new Error(`Trade is invalid: trade results in liquidity pool owning a negative number of tokens`);
  }

  return newPoolBalances;
};
