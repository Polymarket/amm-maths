/* eslint-env jest */
import { BigNumber } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";

import { computeBalanceAfterTrade } from "./computeBalanceAfterTrade";

const testCases: [[number[], number, number, number], number[]][] = [
  [
    [[100, 100], 0, 50, 100],
    [50, 150],
  ],
  [
    [[100, 100], 1, 50, 100],
    [150, 50],
  ],
  [
    [[100, 100, 100], 2, 50, 100],
    [150, 150, 50],
  ],
];

describe("computeBalanceAfterTrade", () => {

  it.each(testCases)(`should compute the right balance after trade`, ([holdings, outcomeIndex, collateral, shares], expected) => {
    const holdingsBN = holdings.map(BigNumber.from);

    const result = computeBalanceAfterTrade(
      holdingsBN,
      outcomeIndex,
      BigNumber.from(collateral),
      BigNumber.from(shares),
    );

    result.forEach((x, i) => expect(x.toNumber()).toBeCloseTo(expected[i]));
  });


  describe("when index is negative", () => {
    it("throws", () => {
      const holdings = [100, 100, 100].map(BigNumber.from);
      expect(() => computeBalanceAfterTrade(holdings, -1, BigNumber.from(50), BigNumber.from(100))).toThrow();
    });
  });

  describe("when index is equal to array's length", () => {
    it("throws", () => {
      const holdings = [100, 100, 100].map(BigNumber.from);
      expect(() => computeBalanceAfterTrade(holdings, 3, BigNumber.from(50), BigNumber.from(100))).toThrow();
    });
  });

  describe("when index is bigger than array's length", () => {
    it("throws", () => {
      const holdings = [100, 100, 100].map(BigNumber.from);
      expect(() => computeBalanceAfterTrade(holdings, 10, BigNumber.from(50), BigNumber.from(100))).toThrow();
    });
  });

  describe("when trade drains entirety of an outcome's balance", () => {
    it("throws", () => {
      const holdings = [100, 100, 100].map(BigNumber.from);
      expect(() => computeBalanceAfterTrade(holdings, 10, Zero, BigNumber.from(100))).toThrow();
    });
  });
});

