import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { WeiPerEther as ONE, Zero } from "@ethersproject/constants";
import { ceilDiv, mulBN } from "../../utils";

/**
 * Computes the amount of shares that will be bought with `investmentAmount` amount collateral.
 *
 * @param investmentAmount The amount of collateral being put into the market maker
 * @param outcomeIndex The index of the outcome being bought
 * @param poolBalances How many tokens the market maker has of each outcome
 * @param fee The fee of the market maker, between 0 and 1
 */
export const calcBuyAmountInShares = (
  investmentAmount: BigNumberish,
  outcomeIndex: number,
  poolBalances: BigNumberish[],
  fee: number,
): BigNumber => {
  if (outcomeIndex < 0 || outcomeIndex >= poolBalances.length) {
    throw new Error(`Outcome index '${outcomeIndex}' must be between 0 and '${poolBalances.length - 1}'`);
  }
  if (BigNumber.from(investmentAmount).isZero() || poolBalances.every(x => BigNumber.from(x).isZero())) return Zero;

  const investmentAmountMinusFees = mulBN(investmentAmount, 1 - fee);
  const newOutcomeBalance = poolBalances.reduce(
    (accumulator: BigNumber, poolBalance, i) =>
      i !== outcomeIndex
        ? ceilDiv(accumulator.mul(poolBalance), BigNumber.from(poolBalance).add(investmentAmountMinusFees))
        : accumulator.mul(poolBalance),
    ONE,
  );

  return BigNumber.from(poolBalances[outcomeIndex])
    .add(investmentAmountMinusFees)
    .sub(ceilDiv(newOutcomeBalance, ONE));
};
