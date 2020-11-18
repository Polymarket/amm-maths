import { BigNumber } from "@ethersproject/bignumber";
import Big from "big.js";

/**
 * Computes the distribution hint that should be used for setting the initial odds to `initialOdds`
 * @param initialOdds - an array of numbers proportional to the initial estimate of the probability of each outcome
 */
export const calcDistributionHint = (initialOdds: number[]): BigNumber[] => {
  if (initialOdds.some(x => x === 0)) {
    throw new Error("Invalid probability - can't assign a probability of zero to an outcome");
  }

  const allEqual = initialOdds.every(x => x === initialOdds[0]);
  if (allEqual) {
    return [];
  }

  const initialOddsBig = initialOdds.map(x => new Big(x));
  const product = initialOddsBig.reduce((a, b) => a.mul(b));

  const distributionHint = initialOddsBig
    .map(o => product.div(o))
    .map(x => x.mul(1000000).round())
    .map(x => BigNumber.from(x.toString()));

  return distributionHint;
};
