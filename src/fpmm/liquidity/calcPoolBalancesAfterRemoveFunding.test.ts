/* eslint-env jest */
import { BigNumber } from "@ethersproject/bignumber";

import { calcPoolBalancesAfterRemoveFunding } from "./calcPoolBalancesAfterRemoveFunding";

describe("calcPoolBalancesAfterRemoveFunding", () => {
  it("all holdings are different", () => {
    const result = calcPoolBalancesAfterRemoveFunding(10, [2, 4, 6], 20);

    expect(result).toStrictEqual([1, 2, 3].map(BigNumber.from));
  });

  it("all holdings are the same", () => {
    const result = calcPoolBalancesAfterRemoveFunding(10, [2, 2, 2], 20);

    expect(result).toStrictEqual([1, 1, 1].map(BigNumber.from));
  });
});
