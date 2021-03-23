/* eslint-env jest */
import { BigNumber } from "@ethersproject/bignumber";
import { calcInitialFundingDepositedAmounts } from "./calcInitialFundingDepositedAmounts";

describe("calcInitialFundingDepositedAmounts", () => {
  it("all holdings are different", () => {
    const result = calcInitialFundingDepositedAmounts(10, [1, 2, 3]);

    expect(result).toStrictEqual([3, 6, 10].map(BigNumber.from));
  });

  it("all holdings are equal", () => {
    const result = calcInitialFundingDepositedAmounts(10, [3, 3, 3]);

    expect(result).toStrictEqual([10, 10, 10].map(BigNumber.from));
  });
});
