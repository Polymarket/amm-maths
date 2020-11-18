/* eslint-env jest */
import { BigNumber } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";
import { calcInitialFundingSendAmounts } from "./calcInitialFundingSendAmounts";


describe("calcInitialFundingSendAmounts", () => {
  it("all holdings are different", () => {
    const result = calcInitialFundingSendAmounts(BigNumber.from(10), [1, 2, 3].map(BigNumber.from))

    expect(result).toStrictEqual(["7", "4", "0"].map(BigNumber.from));
  });

  it("all holdings are equal", () => {
    const result = calcInitialFundingSendAmounts(BigNumber.from(10), [3, 3, 3].map(BigNumber.from))

    expect(result).toStrictEqual([Zero, Zero, Zero]);
  });

  it("no funding", () => {
    const result = calcInitialFundingSendAmounts(Zero, [3, 3, 3].map(BigNumber.from))
    expect(result).toStrictEqual([Zero, Zero, Zero]);
  });
});
