/* eslint-env jest */
import { BigNumber } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";

import { computeBalanceAfterSharePurchase } from "./computeBalanceAfterSharePurchase";

const testCases: [[number[], number, number, number, number], number[]][] = [
  [
    [[100, 100], 0, 50, 100, 0],
    [50, 150],
  ],
  [
    [[100, 100], 1, 50, 100, 0],
    [150, 50],
  ],
  [
    [[150, 150], 0, 50, 100, 1],
    [50, 150],
  ],
  [
    [[100, 100], 0, 50, 100, 0.5],
    [25, 125],
  ],
  [
    [[875, 875], 0, 500, 1000, 0.2],
    [275, 1275],
  ],

  [
    [[100, 100, 100], 2, 50, 100, 0],
    [150, 150, 50],
  ],
];

describe("computeBalanceAfterSharePurchase", () => {

  it.each(testCases)(`should compute the right balance after sale of shares`, ([holdings, outcomeIndex, collateral, shares, fees], expected) => {
    const holdingsBN = holdings.map(BigNumber.from);

    const result = computeBalanceAfterSharePurchase(
      holdingsBN,
      outcomeIndex,
      BigNumber.from(collateral),
      BigNumber.from(shares),
      fees
    );

    result.forEach((x, i) => expect(x.toNumber()).toBeCloseTo(expected[i]));
  });

  describe("when index is negative", () => {
    it("throws", () => {
      const holdings = [100, 100, 100].map(BigNumber.from);
      expect(() =>
        computeBalanceAfterSharePurchase(holdings, -1, BigNumber.from(50), BigNumber.from(100), 0),
      ).toThrow();
    });
  });

  describe("when index is equal to array's length", () => {
    it("throws", () => {
      const holdings = [100, 100, 100].map(BigNumber.from);
      expect(() => computeBalanceAfterSharePurchase(holdings, 3, BigNumber.from(50), BigNumber.from(100), 0)).toThrow();
    });
  });

  describe("when index is bigger than array's length", () => {
    it("throws", () => {
      const holdings = [100, 100, 100].map(BigNumber.from);
      expect(() =>
        computeBalanceAfterSharePurchase(holdings, 10, BigNumber.from(50), BigNumber.from(100), 0),
      ).toThrow();
    });
  });

  describe("when trade drains entirety of an outcome's balance", () => {
    it("throws", () => {
      const holdings = [100, 100, 100].map(BigNumber.from);
      expect(() => computeBalanceAfterSharePurchase(holdings, 10, Zero, BigNumber.from(100), 0)).toThrow();
    });
  });
});
