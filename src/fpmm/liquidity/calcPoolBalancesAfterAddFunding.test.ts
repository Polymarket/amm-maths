/* eslint-env jest */
import { BigNumber } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";
import { calcPoolBalancesAfterAddFunding } from "./calcPoolBalancesAfterAddFunding";

describe("calcPoolBalancesAfterAddFunding", () => {
  it("all holdings are different", () => {
    const result = calcPoolBalancesAfterAddFunding(
      BigNumber.from(10),
      [1, 2, 3].map(BigNumber.from),
      BigNumber.from(20),
    );

    expect(result).toStrictEqual([4, 8, 13].map(BigNumber.from));
  });

  it("all holdings are equal", () => {
    const result = calcPoolBalancesAfterAddFunding(
      BigNumber.from(10),
      [3, 3, 3].map(BigNumber.from),
      BigNumber.from(20),
    );

    expect(result).toStrictEqual([13, 13, 13].map(BigNumber.from));
  });

  it("no funding", () => {
    const result = calcPoolBalancesAfterAddFunding(BigNumber.from(10), [3, 3, 3].map(BigNumber.from), Zero);

    expect(result).toBe(null);
  });
});
