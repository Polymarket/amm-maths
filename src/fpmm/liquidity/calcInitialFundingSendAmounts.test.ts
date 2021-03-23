/* eslint-env jest */
import { BigNumber } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";
import { calcInitialFundingSendAmounts } from "./calcInitialFundingSendAmounts";

describe("calcInitialFundingSendAmounts", () => {
  it("all holdings are different", () => {
    const result = calcInitialFundingSendAmounts(10, [1, 2, 3]);

    expect(result).toStrictEqual(["7", "4", "0"].map(BigNumber.from));
  });

  it("all holdings are equal", () => {
    const result = calcInitialFundingSendAmounts(10, [3, 3, 3]);

    expect(result).toStrictEqual([Zero, Zero, Zero]);
  });

  it("no funding", () => {
    const result = calcInitialFundingSendAmounts(0, [3, 3, 3]);
    expect(result).toStrictEqual([Zero, Zero, Zero]);
  });
});
