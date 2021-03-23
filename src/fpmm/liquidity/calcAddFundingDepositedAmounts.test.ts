/* eslint-env jest */
import { BigNumber } from "@ethersproject/bignumber";
import { calcAddFundingDepositedAmounts } from "./calcAddFundingDepositedAmounts";

describe("calcAddFundingDepositedAmounts", () => {
  it("all holdings are different", () => {
    const result = calcAddFundingDepositedAmounts(10, [1, 2, 3]);

    expect(result).toStrictEqual([3, 6, 10].map(BigNumber.from));
  });

  it("all holdings are equal", () => {
    const result = calcAddFundingDepositedAmounts(10, [3, 3, 3]);

    expect(result).toStrictEqual([10, 10, 10].map(BigNumber.from));
  });

  it("initial pool balances includes a zero", () => {
    expect(() => calcAddFundingDepositedAmounts(10, [0, 0, 0])).toThrowError(
      "Invalid Pool Balances - you must provide a distribution hint for the desired weightings of the pool",
    );
  });
});
