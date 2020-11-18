/* eslint-env jest */
import { BigNumber } from "@ethersproject/bignumber";

import { Zero } from "@ethersproject/constants";
import { calcBuyAmountInShares } from "./calcBuyAmountInShares";
import { divBN } from "../../utils";

const testCases: [[string, number, string[]], string][] = [[["1000000", 0, ["100000000", "100000000"]], "1970295"]];

describe("calcBuyAmountInShares", () => {
  it.each(testCases)(
    `should compute the amount of shares bought`,
    ([investmentAmount, outcomeIndex, poolBalances], expected) => {
      const result = calcBuyAmountInShares(
        BigNumber.from(investmentAmount),
        outcomeIndex,
        poolBalances.map(BigNumber.from),
        0.01,
      );

      expect(result).not.toBe(null);

      expect(divBN(result, BigNumber.from(expected))).toBeCloseTo(1);
    },
  );

  describe("when no holdings", () => {
    it("returns 0", () => expect(calcBuyAmountInShares(BigNumber.from(10), 0, [Zero, Zero], 0.1)).toStrictEqual(Zero));
  });

  describe("when no funding", () => {
    it("returns 0", () =>
      expect(calcBuyAmountInShares(BigNumber.from(0), 0, [100, 100].map(BigNumber.from), 0.1)).toStrictEqual(Zero));
  });
});
