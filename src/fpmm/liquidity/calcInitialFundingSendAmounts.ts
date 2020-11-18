import { BigNumber } from "@ethersproject/bignumber";

/**
 * Compute the number of outcomes that will be sent to the user by the Market Maker
 * after funding it for the first time with `addedFunds` of collateral.
 * @param addedFunds - the amount of collateral being added to the market maker as liquidity
 * @param distributionHint - a distribution hint as calculated by `calcDistributionHint`
 */
export const calcInitialFundingSendAmounts = (addedFunds: BigNumber, distributionHint: BigNumber[]): BigNumber[] => {
  const maxHint = distributionHint.reduce((a, b) => (a.gt(b) ? a : b));

  const sendAmounts = distributionHint.map(hint => addedFunds.sub(addedFunds.mul(hint).div(maxHint)));

  return sendAmounts;
};
