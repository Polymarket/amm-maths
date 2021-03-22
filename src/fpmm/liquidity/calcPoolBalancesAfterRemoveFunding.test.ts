/* eslint-env jest */
import { BigNumber } from "@ethersproject/bignumber";

import { calcPoolBalancesAfterRemoveFunding } from "./calcPoolBalancesAfterRemoveFunding";

describe("calcPoolBalancesAfterRemoveFunding", () => {
  it("all holdings are different", () => {
    const result = calcPoolBalancesAfterRemoveFunding(
      BigNumber.from(10),
      [2, 4, 6].map(BigNumber.from),
      BigNumber.from(20),
    );

    expect(result).toStrictEqual([1, 2, 3].map(BigNumber.from));
  });

  it("all holdings are the same", () => {
    const result = calcPoolBalancesAfterRemoveFunding(
      BigNumber.from(10),
      [2, 2, 2].map(BigNumber.from),
      BigNumber.from(20),
    );

    expect(result).toStrictEqual([1, 1, 1].map(BigNumber.from));
  });
});
