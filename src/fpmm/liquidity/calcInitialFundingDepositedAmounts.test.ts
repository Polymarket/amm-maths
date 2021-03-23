/* eslint-env jest */
import { BigNumber } from "@ethersproject/bignumber";
import { calcInitialFundingDepositedAmounts } from "./calcInitialFundingDepositedAmounts";

describe("calcInitialFundingDepositedAmounts", () => {
  it("Distribution hint is non-uniform", () => {
    const result = calcInitialFundingDepositedAmounts(10, [1, 2, 3]);

    expect(result).toStrictEqual([3, 6, 10].map(BigNumber.from));
  });

  it("Distribution hint is uniform", () => {
    const result = calcInitialFundingDepositedAmounts(10, [3, 3, 3]);

    expect(result).toStrictEqual([10, 10, 10].map(BigNumber.from));
  });

  it("Distribution hint includes a zero", () => {
    expect(() => calcInitialFundingDepositedAmounts(BigNumber.from(10), [0, 0, 0].map(BigNumber.from))).toThrowError(
      "Invalid Distribution Hint - can't assign a weight of zero to an outcome",
    );
  });
});
