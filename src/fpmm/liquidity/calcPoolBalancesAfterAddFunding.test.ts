/* eslint-env jest */
import { BigNumber } from "@ethersproject/bignumber";
import { calcPoolBalancesAfterAddFunding } from "./calcPoolBalancesAfterAddFunding";

describe("calcPoolBalancesAfterAddFunding", () => {
  it("all holdings are different", () => {
    const result = calcPoolBalancesAfterAddFunding(BigNumber.from(10), [1, 2, 3].map(BigNumber.from));

    expect(result).toStrictEqual([4, 8, 13].map(BigNumber.from));
  });

  it("all holdings are equal", () => {
    const result = calcPoolBalancesAfterAddFunding(BigNumber.from(10), [3, 3, 3].map(BigNumber.from));

    expect(result).toStrictEqual([13, 13, 13].map(BigNumber.from));
  });
});
