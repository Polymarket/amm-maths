/* eslint-env jest */
import { BigNumber } from "@ethersproject/bignumber";
import { calcAddFundingDepositedAmounts } from "./calcAddFundingDepositedAmounts";

describe("calcAddFundingDepositedAmounts", () => {
  it("all holdings are different", () => {
    const result = calcAddFundingDepositedAmounts(BigNumber.from(10), [1, 2, 3].map(BigNumber.from));

    expect(result).toStrictEqual([3, 6, 10].map(BigNumber.from));
  });

  it("all holdings are equal", () => {
    const result = calcAddFundingDepositedAmounts(BigNumber.from(10), [3, 3, 3].map(BigNumber.from));

    expect(result).toStrictEqual([10, 10, 10].map(BigNumber.from));
  });
});
